import { warn } from "console";
import { Interaction } from "discord.js";

/**
 * interactionCreateHandler is used to define the interaction for the bot's commands.
 * 
 * @param interaction 
 * @param commands 
 * @returns 
 */
export default async function interactionCreateHandler(
    interaction: Interaction,
    commands: Map<string, any>
) {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) {
        warn(`Command ${interaction.commandName} not found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command ${interaction.commandName}:`, error);
        await interaction.reply({
            content: "There was an error executing this command!",
            ephemeral: true,
        });
    }
}