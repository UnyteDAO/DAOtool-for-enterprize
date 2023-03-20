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
// Astar
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Polygonの経歴証明
// const CONTRACT_ADDRESS = "0x630911Dc7B90E81584839174a4F95A194A7B7544";
// const contract = require("../contracts/contributionNFT.json");

// const CONTRACT_ADDRESS = "0xEB4c7c27c8055a3fAFc20e491A157f0641d46cE0";
const contract = require("../contracts/Unyte.json");

const abi = contract.abi;
// envの読み込みがうまくいかなかったので一瞬ベタ書き
const privateKey = process.env.PRIVATE_KEY



client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    if (interaction.commandName === "task") {
        await interaction.deferReply();
        await interaction.followUp("<a:loading:1086922993692848151>トランザクションを処理しています<a:loading:1086922993692848151>").then(async msg => {
            // Mumbai
            const provider = new ethers.providers.JsonRpcProvider('https://astar.blastapi.io/72fc6242-60a0-4d5c-b03d-5800687511c1');
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

            const content = interaction.options.get('content').value;

            console.log(`teamId: ${teamId}\nteamName: ${teamName}\nteamIconURL: ${teamIconURL}\n\n\nuserId: ${userId}\nuserName: ${userName}\nuserIconURL: ${userIconURL}\n\n\ncontent: ${content}`);

            let addTaskTxn = await connectedContract.addTask(teamId, teamName, teamIconURL, userId, userName, userIconURL, content);
            console.log("Mining...please wait.");
            console.log(addTaskTxn);
            await addTaskTxn.wait();
            console.log(`Mined, see transaction: ${addTaskTxn.hash}`);
            msg.edit(":white_check_mark:トランザクションが完了しました！");
        });
    }

    if (interaction.commandName === "thanks") {
        await interaction.deferReply();
        await interaction.followUp("<a:loading:1086922993692848151>トランザクションを処理しています<a:loading:1086922993692848151>").then(async msg => {
            // Mumbai
            const provider = new ethers.providers.JsonRpcProvider('https://astar.blastapi.io/72fc6242-60a0-4d5c-b03d-5800687511c1');
            const walletWithProvider = new ethers.Wallet(privateKey, provider);
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, walletWithProvider);
            console.log("コントラクト起動")

            const taskId = interaction.options.get('task_id').value
            console.log(taskId)

            const user = await client.users.fetch(interaction.user.id);
            const from = user.id;
            const fromName = user.username;
            const fromIconURL = user.avatarURL() ?? "";

            const mentionedId = interaction.options.get("to");
            const toUser = await client.users.fetch(mentionedId.user.id);
            const to = toUser.id;
            const toName = toUser.username;
            const toIconURL = toUser.avatarURL() ?? ""

            const content = interaction.options.get('message').value;

            console.log(`taskId: ${taskId}\n\n\nfrom: ${from}\nfromName: ${fromName}\nfromIconURL: ${fromIconURL}\n\n\nto: ${to}\ntoName: ${toName}\ntoIconURL: ${toIconURL}\n\n\ncontent: ${content}`);

            let addThanksTxn = await connectedContract.addThank(taskId, from, fromName, fromIconURL, to, toName, toIconURL, content);
            console.log("Mining...please wait.");
            console.log(addThanksTxn);
            await addThanksTxn.wait();
            console.log(`Mined, see transaction: ${addThanksTxn.hash}`);
            msg.edit(":white_check_mark:トランザクションが完了しました！");
        });
    }
})
