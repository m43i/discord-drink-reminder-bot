
# Simple Discord drink reminder

This is a simple drink reminder bot that posts to defined channels at one hour intervals, marking all those in defined voice channels.



## Run Locally

Clone the project

```bash
  git clone https://github.com/m43i/discord-drink-reminder-bot.git
```

Go to the project directory

```bash
  cd discord-drink-reminder-bot
```

Install dependencies

```bash
  npm install
  yarn install
  pnpm install
```

Add env values

```bash
  // open .env.example and insert your values
  // channel ids must separated by commas

  BOT_TOKEN=<YOUR TOKEN>
  TEXT_CHANNEL_ID=<ChannelID 1>,<ChannelID 2>,...
  VOICE_CHANNEL_ID=<ChannelID 1>,<ChannelID 2>,...

  // save as .env
```

Build the bot

```bash
  npm run build
  yarn build
  pnpm build
```

Start the bot

```bash
  npm run start
  yarn start
  pnpm start
```

