require('dotenv').config()
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path');

const router = require("./routes/routes");
const serverPort = process.env.SERVER_PORT ?? 8080;
const clientPath = process.env.CLIENT_PATH ?? '../bowling-game-client/dist/bowling-game-client';

app.use(express.static(path.join(__dirname, clientPath)));
app.use(cors());

app.use('/', router);

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}.`);
})