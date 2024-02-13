const http = require("http");

http.get("IP ADDRESS HERE", response => {

    var packets = "";

    response.on("data", data => {
        packets += data;
    });

    response.on("end", () => {
        console.log(packets);
    });
});