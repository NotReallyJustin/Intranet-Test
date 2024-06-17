// To test this, ideally, use http://127.0.0.1/hi/there?query=%22boo%22
// However - you don't need to wait for redirect. Automatically call the HTTPS server

const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();

const options = {
    key: fs.readFileSync("./Keys/priv_key.pem", {encoding: "utf-8"}),
    cert: fs.readFileSync("./Keys/cert.pem", {encoding: "utf-8"}),
    passphrase: "Garfield"
};
const server = https.createServer(options, app);

app.use((request, response, next) => {
    if (request.protocol == "https")
    {
        next();
    }
    else
    {
        let redirectURL = `https://${request.get("host")}${request.originalUrl}`;
        console.log(`Redirected to ${redirectURL}.`)
        response.redirect(redirectURL);
    }
});

app.all("*", (request, response) => {
    const textToSend = fs.readFileSync("./classified.txt", {encoding: "utf-8"});
    response.send(textToSend);
});

server.listen(443, () => {
    console.log("Server is up.");
});

app.listen(80, () => {
    console.log("Bootleg http server is up"); 
});