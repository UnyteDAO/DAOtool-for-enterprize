const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

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

client.login(process.env.DISCORD_TOKEN).catch(console.error);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! (${c.user.tag})`); // 起動した時に"Ready!"とBotの名前をコンソールに出力する
});

// ethersのセットアップ
const ethers = require("ethers");
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// Polygonの経歴証明
const CONTRACT_ADDRESS = "0x630911Dc7B90E81584839174a4F95A194A7B7544";
const contract = require("../contracts/contributionNFT.json");
const abi = contract.abi;
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey);
  
client.on("interactionCreate", async (interaction) => {
  await interaction.deferReply();
  await interaction.followUp(":sparkles:トランザクションを処理しています:sparkles:").then(async msg => {
    // Mumbai
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/OYM4nSdwayU_AlLiq50U7TFXnKqXXcuL');
    const walletWithProvider = new ethers.Wallet(privateKey, provider);
    const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, walletWithProvider);
    console.log("コントラクト起動")
    // let nftTxn = await connectedContract.task();
    let nftTxn = await connectedContract.writeNFT("UnyteDAO","0x3a0bE810754f7f7D04fCA10E2C11E93ebb5BF19e","https://beta.unyte.team/profile/710388387726753852",{gasLimit: 10000000});
    console.log("Mining...please wait.")
    console.log(nftTxn)
    await nftTxn.wait();
    console.log(`Mined, see transaction: ${nftTxn.hash}`);
    msg.edit("トランザクションが完了しました！");
  });
})
  