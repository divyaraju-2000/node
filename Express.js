import express from 'express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import {moviesRouter} from './movies.js'
import {usersRouter} from './user.js'
import cors from 'cors';

dotenv.config();
console.log(process.env.mongo_url);
// const express = requestuire('express')
const app = express();
const Port = process.env.PORT;
app.use(cors());



  app.use(express.json());
// const mongo_url ="mongodb://localhost";
const mongo_url =process.env.mongo_url;



  async function createConnection(){
    const client = new MongoClient(mongo_url);
    await client.connect();
    console.log("succeed");
    return client;
  }

  export const client = await createConnection();
  

app.get("/", function (request, response) {
  response.send("Hiiii");
})

app.use("/movies",moviesRouter)
app.use("/users",usersRouter)

// app.get("/")
app.listen(Port, () => console.log("Done"));