import express from "express";
import {client} from "./Express.js"
const router = express.Router();


router.get("/", async function (request, response) {
    if(request.query.rating){
      request.query.rating = +request.query.rating;
    } 
  
    const movie1 = await client.db("Movies").collection("movies").find(request.query).toArray();
     
    console.log(request.query);
        response.send(movie1);
  
  })
  
  router.get("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(request.params, id);
    // const movie = movies.filter(r=>r.id === id);
    const movie = await client.db("Movies").collection("movies").findOne( {id: id} );
     
    movie ? response.send(movie) : response.send("Nil");
    console.log(movie);
  })
  
  router.post("/",  async function(request,response){
    const data = request.body;
    const result = await client.db("Movies").collection("movies").insertMany(data);
    console.log(result);
    response.send(result);
    })
  
  router.put("/:id", async function (request, response){
    const { id } = request.params;
    const data = request.body;
  
    const update = await client.db("Movies").collection("movies").updateOne({ id:id},{$set : data});
    console.log(update);
    response.send(update);
  })

  export const moviesRouter = router;