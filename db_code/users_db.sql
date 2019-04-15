CREATE TABLE users(
   user_id SERIAL PRIMARY KEY,
   name VARCHAR(100),
   username VARCHAR(40),
   password VARCHAR(255),
   email VARCHAR(255) 
);

CREATE TABLE followers(
   user_id_followed INT REFERENCES users(user_id),
   user_id_follower INT REFERENCES users(user_id),
   PRIMARY KEY (user_id_followed, user_id_follower)
  );

CREATE TABLE fav_drinks(
	user_id INT REFERENCES users(user_id),
	drink_id INT REFERENCES drinks(ID),
	PRIMARY KEY (user_id, drink_id)
);

-- INSERT INTO users(name, username, password, email)
-- VALUES('Holden Nicoletti', 'holden.nicoletti', 'password', 'hokj6625@colorado.edu'),
-- ('Trevor Stanley', 'trevor.stanley', 'password', 'trst9490@colorado.edu'),
-- ('Andrew Yee', 'andrew.yee', 'password', 'anye2688@colorado.edu'),
-- ('Teagan Peters', 'teagan.peters', 'password', 'tepe5782@colorado.edu'),
-- ('Joshua Hamel', 'joshua.hamel', 'password', 'joha2422@colorado.edu'),
-- ('Maxwell Sechelski', 'maxwell.sechelski', 'password', 'mase8617@colorado.edu');

-- INSERT INTO followers(user_id_followed, user_id_follower)
-- VALUES(1,2),(1,3),(1,4),(1,5),(1,6),(2,1),(2,3),(2,4),(2,5),(2,6),(3,1),(3,2),(3,4),(3,5),(3,6),
-- (4,1),(4,2),(4,3),(4,5),(4,6),(5,1),(5,2),(5,3),(5,4),(5,6),(6,1),(6,2),(6,3),(6,4),(6,5);


-- INSERT INTO fav_drinks(user_id, drink_id)
-- VALUES(1, 7),(2,8),(3,9),(4,10),(5,11),(6,12);
