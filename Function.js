import { client } from "./Express.js";

export async function deleteMovieById(id) {
    return await client
        .db("movies")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function updateMovieById(id, data) {
    return await client
        .db("Movies")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function createMovie(data) {
    return await client
        .db("Movies")
        .collection("movies")
        .insertMany(data);
}

export async function createUsers(data) {
    
    const{username,password} = data;
    return await client
        .db("Movies")
        .collection("users")
        .insertOne({username:username,password:password});
}

export async function getMovieById(id) {
    return await client
        .db("Movies")
        .collection("movies")
        .findOne({ id: id });
}
export async function getAllMovies(request) {
    return await client
        .db("Movies").
        collection("movies").
        find(request.query).toArray();
}

export async function getUserByName(username){
    return await client    
         .db("Movies")
         .collection("users")
         .findOne({ username: username});
}