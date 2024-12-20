import { log } from "console";
import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import { getConfig } from "./Create";
import { loadCommands } from "./events/loadCommands";
import interactionCreateHandler from "./events/interactionCreate";

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
                this.commands = await loadCommands(this.client.user?.id || "", token);
            }
        });

        this.client.on(Events.InteractionCreate, (interaction) =>
            interactionCreateHandler(interaction, this.commands)
        );

        await this.client.login(token);
    }
}

export { Nekoriku };