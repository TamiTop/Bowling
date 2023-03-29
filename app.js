require('dotenv').config()
const app = require("express")();
const serverPort = process.env.SERVER_PORT ?? 8080;
const router = require("./routes/routes");

app.use('/', router);

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}.`);
})