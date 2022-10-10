const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.toqdjj9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const moviesCollection = client.db('Movies-Collection').collection('Movies-List');

        app.post('/movies', async (req, res) => {
            const newMovie = req.body;
            const result = await moviesCollection.insertOne(newMovie);
            res.send(result);

        });
        app.get('/movies', async (req, res) => {
            const query = {};
            const cursor = moviesCollection.find(query);
            const Movies = await cursor.toArray();
            res.send(Movies)
        });

        app.get('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const Movies = await moviesCollection.findOne(query);
            res.send(Movies);
        });
        // app.get('/movie', async (req, res) => {
        //     const page = req.query.page || 0;
        //     const moviesPerPage = 5;
        //     let movies = []
        //     moviesCollection.find().skip(page * moviesPerPage).limit(moviesPerPage).forEach(movie = moviesCollection.push(movie)).then(() => {
        //         res.status(200).json(movies)
        //     })
        //         .catch(() => {
        //             res.status(500).json({ error: 'can not fetch' })
        //         })
        // });

    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(' Movies Server Running!!!!')
})

app.listen(port, () => {
    console.log(`Hello from Movies Server ${port}`)
})