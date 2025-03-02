import { ObjectID } from "bson";
import Fastify from "fastify";
import fastifyMongodb from "fastify-mongodb";
import fastifyCors from '@fastify/cors';
import { putSongSchema, postSongSchema } from './validator.js'

const app = Fastify();

//Connection with MongoDB
app.register(fastifyCors, {
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(fastifyMongodb, {
    url: process.env.MONGO_URL
});

//Endpoint - To get all the data
app.get('/', async (req, res) => {
    const collection = app.mongo.db.collection('Music');
    const music = await collection.find({}).toArray();
    res.send(music);
});

//Endpoint - To get specific data using object Id
app.get('/:musicId', async (req, res) => {
    try{
        const musicId = req.params.musicId;
        const collection = app.mongo.db.collection('Music');
        const music = await collection.findOne({_id: new ObjectID(musicId)});

        if(music){
            res.send(music);
        } else{
            res.status(404).send("Data not found");
        }
    }
    catch(error){
        res.status(500).send("Internal Error");
    }
});

//Endpoint - To add new song details
app.post('/', postSongSchema, async (req, res) => {
    try{
        const collection = app.mongo.db.collection('Music');
        const {error, value } = postSongSchema.validate(req.body);
        if(error){
            return res.status(400).send({error: error.details[0].message})
        }

        const result = await collection.insertOne(value);
        res.status(201).send({id: result.insertedId, message: 'Song added!'});
    }catch(error) {
        res.status(500).send({error: 'Unable to add song!'});
    }},
);

//Endpoint - To update an existing song detail
app.put('/:musicId', putSongSchema, async (req, res) => {
    try{
        const collection = app.mongo.db.collection('Music');
        const musicId = req.params.musicId;
        const {error, value} = putSongSchema.validate(req.body);
        if(error){
            return res.status(400).send({error: error.details[0].message});
        }

        const result = await collection.updateOne(
            {_id: new ObjectID(musicId)},
            {$set: value}
        );

        if(result.matchedCount === 0){
            res.status(400).send({error: 'Song not found'});
        }else{
            res.send({message: 'Song Updated'});
        }
    }catch(error) {
        res.status(500).send({error : 'Unable to update'});
    }
});

//Endpoint - To delete one song detail
app.delete('/:musicId', async (req, res) => {
    try{
        const collection = app.mongo.db.collection('Music');
        const musicId = req.params.musicId;

        const result = await collection.deleteOne({_id: new ObjectID(musicId)});
        if(result.deletedCount === 0){
            res.status(404).send({error: 'Song not found'});
        }else{
            res.send({message: 'Song deleted'});
        }
    }catch(error){
        res.status(500).send({error: 'Unable to delete song'});
    }
});

//Listening on port 5000
// try {
//     await app.listen({ port: 5000 })
//     console.log("Server listening on Port: 5000");
// } catch (err) {
//     app.log.error(err)
//     process.exit(1)
// }

const PORT = process.env.PORT || 3000; // Use Render’s provided PORT

try {
    await app.listen({ port: PORT, host: '0.0.0.0' }); // Bind to 0.0.0.0
    console.log(`Server running on http://0.0.0.0:${PORT}`);
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
