CREATE TABLE IF NOT EXISTS drinks (
  name VARCHAR(255),               /* Name of the drink*/
  ID SERIAL PRIMARY KEY,      /* Drink ID*/
  category VARCHAR(255),           /* Final score of the game for the visiting team */
  ingredients  TEXT[],            /* list of ingredients; strings stored in an array*/
  description VARCHAR(255),        /* drink description; eneter short txt*/
  img_src VARCHAR(255)
);

CREATE SEQUENCE drinks_seq2
  start 1
  increment 1;


INSERT INTO drinks(name, ID, category, ingredients, description, img_src)
VALUES('Cosmopolitan', nextval('drinks_seq2'), 'vodka', ARRAY ['cointreau','cranberry juice','lime'], 'nice drink', 'https://i.imgur.com/D7AwZG2.jpg'),
('Vodka Martini', nextval('drinks_seq2'), 'vodka', ARRAY ['dry vermouth'], 'nice drink','https://i.imgur.com/X13JeB3.jpg'),
('Bloody Mary', nextval('drinks_seq2'), 'vodka', ARRAY ['Lemon', 'tomato juice', 'tabasco sauce', 'horseradish', 'Worcestershire sauce', 'celery', 'pepper'], 'nice drink', 'https://i.imgur.com/nyTZveX.jpg'),
('Vodka Tonic', nextval('drinks_seq2'), 'vodka', ARRAY ['tonic water','lemon'], 'nice drink', 'https://i.imgur.com/WyasxFe.jpg'),
('Screwdriver', nextval('drinks_seq2'), 'vodka', ARRAY ['orange juice'], 'nice drink', 'https://i.imgur.com/Q11VOS0.jpg'),
('Black Russian', nextval('drinks_seq2'), 'vodka', ARRAY ['Kahlua'], 'nice drink', 'https://i.imgur.com/UMN2tNk.jpg'),
('Sex on the beach', nextval('drinks_seq2'), 'vodka', ARRAY ['peach schnapps', 'orange juice', 'cranberry juice'], 'nice drink', 'https://i.imgur.com/BBAVLC1.jpg'),
('21st Century', nextval('drinks_seq2'), 'tequila', ARRAY ['agave','lemon juice', 'Brizard White Creme de Cacao'], 'nice drink', 'https://i.imgur.com/xkj42Ym.jpg'),
('Manhattan Goes Hollywood', nextval('drinks_seq2'), 'tequila', ARRAY ['maple syrup','Orange Bitters'], 'nice drink', 'https://i.imgur.com/mFfcXQa.jpg'),
('El Gavilan', nextval('drinks_seq2'), 'tequila', ARRAY ['grapefruit juice','lime juice','syrup','cactus puree'], 'nice drink', 'https://i.imgur.com/huZCRke.jpg'),
('Magui Cactus', nextval('drinks_seq2'), 'tequila', ARRAY ['mint leaves','lime juice','syrup','cactus puree', 'angostura Bitters'], 'nice drink', 'https://i.imgur.com/I1Zl7dF.jpg'),
('Mystic Marvel', nextval('drinks_seq2'), 'tequila', ARRAY ['prickly pear puree','agave','lime juice'], 'nice drink', 'https://i.imgur.com/I5StpPZ.jpg'),
('Bishop Cocktail', nextval('drinks_seq2'), 'wine', ARRAY ['red wine', 'rum', 'simple syrup', 'lime juice'], 'rum not necessary nice mix', 'https://i.imgur.com/OYPrkRC.jpg'),
('Kir', nextval('drinks_seq2'), 'wine', ARRAY ['white wine', 'creme de cassis'], 'Sweet liqueur with flavor of black currants. Nice mix with white wine', 'https://i.imgur.com/WKrN3mJ.jpg'),
('White Wine Spritzer', nextval('drinks_seq2'), 'wine', ARRAY ['white wine', 'sparkling water'], 'Simple to make, nice mix of texture and taste.', 'https://i.imgur.com/Y3zr3hw.jpg'),
('UK Sour', nextval('drinks_seq2'), 'wine', ARRAY ['red wine', 'Scotch whiskey', 'apricot liqueur', 'lemon juice', 'cinnamon syrup'], 'An INCREDIBLE mixture that brings the touch of sour, to your sweet wine collections','https://i.imgur.com/OxOMTP7.jpg'),
('Rose Berry Bliss', nextval('drinks_seq2'), 'wine', ARRAY ['rose wine', 'blueberries', 'pink lemonade', 'lemon-lime soda'], 'Generally made by the pitcher. Easy to mix. Brings the exotic to your exquisite collection', 'https://i.imgur.com/CdYYcmb.jpg'),
('Irish Mule', nextval('drinks_seq2'), 'whiskey', ARRAY ['irish whiskey','ginger beer','lime juice','lime'], 'nice drink', 'https://i.imgur.com/sKCw3ey.jpg'),
('whiskey sour', nextval('drinks_seq2'), 'whiskey', ARRAY ['whiskey', 'lemon juice', 'simple syrup'], 'nice drink', 'https://i.imgur.com/uyrunTV.jpg'),
('John Collins', nextval('drinks_seq2'), 'whiskey', ARRAY ['lemon juice', 'simple syrup','club soda'], 'nice drink', 'https://i.imgur.com/Ok6Oy8w.jpg'),
('Jack and Coke', nextval('drinks_seq2'), 'whiskey', ARRAY ['Jack Daniels','coke'], 'nice drink', 'https://i.imgur.com/p6rOVGF.jpg'),
('Old Fashioned', nextval('drinks_seq2'), 'whiskey', ARRAY ['sugar cube', 'bitters','orange peel', 'nice drink'], 'nice drink', 'https://i.imgur.com/aijMiFA.jpg'),
('pina colada', nextval('drinks_seq2'), 'rum', ARRAY ['pineapple', 'pineapple juice', 'coconut cream', 'white rum'],'nice drink','https://i.imgur.com/Q6vkZ6F.jpg'), 
('strawberry daiquiri', nextval('drinks_seq2'), 'rum', ARRAY ['lime juice', 'strawberries','simple syrup'],'nice drink','https://i.imgur.com/ZpRTunv.jpg')                                                            
;
