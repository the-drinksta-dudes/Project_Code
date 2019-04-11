DROP TABLE drinks;
    CREATE TABLE IF NOT EXISTS drinks (
      name VARCHAR(50),               /* Name of the drink*/
      ID SERIAL PRIMARY KEY,      /* Drink ID*/
      category VARCHAR(30),           /* Final score of the game for the visiting team */
      ingredients  TEXT[],            /* list of ingredients; strings stored in an array*/
      description VARCHAR(50)        /* drink description; eneter short txt*/
    );
    
    CREATE SEQUENCE drinks_seq2
      start 1
      increment 1;
    
    
    INSERT INTO drinks(name, ID, category, ingredients, description)
    VALUES('Cosmopolitan', nextval('drinks_seq2'), 'vodka', ARRAY ['cointreau','cranberry juice','lime'], 'nice drink'),
    ('Vodka Martini', nextval('drinks_seq2'), 'vodka', ARRAY ['dry vermouth'], 'nice drink'),
    ('Vodka Tonic', nextval('drinks_seq2'), 'vodka', ARRAY ['tonic water','lemon'], 'nice drink'),
    ('Screwdriver', nextval('drinks_seq2'), 'vodka', ARRAY ['orange juice'], 'nice drink'),
    ('Black Russian', nextval('drinks_seq2'), 'vodka', ARRAY ['Kahlua'], 'nice drink'),
    ('Sex on the beach', nextval('drinks_seq2'), 'vodka', ARRAY ['peach schnapps', 'orange juice', 'cranberry juice'], 'nice drink')
    ;
