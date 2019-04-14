DROP TABLE drinks;
    CREATE TABLE IF NOT EXISTS drinks (
      name VARCHAR(50),               /* Name of the drink*/
      ID SERIAL PRIMARY KEY,      /* Drink ID*/
      category VARCHAR(30),           /* Final score of the game for the visiting team */
      ingredients  TEXT[],            /* list of ingredients; strings stored in an array*/
      description VARCHAR(200)        /* drink description; eneter short txt*/
    );
    
    CREATE SEQUENCE drinks_seq2
      start 1
      increment 1;
    
    
    INSERT INTO drinks(name, ID, category, ingredients, description)
    VALUES('Cosmopolitan', nextval('drinks_seq2'), 'vodka', ARRAY ['cointreau','cranberry juice','lime'], 'nice drink'),
    ('Vodka Martini', nextval('drinks_seq2'), 'vodka', ARRAY ['dry vermouth'], 'nice drink'),
    ('Bloody Mary', nextval('drinks_seq2'), 'vodka', ARRAY ['Lemon', 'tomato juice', 'tabasco sauce', 'horseradish', 'Worcestershire sauce', 'celery', 'pepper'], 'nice drink'),
    ('Vodka Tonic', nextval('drinks_seq2'), 'vodka', ARRAY ['tonic water','lemon'], 'nice drink'),
    ('Screwdriver', nextval('drinks_seq2'), 'vodka', ARRAY ['orange juice'], 'nice drink'),
    ('Black Russian', nextval('drinks_seq2'), 'vodka', ARRAY ['Kahlua'], 'nice drink'),
    ('Sex on the beach', nextval('drinks_seq2'), 'vodka', ARRAY ['peach schnapps', 'orange juice', 'cranberry juice'], 'nice drink'),
    ('21st Century', nextval('drinks_seq2'), 'tequila', ARRAY ['agave','lemon juice', 'Brizard White Creme de Cacao'], 'nice drink'),
    ('Manhattan Goes Hollywood', nextval('drinks_seq2'), 'tequila', ARRAY ['maple syrup','Orange Bitters'], 'nice drink'),
    ('El Gavilan', nextval('drinks_seq2'), 'tequila', ARRAY ['grapefruit juice','lime juice','syrup','cactus puree'], 'nice drink'),
    ('Magui Cactus', nextval('drinks_seq2'), 'tequila', ARRAY ['mint leaves','lime juice','syrup','cactus puree', 'angostura Bitters'], 'nice drink'),
    ('Mystic Marvel', nextval('drinks_seq2'), 'tequila', ARRAY ['prickly pear puree','agave','lime juice'], 'nice drink')
    ('Bishop Cocktail', nextval('drinks_seq2'), 'wine', ARRAY ['red wine', 'rum', 'simple syrup', 'lime juice'], 'rum not necessary nice mix')
    ('Kir', nextval('drinks_seq2'), 'wine', ARRAY ['white wine', 'creme de cassis'], 'Sweet liqueur with flavor of black currants. Nice mix with white wine')
    ('White Wine Spritzer', nextval('drinks_seq2'), 'wine', ARRAY ['white wine', 'sparkling water'], 'Simple to make, nice mix of texture and taste.')
    ('UK Sour', nextval('drinks_seq2'), 'wine', ARRAY ['red wine', 'Scotch whiskey', 'apricot liqueur', 'lemon juice', 'cinnamon syrup'], 'An INCREDIBLE mixture that brings the touch of sour, to your sweet wine collections')
    ('Rose Berry Bliss', nextval('drinks_seq2'), 'wine', ARRAY ['rose wine', 'blueberries', 'pink lemonade', 'lemon-lime soda'], 'Generally made by the pitcher. Easy to mix. Brings the exotic to your exquisite collection')
    ;

