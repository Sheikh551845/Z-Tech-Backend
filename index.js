const express = require("express");
const cors = require("cors");
const app= express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT||8888;

app.use(cors());
app.use(express.json());

// sheikh551845
// LIi9iunM1WtePj3K



// const uri = "mongodb+srv://sheikh551845:LIi9iunM1WtePj3K@cluster0.4kc4xcj.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://sheikh551845:LIi9iunM1WtePj3K@ac-dzczvnk-shard-00-00.4kc4xcj.mongodb.net:27017,ac-dzczvnk-shard-00-01.4kc4xcj.mongodb.net:27017,ac-dzczvnk-shard-00-02.4kc4xcj.mongodb.net:27017/?ssl=true&replicaSet=atlas-dehx9a-shard-0&authSource=admin&retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    const ZTechDatabase=client.db("ZTechDatabase");
    const AllProducts=ZTechDatabase.collection("AllProducts");
    const CartProducts=ZTechDatabase.collection("CartProducts");


    app.post("/AllProducts", async (req, res)=> 
    {
        const Product= req.body;
        const result= await AllProducts.insertOne(Product);
        res.send(result);

    });

    app.post("/MyCart", async (req, res)=> 
    {
        const Product= req.body;
        const result= await CartProducts.insertOne(Product);
        res.send(result);
        console.log(Product);

    }
    
    );

    app.get("/MyCart", async(req,res)=>
    {
      const cursor = CartProducts.find();
      const result=await cursor.toArray();
      res.send(result);
    });

    app.get("/AllProducts", async(req,res)=>
    {
      const cursor = AllProducts.find();
      const result=await cursor.toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`My Server is running on port: ${port}`)
})


