const fs = require("fs");
const http = require("http");
const users = [
  { name: "waimoe", email: "waimoe@gmail.com" },
  { name: "khinphonelwin", email: "khinphone@gmail.com" },
];
const server = http.createServer((req, res) => {
  const isRootUrl = req.url === "/";
  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/users") {
    const method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newData = JSON.parse(body);
        users.push(newData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const dataPut = JSON.parse(body);
        // console.log(dataPut);
        const fineEmail = users.find((user) => user.email === dataPut.email);

        if (fineEmail) {
          fineEmail.name = dataPut.name;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
        }
        res.end();
        // const newData = JSON.parse(body);
        // users.push(newData);
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const dataDelete = JSON.parse(body);
        // console.log(dataPut);
        const fineEmail = users.find((user) => user.email === dataDelete.email);
        if (fineEmail) {
          const deleteIndex = users.indexOf(fineEmail);
          users.splice(deleteIndex, 1);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
        }
        res.end();
      });
    } else {
      res.end();
    }
    // } else if (req.url === "/fileupload") {
    //   let body = "";
    //   req.on("data", (chunk) => {
    //     body += chunk;
    //   });
    //   req.on("end", () => {
    //     fs.writeFileSync("hello.txt", body);
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.write(JSON.stringify({ text: "File Upload is success..." }));
    //     res.end();
    //   });
    // }
  } else {
    res.writeHead(404);
    res.write(`<h1>Unkown router<h1>`);
    res.end();
  }
});
server.listen(3000, () => {
  console.log("Sever started:Listening on port 3000");
});
