# Orbit — Discord-style webhook dashboard

A responsive Discord-inspired chat dashboard, including a layout intended to be comfortable in the Meta Quest Browser.

## Publish on GitHub Pages
The included GitHub Actions workflow deploys the static site on pushes to `main`.

In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow will then publish the site. The URL is:

https://doctorgtstudios-spec.github.io/orbit-discord-ai/

## Connect Discord
Create a webhook in your Discord server under **Server Settings → Integrations → Webhooks**. In Orbit, press the plus button next to Webhook Connections and paste its URL. Choose the connection and send a message.

## Security and limitations
- This is a static GitHub Pages site. It sends outbound messages using Discord webhooks only.
- Discord bot tokens, AI responses, incoming message sync, and member sync require a separate secure backend. Never put a bot token in browser code.
- Webhook URLs are saved in this browser's local storage. Anyone with access to this browser profile may be able to use them. Do not use a shared/public headset profile. If a webhook is exposed, delete or regenerate it in Discord.
