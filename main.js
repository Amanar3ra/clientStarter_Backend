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
    app.get('/:musicId', async (req, res) => {
      // Your existing code...
    });

    //Endpoint - To add new song details
    app.post('/', { schema: postSongSchema }, async (req, res) => {
      // Your existing code...
    });

    //Endpoint - To update an existing song detail
    app.put('/:musicId', { schema: putSongSchema }, async (req, res) => {
      // Your existing code...
    });

    //Endpoint - To delete one song detail
    app.delete('/:musicId', async (req, res) => {
      // Your existing code...
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