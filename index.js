
const cors = require("cors");
const express = require('express');
const app= express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const Cart=ZTechDatabase.collection("Cart");


    app.post("/AllProducts", async (req, res)=> 
    {
        const Product= req.body;
        const result= await AllProducts.insertOne(Product);
        res.send(result);

    });

    app.post("/MyCart", async (req, res)=> 
    {
        const Product= req.body;
        const result= await Cart.insertOne(Product);
        res.send(result);
        console.log(Product);

    }
    
    );

    app.get("/MyCart", async(req,res)=>
    {
      const cursor = Cart.find();
      const result=await cursor.toArray();
      res.send(result);
    });

    app.get("/AllProducts", async(req,res)=>
    {
      const cursor = AllProducts.find();
      const result=await cursor.toArray();
      res.send(result);
    });

    // app.delete("/MyCart/:id", async(req, res)=>
    // {  

    //   console.log(req.params)
    //   console.log(req.params.id)
    //      const id = req.params.id;
    //      const query={_id: new ObjectId(id)};
    //      const result= await Cart.deleteOne(query);

    //      res.send(result);
    //      console.log(query);
    // });

    app.delete('/MyCart/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await Cart.deleteOne(filter);
      res.send(result);
      
  })


  app.get("/AllProducts/:id", async(req,res)=>
  {
    const id=req.params.id;
     const filter = { _id: new ObjectId(id) };
     const result = await AllProducts.findOne(filter);
      res.send(result);
  })

  app.get("/AllProducts/Products/Apple", async(req,res)=>
  {
    console.log(req.body)
   
     console.log(AllProducts)
     const result = await AllProducts.find({ brandName: "Apple" });
      res.send(result);
  })


  app.put("/AllProducts/:id", async(req,res)=>
  {
    const id=req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
            const updatedProduct = req.body;

            const product = {
                $set: {
                  brandName: updatedProduct.brandName,
                  productName: updatedProduct.productName,
                    productType: updatedProduct.productType,
                    price: updatedProduct.price,
                    imageUrl: updatedProduct.imageUrl,
                    rating: updatedProduct.rating,
                    description: updatedProduct.description
                }
            }
            console.log(product)

            const result = await AllProducts.updateOne(filter, product, options);
            res.send(result);
  }
  )




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


