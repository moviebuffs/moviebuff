const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgresql',
  port: process.env.PORT,
});

sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Could not connect to the database', err));

// sequelize.sync({
//   force: true, // Drops info in database for testing 
// })

const User = sequelize.define('user', { // model schema for user -- lowercase for psql. 
  username: Sequelize.STRING,
  email: Sequelize.STRING,
});

const Movie = sequelize.define('movie', { // model schema for movie -- lowercase for psql. 
  movieTitle: Sequelize.STRING,
  movieDescription: Sequelize.STRING(2000),
  posterPath: Sequelize.STRING,
  voteCount: Sequelize.INTEGER,
  voteAverage: Sequelize.FLOAT,
  userVotes: { 
    type: Sequelize.INTEGER,
    dafaultValue: 0,
  },
});

// Postgres will automatically make movie and user plural values in db tables

Movie.belongsToMany(User, { // defines relationship
  through: 'user_movie_list', // stores reference on join table
  foreignKey: 'movieId' // links correct id
})

User.belongsToMany(Movie, { // inverse relationship should also be defined
  through: 'user_movie_list',
  foreignKey: 'userId'
})

module.exports = { User, Movie };
