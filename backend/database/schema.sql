CREATE TABLE "User" (
"id"  SERIAL ,
"username" VARCHAR(50) ,
"email" VARCHAR(50) ,
"password" VARCHAR(20) ,
PRIMARY KEY ("id")
);

CREATE TABLE "Movie" (
"id"  SERIAL ,
"movie_title" VARCHAR(50) ,
"movie_description" VARCHAR(1000) ,
"poster_path" VARCHAR(50) ,
"vote_count" INTEGER ,
"vote_average" INTEGER ,
PRIMARY KEY ("id")
);

CREATE TABLE "User_Movie_List" (
"id"  SERIAL ,
"user_id" INTEGER ,
"movie_id" INTEGER ,
PRIMARY KEY ("id")
);

ALTER TABLE "User_Movie_List" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");
ALTER TABLE "User_Movie_List" ADD FOREIGN KEY ("movie_id") REFERENCES "Movie" ("id");
