import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

module.exports = {
  data: data,
  execute: async (interaction) => {
    await interaction.reply("Pong!");
  }
} as Command