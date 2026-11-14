require("dotenv").config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
if (!token || !clientId) {
  console.error("Missing DISCORD_TOKEN or DISCORD_CLIENT_ID environment variable.");
  process.exit(1);
}
const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Check whether Orbit is online."),
  new SlashCommandBuilder().setName("help").setDescription("Show Orbit's commands."),
  new SlashCommandBuilder().setName("say").setDescription("Send a message as Orbit.")
    .addStringOption(option => option.setName("message").setDescription("The message Orbit should send.").setRequired(true).setMaxLength(1900))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
].map(command => command.toJSON());
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once("ready", async () => {
  console.log("Orbit is online as " + client.user.tag);
  try {
    const rest = new REST({ version: "10" }).setToken(token);
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("Registered /ping, /help, and /say globally.");
  } catch (error) { console.error("Could not register slash commands:", error); }
});
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  try {
    if (interaction.commandName === "ping") {
      await interaction.reply({ content: "Pong! Orbit is online. ✨", ephemeral: true });
    } else if (interaction.commandName === "help") {
      await interaction.reply({ content: "Orbit commands:\n/ping — check bot status\n/help — show this help\n/say message — send a message as Orbit (requires Manage Messages permission).", ephemeral: true });
    } else if (interaction.commandName === "say") {
      await interaction.reply({ content: interaction.options.getString("message", true), allowedMentions: { parse: [] } });
    }
  } catch (error) {
    console.error("Interaction failed:", error);
    if (!interaction.replied && !interaction.deferred) await interaction.reply({ content: "Sorry, something went wrong.", ephemeral: true }).catch(() => {});
  }
});
client.on("error", error => console.error("Discord client error:", error));
process.on("unhandledRejection", error => console.error("Unhandled rejection:", error));
client.login(token);
