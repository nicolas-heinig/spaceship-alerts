const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Listening on ${port}`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/sender", (req, res) => {
  res.sendFile(__dirname + "/views/sender.html");
});

app.get("/css/style.css", (req, res) => {
  res.sendFile(__dirname + "/public/css/style.css");
});

io.on("connection", (socket) => {
  console.log("THERES A CONNECTION");

  socket.on("join_room", (room) => socket.join(room));

  socket.on("disconnect", () => console.log("THERE GOES A CONNECTION"));

  socket.on("send_sender", (data) => {
    console.log(data);
    socket.to(data.room).emit("send_dashboard", data);
  });
});
