const express = require("express");
const cors = require("cors");
const app= express();

app.use(cors());
app.use(express.json());


const port = process.env.PORT||5001;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`My Server is running on port: ${port}`)
})