const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');



app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWD_DB}@cluster0.pg0dj0q.mongodb.net/?retryWrites=true&w=majority`;
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
    const foodsCollection = client.db('foodsItems').collection('meals')

    app.get('/meals', async(req,res)=>{
        const query = {}
        const cursor = foodsCollection.find(query);
        const meal = await cursor.toArray();
        res.send(meal)
    })
    
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Big Boy server is running')
}) 

app.listen(port, ()=>{
    console.log(`Big Boy server running on ${port}`)
})
