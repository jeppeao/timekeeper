const express = require("express");
const env = require("./env.ts");

const PORT = env.SERVER_PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});