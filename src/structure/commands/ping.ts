import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

module.exports = {
  data: data,
  execute: async (interaction: CommandInteraction<"cached">) => {
    await interaction.reply("Pong!");
  }
};