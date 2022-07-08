import express from 'express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config();
console.log(process.env.mongo_url);
// const express = requestuire('express')
const app = express();
const Port = process.env.PORT;

const movies=[

  {
  "id": "100",
  "name": "RRR",
  "poster":
  "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
  "rating": 8.8,
  "summary": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
  "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0"
  },
  {
  "id": "101",
  "name": "Iron man 2",
  "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
  "rating": 7,
  "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces presponsesure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
  "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
  },
  {
  "id": "102",
  "name": "No Country for Old Men",
  "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
  "rating": 8.1,
  "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
  "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
  },
  {
  "id": "103",
  "name": "Jai Bhim",
  "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
  "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
  "rating": 8.8,
  "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {
  "id": "104",
  "name": "The Avengers",
  "rating": 8,
  "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
  "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
  "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
  },
  {
  "id": "105",
  "name": "Interstellar",
  "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
  "rating": 8.6,
  "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of responseearchers, to find a new planet for humans.",
  "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
  }];

  app.use(express.json());
// const mongo_url ="mongodb://localhost";
const mongo_url =process.env.mongo_url;



  async function createConnection(){
    const client = new MongoClient(mongo_url);
    await client.connect();
    console.log("succeed");
    return client;
  }

  const client = await createConnection();
  

app.get("/", function (request, response) {
  response.send("Hiiii");
})

app.get("/movies", async function (request, response) {
  if(request.query.rating){
    request.query.rating = +request.query.rating;
  } 

  const movie1 = await client.db("Movies").collection("movies").find(request.query).toArray();
   
  console.log(request.query);
      response.send(movie1);

})

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  // const movie = movies.filter(r=>r.id === id);
  const movie = await client.db("Movies").collection("movies").findOne( {id: id} );
   
  movie ? response.send(movie) : response.send("Nil");
  console.log(movie);
})

app.post("/create",  async function(request,response){
  const data = request.body;
  const result = await client.db("Movies").collection("movies").insertMany(data);
  console.log(result);
  response.send(result);
  })

app.put("/movies/:id", async function (request, response){
  const { id } = request.params;
  const data = request.body;

  const update = await client.db("Movies").collection("movies").updateOne({ id:id},{$set : data});
  console.log(update);
  response.send(update);
})

// app.get("/")
app.listen(Port, () => console.log("Done"));