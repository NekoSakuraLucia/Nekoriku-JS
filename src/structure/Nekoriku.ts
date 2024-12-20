import { log } from "console";
import { Client, GatewayIntentBits, Events } from "discord.js";

class Nekoriku {
    private client: Client;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
    }

    public start(token: string) {
        this.client.once(Events.ClientReady, () => {
            log(`Logged in as ${this.client.user?.tag}`)
        })

        this.client.login(token);
    }
}

export { Nekoriku };