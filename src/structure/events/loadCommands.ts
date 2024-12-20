import { Collection, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";

export async function loadCommands(clientId: string, token: string): Promise<Collection<string, any>> {
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    const commands = [];
    const commandCollection = new Collection<string, any>();

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath);

        if ("data" in command && "execute" in command) {
            commandCollection.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[WARNING] The command at ${filePath} is missing required "data" or "execute" properties.`);
        }
    }

    const rest = new REST({ version: "10" }).setToken(token);

    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }

    return commandCollection;
}
