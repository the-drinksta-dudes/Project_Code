CREATE TABLE users(
   user_id SERIAL PRIMARY KEY,
   username VARCHAR(40),
   password VARCHAR(255),
   email VARCHAR(255)
);


INSERT INTO users(username, password, email)
VALUES('holden.nicoletti', 'password', 'hokj6625@colorado.edu')
('trevor.stanley', 'password', 'trst9490@colorado.edu'),
('andrew.yee', 'password', 'anye2688@colorado.edu'),
('teagan.peters', 'password', 'tepe5782@colorado.edu'),
('joshua.hamel', 'password', 'joha2422@colorado.edu'),
('maxwell.sechelski', 'password', 'mase8617@colorado.edu');
