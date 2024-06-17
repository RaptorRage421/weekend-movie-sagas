const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});
router.get('/:id', (req, res) => {
  const movieId = req.params.id;
 

  const query = `
      SELECT
    "movies"."id" AS "movie_id",
    "movies"."title" AS "title",
    "movies"."description" AS "description",
    "movies"."poster" AS "poster",
    jsonb_agg(jsonb_build_object('name', "genres"."name")) AS "genres"
FROM
    "movies"
JOIN
    "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
JOIN
    "genres" ON "movies_genres"."genre_id" = "genres"."id"
WHERE
    "movies"."id" = $1
GROUP BY
    "movies"."id";
  `;

  pool.query(query, [movieId])
    .then(result => {
      // console.log("result.rows", result.rows)
      res.send(result.rows); 

    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
      res.status(500).send('Error fetching movie details');
    });
});

router.post('/', (req, res) => {
  const { title, poster, description, genre_id } = req.body; // Destructure genre_id from req.body

  // FIRST QUERY: Insert into movies table
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    title,
    poster,
    description
  ];

  pool.query(insertMovieQuery, insertMovieValues)
    .then(movieResult => {
      const movieId = movieResult.rows[0].id;
      console.log('New Movie Id:', movieId);

      // SECOND QUERY: Insert into movies_genres table
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;

      // Map over genre_id array to create array of arrays for insertion
      const insertMovieGenreValues = genre_id.map(genreId => [movieId, genreId]);

      return Promise.all(
        insertMovieGenreValues.map(values => pool.query(insertMovieGenreQuery, values))
      );
    })
    .then(() => {
      res.sendStatus(201); // Send success response if everything is successful
    })
    .catch(err => {
      console.error('Error inserting movie and genres:', err);
      res.sendStatus(500); // Send error response if any query fails
    });
});

module.exports = router;
