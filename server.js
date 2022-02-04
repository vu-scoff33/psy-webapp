const fs = require("fs");
const http = require("http");
http
  .createServer((req, res) => {
    fs.readFile("./static/index.html", function (err, data) {
      if (!err) {
        res.end(data);
      }
    });
  })
  .listen(4000);
