const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, ".env"),
});

const BigNumber = require('bignumber.js');

const {
    Client,
    Events,
    GatewayIntentBits,
    Partials,
    EmbedBuilder,
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// envの読み込みがうまくいかなかったので一瞬ベタ書き
client.login(process.env.DISCORD_TOKEN).catch(console.error);

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! (${c.user.tag})`); // 起動した時に"Ready!"とBotの名前をコンソールに出力する
});

// ethersのセットアップ
const ethers = require("ethers");
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Polygonの経歴証明
// const CONTRACT_ADDRESS = "0x630911Dc7B90E81584839174a4F95A194A7B7544";
// const contract = require("../contracts/contributionNFT.json");

const CONTRACT_ADDRESS = "0xaE270728bA33666714276F7feCA401DbB716ef7b";
const contract = require("../contracts/Unyte.json");

const abi = contract.abi;
// envの読み込みがうまくいかなかったので一瞬ベタ書き
const privateKey = "0cb8aa4ff203eee33fd894bbc29a7cdbe56f2fd77eae7352ef5dc0b85b71290a"



client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    if (interaction.commandName === "task") {
        await interaction.deferReply();
        await interaction.followUp(":sparkles:トランザクションを処理しています:sparkles:").then(async msg => {
            // Mumbai
            const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL');
            const walletWithProvider = new ethers.Wallet(privateKey, provider);
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, walletWithProvider);
            console.log("コントラクト起動")

            const guild = await client.guilds.fetch(interaction.guildId)
            const teamId = guild.id;
            const teamName = guild.name;
            const teamIconURL = guild.iconURL() ?? ""

            const user = await client.users.fetch(interaction.user.id);
            const userId = user.id;
            const userName = user.username;
            const userIconURL = user.avatarURL() ?? "";

            const content = interaction.options.get('content');

            console.log(`teamId: ${teamId}\nteamName: ${teamName}\nteamIconURL: ${teamIconURL}\n\n\nuserId: ${userId}\nuserName: ${userName}\nuserIconURL: ${userIconURL}\n\n\ncontent: ${content}`);

            let addTaskTxn = await connectedContract.addTask(teamId, teamName, teamIconURL, userId, userName, userIconURL, content);
            console.log("Mining...please wait.");
            console.log(addTaskTxn);
            await addTaskTxn.wait();
            console.log(`Mined, see transaction: ${addTaskTxn.hash}`);
            msg.edit("トランザクションが完了しました！");
        });
    }

    if (interaction.commandName === "thanks") {
        await interaction.deferReply();
        await interaction.followUp(":sparkles:トランザクションを処理しています:sparkles:").then(async msg => {
            // Mumbai
            const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL');
            const walletWithProvider = new ethers.Wallet(privateKey, provider);
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, walletWithProvider);
            console.log("コントラクト起動")

            const taskId = new BigNumber(interaction.options.get('task_id'))

            const user = await client.users.fetch(interaction.user.id);
            const from = user.id;
            const fromName = user.username;
            const fromIconURL = user.avatarURL() ?? "";

            const mentionedId = interaction.options.get("to");
            const toUser = await client.users.fetch(mentionedId.user.id);
            const to = toUser.id;
            const toName = toUser.username;
            const toIconURL = toUser.avatarURL() ?? ""

            const content = interaction.options.get('message');

            console.log(`taskId: ${taskId}\n\n\nfrom: ${from}\nfromName: ${fromName}\nfromIconURL: ${fromIconURL}\n\n\nto: ${to}\ntoName: ${toName}\ntoIconURL: ${toIconURL}\n\n\ncontent: ${content}`);

            let addThanksTxn = await connectedContract.addThank(taskId, from, fromName, fromIconURL, to, toName, toIconURL, content);
            console.log("Mining...please wait.");
            console.log(addThanksTxn);
            await addThanksTxn.wait();
            console.log(`Mined, see transaction: ${addThanksTxn.hash}`);
            msg.edit("トランザクションが完了しました！");
        });
    }
})
