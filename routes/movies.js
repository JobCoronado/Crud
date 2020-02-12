const express = require('express');
const MoviesServices = require("../service/movies");
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesServices();

  router.get('/', async function (req, res, next) {

    console.log('ok')
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies();
      //await moviesService.getMovies({ tags });
      // throw new Error("Error getting movies");
      res.status(200).json({
        movies: movies,
        message: 'movies listed'
      });
    } catch (error) {
      next(error);
    }
  });

  // Get movie by id
  router.get(
    '/:movieId',
    //validationHandler(joi.object({ movieId: movieIdSchema }), 
    //'params'),
    async function (req, res, next) {

      const { movieId } = req.params;
      try {
        const movies = await moviesService.getMovie(movieId );
        res.status(200).json({
          movie: movies,
          message: 'movies retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // create
  router.post('/',// validationHandler(joi.object(createMovieSchema)), 
  async function (
    req,
    res,
    next
  ) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie(movie);
      res.status(201).json({
        movieId: createdMovieId,
        message: 'movie created'
      });
    } catch (error) {
      next(error);
    }
  });

  // PUT - actualizar
  router.put(
    '/:movieId',
    //validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    //validationHandler(joi.object(updateMovieSchema)),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await moviesService.updateMovie(
          movieId,
          movie
        );
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // delete
  router.delete(
    '/:movieId',
    //validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deleteMovieId = await moviesService.deletedMovie( movieId );
        res.status(200).json({
          data: deleteMovieId,
          message: 'movies deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApi;