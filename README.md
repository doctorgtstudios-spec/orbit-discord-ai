# Orbit — Discord bot + website

Orbit now includes a real Discord bot backend in `bot/`. The GitHub Pages website remains a separate static site; the bot runs continuously on a hosting service such as Railway.

## Website

GitHub Pages URL: https://doctorgtstudios-spec.github.io/orbit-discord-ai/

The existing browser dashboard still contains its legacy webhook sender. The Discord bot itself does not use webhooks.

## Create the Discord application

1. Open the Discord Developer Portal: https://discord.com/developers/applications
2. Create an application named **Orbit**.
3. Open **Bot** and create/reset the bot token. Copy it somewhere private. Never paste it into GitHub, the website, or a public chat.
4. On **General Information**, copy the **Application ID**. This is the `DISCORD_CLIENT_ID`.
5. In **Installation** (or OAuth2 URL Generator), enable the `bot` and `applications.commands` scopes. Select permissions: View Channels, Send Messages, and Read Message History.
6. Use the generated install link to add Orbit to each server. A server owner/admin must approve the installation. Do not enable privileged intents; this starter bot only uses the Guilds intent.

## Deploy the bot on Railway

1. Sign in at https://railway.com/ and create a new project from the GitHub repository `doctorgtstudios-spec/orbit-discord-ai`.
2. In the Railway service settings, set **Root Directory** to `/bot`.
3. In **Variables**, add:
   - `DISCORD_TOKEN` = the private bot token from the Developer Portal
   - `DISCORD_CLIENT_ID` = the Application ID
4. Deploy. The service runs `npm start` and automatically restarts if it exits.

Do not commit a real `.env` file or put the bot token in frontend code.

## Commands

- `/ping` — privately checks whether Orbit is online.
- `/help` — shows available commands.
- `/say message` — sends a message as Orbit. Discord restricts this command to members with **Manage Messages** permission.

Commands are registered globally when the bot starts; Discord may take a little while to show global commands after the first deployment.

## Notes

- Orbit can only be installed in servers where an owner/admin authorizes it.
- This starter version provides basic commands. AI-generated replies, custom per-server settings, and incoming message monitoring are not included yet.
- Keep the bot token private. If it is exposed, reset it immediately in the Discord Developer Portal and update the Railway variable.
