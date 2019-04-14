
DROP TABLE drinks;
    CREATE TABLE IF NOT EXISTS drinks (
      name VARCHAR(50),               /* Name of the drink*/
      ID SERIAL PRIMARY KEY,
      img_src VARCHAR(200)
                 /* list of ingredients; strings stored in an array*/
    );

    CREATE SEQUENCE drinks_seq2
      start 1
      increment 1;


    INSERT INTO drinks(name, ID, category, ingredients, description)
    VALUES('Cosmopolitan', nextval('drinks_seq2'), 'https://imgur.com/a/L9mnxuI'),
    ('Vodka Martini', nextval('drinks_seq2'), 'https://imgur.com/a/0hJTmAy'),
    ('Bloody Mary', nextval('drinks_seq2'), 'https://imgur.com/a/hYTKwrm'),
    ('Vodka Tonic', nextval('drinks_seq2'), 'https://imgur.com/a/TfSznCj'),
    ('Screwdriver', nextval('drinks_seq2'), 'https://imgur.com/a/RaH90uI'),
    ('Black Russian', nextval('drinks_seq2'), 'https://imgur.com/a/XZU2ENd'),
    ('Sex on the beach', nextval('drinks_seq2'), 'https://imgur.com/a/QNvpyaG'),
    ('21st Century', nextval('drinks_seq2'), 'https://imgur.com/a/e7OWG86'),
    ('Manhattan Goes Hollywood', nextval('drinks_seq2'), 'https://imgur.com/a/AaIZ4pz'),
    ('El Gavilan', nextval('drinks_seq2'), 'https://imgur.com/a/PTcskMI'),
    ('Magui Cactus', nextval('drinks_seq2'), 'https://imgur.com/a/xqOwgRf'),
    ('Mystic Marvel', nextval('drinks_seq2'), 'https://imgur.com/a/4vxtOCc')
    ;
