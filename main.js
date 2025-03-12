import { ObjectID } from "bson";
import Fastify from "fastify";
import fastifyMongodb from "@fastify/mongodb";
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import { putSongSchema, postSongSchema } from './validator.js'

// Configure environment variables first
dotenv.config();

const app = Fastify({
  logger: true // Adding logger for better debugging
});

// Define a function to start the server
const start = async () => {
  try {
    // Register the CORS plugin first
    await app.register(fastifyCors, {
      origin: ['https://67cf499aef623b2264aa7caf--mybooksdata.netlify.app', 'https://mybooksdata.netlify.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true
    });

    // Register MongoDB plugin
    await app.register(fastifyMongodb, {
      forceClose: true,
      url: process.env.MONGO_URL,
    });

    // Define routes after plugins are registered
    // All your endpoint code here...

    //Endpoint - To get all the data
    app.get('/', async (req, res) => {
      if (!app.mongo.client) {
        return res.status(500).send({ error: "Database connection not established!" });
      }

      const collection = app.mongo.db.collection('Music');
      const music = await collection.find({}).toArray();
      res.send(music);
    });

    //Endpoint - To get specific data using object Id
    app.get('/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const collection = app.mongo.db.collection('Music');
        const music = await collection.findOne({ _id: new ObjectID(id) });

        if (music) {
          res.json(music);
        } else {
          res.status(404).send("Data not found");
        }
      }
      catch (error) {
        res.status(500).send("Internal Error");
      }
    });

    //Endpoint - To add new song details
    app.post('/', postSongSchema, async (req, res) => {
      try {
        const collection = app.mongo.db.collection('Music');
        const { error, value } = postSongSchema.validate(req.body);
        if (error) {
          return res.status(400).send({ error: error.details[0].message })
        }

        const result = await collection.insertOne(value);
        res.status(201).send({ id: result.insertedId, message: 'Song added!' });
      } catch (error) {
        res.status(500).send({ error: 'Unable to add song!' });
      }
    },
    );

    //Endpoint - To update an existing song detail
    app.put('/:id', putSongSchema, async (req, res) => {
      try {
        const collection = app.mongo.db.collection('Music');
        const id = req.params.id;
        const { error, value } = putSongSchema.validate(req.body);
        if (error) {
          return res.status(400).send({ error: error.details[0].message });
        }

        const result = await collection.updateOne(
          { _id: new ObjectID(id) },
          { $set: value }
        );

        if (result.matchedCount === 0) {
          res.status(400).send({ error: 'Song not found' });
        } else {
          res.send({ message: 'Song Updated' });
        }
      } catch (error) {
        res.status(500).send({ error: 'Unable to update' });
      }
    });

    //Endpoint - To delete one song detail
    app.delete('/:id', async (req, res) => {
      try {
        const collection = app.mongo.db.collection('Music');
        const id = req.params.id;

        const result = await collection.deleteOne({ _id: new ObjectID(id) });
        if (result.deletedCount === 0) {
          res.status(404).send({ error: 'Song not found' });
        } else {
          res.send({ message: 'Song deleted' });
        }
      } catch (error) {
        res.status(500).send({ error: 'Unable to delete song' });
      }
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running on port ${PORT}`);

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Call the function to start the server
start();