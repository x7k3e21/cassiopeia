
const grammy = require("grammy");

const clientToken = process.env.BOT_TOKEN;
const clientPort = process.env.BOT_PORT;

const client = new grammy.Bot(clientToken);

client.command("start", clientCommandStart);

const OpenAI = require("openai");

const OpenAIClient = new OpenAI({
    baseURL: "https://api.naga.ac/v1",
    apiKey: process.env.OPENAI_TOKEN}); 

client.command("drawSD", async (context) => {
    const imagePrompt = context.message.text.split(" ");
    imagePrompt.shift();
    
    let OpenAIResponse = await OpenAIClient.images.generate({model:"sdxl", prompt:imagePrompt.toString()});

    await context.replyWithPhoto(OpenAIResponse.data[0].url);
});

client.command("drawKD", async (context) => {
    const imagePrompt = context.message.text.split(" ");
    imagePrompt.shift();
    
    let OpenAIResponse = await OpenAIClient.images.generate({model:"kandinsky-3.1", prompt:imagePrompt.toString()});

    await context.replyWithPhoto(OpenAIResponse.data[0].url);
});

client.command("drawPG", async (context) => {
    const imagePrompt = context.message.text.split(" ");
    imagePrompt.shift();
    
    let OpenAIResponse = await OpenAIClient.images.generate({model:"playground-v2.5", prompt:imagePrompt.toString()});

    await context.replyWithPhoto(OpenAIResponse.data[0].url);
});

async function clientCommandStart(context) {
    await context.reply("Hello, world!");
}

const express = require("express");

const application = express();

application.use(express.json());

//application.use(grammy.webhookCallback(client, "express"));

application.get("/", (request, response) => {
    response.send("<h1>Hello, world!</h1>");
});

const server = application.listen(clientPort, serverCallback);

function serverCallback() {
    const serverAddress = server.address().address;
    const serverPort = server.address().port;

    console.log(`${serverAddress}:${serverPort}`);
}

client.start();