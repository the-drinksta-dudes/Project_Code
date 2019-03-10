CREATE TABLE users(
   user_id SERIAL PRIMARY KEY,
   name VARCHAR(100),
   username VARCHAR(40),
   password VARCHAR(255),
   email VARCHAR(255)
);


INSERT INTO users(username, password, email)
VALUES('Holden Nicoletti', 'holden.nicoletti', 'password', 'hokj6625@colorado.edu')
('Trevor Stanley', 'trevor.stanley', 'password', 'trst9490@colorado.edu'),
('Andrew Yee'. 'andrew.yee', 'password', 'anye2688@colorado.edu'),
('Teagan Peters', 'teagan.peters', 'password', 'tepe5782@colorado.edu'),
('Joshua Hamel', 'joshua.hamel', 'password', 'joha2422@colorado.edu'),
('Maxwell Sechelski', 'maxwell.sechelski', 'password', 'mase8617@colorado.edu');
