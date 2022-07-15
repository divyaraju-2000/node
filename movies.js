import express from "express";
import { getAllMovies, getMovieById, createMovie, updateMovieById, deleteMovieById } from "./Function.js";
const router = express.Router();
import {auth} from "./auth.js";


router.get("/", auth,async function (request, response) {
    if(request.query.rating){
      request.query.rating = +request.query.rating;
    } 
  
    const movie1 = await getAllMovies(request);
     
    console.log(request.query)
        response.send(movie1)
  
  })
  
  router.get("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(request.params, id);
    // const movie = movies.filter(r=>r.id === id);
    const movie = await getMovieById(id);
     
    movie ? response.send(movie) : response.send("Nil");
    console.log(movie);
  })
  
  router.post("/",  async function(request,response){
    const data = request.body;
    const result = await createMovie(data);

    console.log(result);
    response.send(result);
    })
  
  router.put("/:id", async function (request, response){
    const { id } = request.params;
    const data = request.body;
  
    const update = await updateMovieById(id, data);

    console.log(update);
    response.send(update);
  })

  router.delete("/:id", async function(request, response){
    const {id} = request.params;

    const deletemovie = await deleteMovieById(id)

                   response.send(deleteOne);
           })

  export const moviesRouter = router;


