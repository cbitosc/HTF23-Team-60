import express from "express";
import mongoose from "mongoose";
import ProfileRoute from "./Routes/ProfileRoute.js";
import PetRoute from "./Routes/PetRoute.js";
import AdoptRoute from "./Routes/AdoptRoute.js";
import cors from "cors";


export const PORT = 5555;
export const mongoDB = "mongodb+srv://team60:PT1OVHZWd18OcWpB@team60.ebqzrcq.mongodb.net/team60-collection?retryWrites=true&w=majority"

const app = express();

app.use(express.json({ limit: '10mb' }));


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to Team60 board");
})

app.use("/profile", ProfileRoute);
app.use("/pet", PetRoute);
app.use("/adopt", AdoptRoute);

mongoose.connect(mongoDB).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log('Error connecting to Mongo', error);
})
