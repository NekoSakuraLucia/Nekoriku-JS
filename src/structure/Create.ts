type ModuleConfig = {
    slash_commands?: boolean;
};

let config: ModuleConfig = {};

/**
 * TH:
 * `Nekoriku_create` เป็นฟังก์ชันสำหรับการสร้างโมดูลหรืออีเว้นท์ในการโหลดคำสั่งหรือเหตุการณ์ของบอท 
 * เช่น หากคุณต้องการ prefix คุณสามารถกำหนดเองได้ หรือใช้ค่าเริ่มต้นที่กำหนดไว้ โดยจะมีค่า prefix และ slash เป็น true 
 * ซึ่งทั้งสองบอทจะสามารถใช้งานได้ทั้ง prefix และ slash command
 *
 * EN:
 * The `Nekoriku_create` function is used for creating modules or events related to loading commands or bot events. 
 * For example, if you want to set a prefix, you can specify it yourself or use the default value. 
 * Both bots can use both prefix and slash commands if the slash option is set to True.
 *
 * TH / EN:
 * **ภาษาอื่นๆ คุณสามารถมาเพิ่มต่อเองได้นะ**
 * **As for other languages, you can continue adding it yourself. If you are a translator**
 *
 * @param module 
 */
export function create(module: ModuleConfig) {
    config = { ...module };
}

export function getConfig() {
    return config;
}