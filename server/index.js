const express = require("express");
const app = express();
const cors = require("cors");

const port = 8080;

const { fruits } = require("./mocks/fruits");

app.use(cors());

app.get("/fruits", (req, res) => {
  const criteria = req.query.q?.toLowerCase() || "";
  const filteredFruits = criteria
    ? fruits.filter((fruit) => fruit.toLowerCase().includes(criteria))
    : [];
  res.json(filteredFruits);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
