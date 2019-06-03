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
  title: Sequelize.STRING,
  movieDescription: Sequelize.STRING(2000),
  posterPath: Sequelize.STRING,
  voteCount: Sequelize.INTEGER,
  voteAverage: Sequelize.FLOAT,
  userVotes: { 
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

// Postgres will automatically make movie and user plural values in db tables

const UsersMovies = sequelize.define('users_movies', {}); // create join table as new table so it can be referenced as variable
UsersMovies.belongsTo(User); // define join table relationship to User
UsersMovies.belongsTo(Movie); // define join table relationship to Movie

module.exports = { User, Movie, UsersMovies };
