import { log, warn } from "console";
import { Client, GatewayIntentBits, Events, Routes, REST, Collection } from "discord.js";
import { getConfig } from "./Create";
import fs from "fs";
import path from "path";

class Nekoriku {
    private client: Client;
    private commands: Collection<string, any>;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        this.commands = new Collection();
    }

    public async start(token: string) {
        const config = getConfig();

        this.client.once(Events.ClientReady, async () => {
            log(`Logged in as ${this.client.user?.tag}`)

            if (config.slash_commands) {
                await this.loadSlashCommands(token);
            }
        });

        this.client.on("interactionCreate", async (interaction) => {
            if (!interaction.isCommand()) return;

            const command = this.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "There was an error executing this command!", ephemeral: true });
            }
        });


        this.client.login(token);
    }

    private async loadSlashCommands(token: string) {
        const commandsPath = path.join(__dirname, "commands");
        const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

        const commands = [];
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = await import(filePath);

            if ("data" in command && "execute" in command) {
                this.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }

        // Deploy commands to Discord
        const rest = new REST({ version: "10" }).setToken(token);

        try {
            log("Started refreshing application (/) commands.");

            await rest.put(
                Routes.applicationCommands(this.client.user?.id || ""),
                { body: commands }
            );

            log("Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    }
}

export { Nekoriku };