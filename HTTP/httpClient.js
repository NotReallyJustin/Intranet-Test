const http = require("http");

http.get("10.156.19.189", response => {

    var packets = "";

    response.on("data", data => {
        packets += data;
    });

    response.on("end", () => {
        console.log(packets);
    });
});