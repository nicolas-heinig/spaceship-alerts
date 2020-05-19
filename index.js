const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(80);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/sender", (req, res) => {
  res.sendFile(__dirname + "/views/sender.html");
});

io.on("connection", (socket) => {
  console.log("THERES A CONNECTION");

  socket.on("disconnect", () => {
    console.log("THERE GOES A CONNECTION");
  });

  socket.on("send_message", (data) => {
    console.log(data);
  });
});
