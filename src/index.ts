import {
    Client,
    GuildMember,
    IntentsBitField,
    TextBasedChannel,
    VoiceBasedChannel,
} from 'discord.js';
import cron from 'node-cron';
import * as dotenv from 'dotenv';

dotenv.config();

const MESSAGES = [
    'Ein Gläschen in Ehren kann niemand verwehren.',
    'Von der Mitte zur Titte zum Sack, zack, zack!',
    'Euch ist bekannt, was wir bedürfen, wir wollen starke Getränke schlürfen.',
    'Wer Liebe mag und Einigkeit, der trinkt auch mal ne Kleinigkeit.',
    'Essen ist ein Bedürfnis des Magens, Trinken ein Bedürfnis der Seele. Essen ist ein gewöhnliches Handwerk, Trinken eine Kunst.',
    'Zu viel kann man nie trinken, doch trinkt man nie genug!',
    'Es tut mir im Herz so weh, wenn ich vom Glas den Boden seh.',
    'Hau wech die Scheiße!',
    'Du bist dehydriert? Trink Hydration!',
    'N Sekt vielleicht?',
    'Du siehst schlapp aus trink mal lieber was.',
    'Ey Mädels, trinken nicht vergessen.',
    'El Deniz hat bestimmt was in seinem Bauchladen!',
];

const CHANNEL_IDS = [...process.env.TEXT_CHANNEL_ID?.split(',')!, ...process.env.VOICE_CHANNEL_ID?.split(',')!];

/**
 * Setup the client.
 */
const setupClient = async (): Promise<Client<boolean>> => {
    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildVoiceStates,
        ],
    });
    await client.login(process.env.BOT_TOKEN);
    return client;
};

/**
 * Get all text and voice channels from the guild.
 */
const getChannels = async (
    client: Client<boolean>
): Promise<{ textChannels: TextBasedChannel[]; voiceChannels: VoiceBasedChannel[] }> => {
    const channels: {
        textChannels: TextBasedChannel[];
        voiceChannels: VoiceBasedChannel[];
    } = {
        textChannels: [],
        voiceChannels: [],
    };
    for (const id of CHANNEL_IDS) {
        if (!id) {
            continue;
        }

        const channel = await client.channels.fetch(id);
        if (!channel) {
            continue;
        }

        if (channel.isTextBased() && !channel.isVoiceBased()) {
            channels.textChannels.push(channel);
        }

        if (channel.isVoiceBased()) {
            channels.voiceChannels.push(channel);
        }
    }

    return channels;
};

/**
 * Main method
 */
const main = async () => {
    const client = await setupClient();

    cron.schedule('*/10 * * * * *', async () => {
        const { textChannels, voiceChannels } = await getChannels(client);

        const users: GuildMember[] = [];
        for (const channel of voiceChannels) {
            channel.members.forEach((user) => users.push(user));
        }

        if (users.length === 0) {
            return;
        }

        const random = Math.floor(Math.random() * MESSAGES.length);
        for (const channel of textChannels) {
            channel.send(`**Trink-Reminder:** ${MESSAGES[random]}\n${users.map((user) => user.toString()).join(' ')}`);
        }
    });
};

main();
