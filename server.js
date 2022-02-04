const fs = require("fs");
const http = require("http");
http
  .createServer((req, res) => {
    let path = req.url;
    if (req.url === "/") {
      path = "/index.html";
    }
    fs.readFile("./static" + path, function (err, data) {
      if (!err) {
        res.end(data);
      }
    });
  })
  .listen(4000);
