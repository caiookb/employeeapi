const express = require("express");
const app = express();
const config = require("./src/config/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const url = config.bd_string;

const usersRoute = require("./src/routes/users");
const employeesRoute = require("./src/routes/employees");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(url, options);
} catch (err) {
  console.log("Erro ao conectar ao banco", err);
}

mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", (err) => {
  console.log("Erro do banco: ", err);
});
mongoose.connection.on("connected", (err) => {
  console.log("Conectado ao banco de dados!");
});
mongoose.connection.on("disconnected", () => {
  console.log("Desconectado do banco!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/users", usersRoute);
app.use("/employees", employeesRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("conectado");
});

module.exports = app;
