
const grammy = require("grammy");

const clientToken = process.env.BOT_TOKEN;
const clientPort = process.env.BOT_PORT;

const client = new grammy.Bot(clientToken);

client.command("start", clientCommandStart);

async function clientCommandStart(context) {
    await context.reply("Hello, world!");
}

const express = require("express");

const application = express();

application.use(express.json());

application.use(grammy.webhookCallback(client, "express"));

application.get("/", (request, response) => {
    response.send("<h1>Hello, world!</h1>");
});

const server = application.listen(clientPort, serverCallback);

function serverCallback() {
    const serverAddress = server.address().address;
    const serverPort = server.address().port;

    console.log(`${serverAddress}:${serverPort}`);
}