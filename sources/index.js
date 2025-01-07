
const fs = require("node:fs");
const os = require("node:os");

const grammy = require("grammy");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const client = new grammy.Bot(TELEGRAM_TOKEN);

client.command("start", async (context) => {
    await context.reply("Hello, world!");
});

if (process.env.NODE_ENV == "release") {
    const EXPRESS_PORT = process.env.EXPRESS_PORT;

    const express = require("express");

    const application = express();

    application.use(express.json());
    application.use(express.urlencoded());

    const WEBHOOK_ADDRESS = process.env.WEBHOOK_ADDRESS;

    const clientWebhook = grammy.webhookCallback(client, "express");

    application.use(WEBHOOK_ADDRESS, clientWebhook);

    const server = application.listen(EXPRESS_PORT, serverCallback);

    function serverCallback() {
        const serverAddress = server.address().address;
        const serverPort = server.address().port;
    }
}