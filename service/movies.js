const {moviesMock} = require("../utils/mocks/movies");
const MySqlLib = require("../lib/mysql")
class MoviesService {

    constructor() {
      //this.collection = 'movies';
      this.mysqlDB = new MySqlLib();
    }
    async getMovies(/*{ tags }*/) {
      //const query = tags && { tags: { $in: tags } };
      const query= "SELECT * FROM movies "
      const movies = await this.mysqlDB.get(query); 
      return movies || [];
    }
  
    async getMovie(movieId ) {
      const query = `SELECT * FROM movies WHERE id = ${movieId}`
      const movie = await this.mysqlDB.get(query);
      return movie || {};
    }
  
    async createMovie({ movie }) {

     try {

      const query = `INSERT INTO movies (title, cover, description, duration, id_tags) VALUES (?, ?, ?, ?, ?)`;
      const movieToArray=Object.values(movie);
      const {insertId} = await this.mysqlDB.create(query, movieToArray);
      return {insertId} || {};
       
     } catch (error) {
       return Promise.reject(error)
     }
    }
  
    async updateMovie(movieId,{movie}) {
      const query = `UPDATE  movies SET title = ? , cover = ?, description = ?, duration = ?, id_tags = ? WHERE id = ${movieId} `;
      const movieToArray=Object.values(movie);
      const updateMovie = await this.mysqlDB.updated(query, movieToArray);
      return updateMovie || {};
    }
  
    async deletedMovie(movieId ) {
      const query = `DELETE FROM movies where id = ${movieId}`;
      const deletedMovieId = await this.mysqlDB.delete(query);
      return deletedMovieId;
    }
  
  
  }
  
  module.exports = MoviesService;