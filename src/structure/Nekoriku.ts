import { log } from "console";
import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import { getConfig } from "./Create";
import { loadCommands } from "./events/loadCommands";
import interactionCreateHandler from "./events/interactionCreate";

/**
 * TH:
 * `Nekoriku-JS` เป็นแพ็คเกจสำหรับบอทดิสคอร์ดที่อำนวยความสะดวก สำหรับคนที่อยากได้บอทเพลง
 * แต่ไม่อยากทำเอง แต่อยากได้บอทเพลงแบบมีทั้ง prefix, slash แต่เนโกะริคุมีให้พร้อม ไม่ต้องเขียนโค้ดเอง
 * setup ง่ายมากแค่โค้ดไม่กี่บรรทัดคุณก็ได้บอทเพลงของคุณที่พร้อมทำงาน 
 * (ซึ่งสร้างโดยคนไทย ผมเองแหละ555 NekoSakuraLucia ฝากด้วยครับ/ค่ะ)
 *
 * EN:
 * `Nekoriku-JS` is a package for convenient discord bots. For people who want a music bot
 * But I don't want to do it myself. But I want a music bot with prefix and slash, but Nekoriku has it ready. 
 * No need to write code yourself. The setup is very easy, just a few lines of code and you have your music bot ready to work. 
 * (Which was created by a Thai person, myself, haha. Neko Sakura Lucia, please give it a try.)
 *
 * TH / EN:
 * **ภาษาอื่นๆ คุณสามารถมาเพิ่มต่อเองได้นะ**
 * **As for other languages, you can continue adding it yourself. If you are a translator**
 *
 * &copy; 2024 • Nekoriku-JS (Made by: NekoSakuraLucia)
 */
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

    /**
     * Used to start your Discord bot
     * 
     * How to use:
     * 
     * ```
     * const bot = new Nekoriku();
     * 
     * bot.start("")
     * ```
     * @param token
     */
    public async start(token: string): Promise<void> {
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