const Sequelize = require('sequelize');
//require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgresql',
  port: process.env.PORT,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connect motherfucker');
  })
  .catch((err) => {
    console.log('You fucked up g');
  });

sequelize.sync({
  force: true,
})


const User = sequelize.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Movie = sequelize.define('Movie', {
  movieTitle: Sequelize.STRING,
  movieDescription: Sequelize.STRING,
  posterPath: Sequelize.STRING,
  voteCount: Sequelize.INTEGER,
  voteAverage: Sequelize.INTEGER
})

const UserMovieList = sequelize.define('User_Movie_List', {
  userId: Sequelize.INTEGER,
  movieId: Sequelize.INTEGER
})

module.exports = { User, Movie, UserMovieList };