
const grammy = require("grammy");
const express = require("express");

const clientToken = process.env.TELEGRAM_TOKEN;

const clientAddress = process.env.CLIENT_ADDRESS;
const clientPort = process.env.CLIENT_PORT;

const client = new grammy.Bot(clientToken);

const clientENV = process.env.NODE_ENV;

client.command("start", clientCommandStart);

async function clientCommandStart(context) {
    await context.reply("Hello, world!");
}

if (clientENV == "release") {
    const application = express();

    application.use(express.json());

    const clientRoute = `/${clientToken}`;
    const clientWebhook = grammy.webhookCallback(client, "express");

    application.use(clientRoute, clientWebhook);

    application.get("/", getDefaultRoute);

    function getDefaultRoute(request, response) {
        response.send("<h1>Hello, world!</h1>");
    }

    const server = application.listen(clientPort, serverListener);

    async function serverListener() {
        const serverAddress = server.address().address;
        const serverPort = server.address().port;

        await client.api.setWebhook(`https://${clientAddress}:${clientPort}${clientRoute}`);

        console.log(`${serverAddress}:${serverPort}`);
    }
}

if (clientENV == "debug") {
    const clientPollingOptions = {
        drop_pending_updates: true
    };

    client.start(clientPollingOptions);
}