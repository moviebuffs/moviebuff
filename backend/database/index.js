const Sequelize = require('sequelize');

const sequelize = new Sequelize('moviebuff', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('Connect motherfucker')
    })
    .catch((err) => {
        console.log('You fucked up g')
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
    movie_title: Sequelize.STRING,
    movie_description: Sequelize.STRING,
    poster_path: Sequelize.STRING,
    vote_count: Sequelize.INTEGER,
    vote_average: Sequelize.INTEGER
})

const User_Movie_List = sequelize.define('User_Movie_List', {
   user_id: Sequelize.INTEGER,
   movie_id: Sequelize.INTEGER 
})
