var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

//Create Database Connection

var pgp = require('pg-promise')();
const dbConfig = process.env.DATABASE_URL;

// const dbConfig = {
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'drinks_db',
// 	user: 'postgres',
// 	password: 'pwd'
// };

var db = pgp(dbConfig);

GLOBAL_SEARCH_u_name = '';
GLOBAL_SEARCH_drink = '';
GLOBAL_SEARCH_title = "";

GLOBAL_SIGNIN_STATUS = false;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
		res.render('example_home', {username : u_name, drink: '', check: ''});
	}
	else{
		res.render('login', {message: '', username: ''});
	}
});

app.get('/login', function(req, res) {
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	res.render('login', {
		message: '',
		username: u_name
	});
});

app.get('/register', function(req, res) {
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	res.render('register', {
		message: '',
		username: u_name
	});
});

app.get('/home', function(req, res){
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	res.render('example_home', {username : u_name, drink: '', check: ''});
});

app.get('/logout', function(req, res){
	GLOBAL_SIGNIN_STATUS = false;
	res.clearCookie("userID");
	res.clearCookie("username");
	res.clearCookie("name");
	res.render('login', {message: '', username: ''})
});

app.get('/search', function(req, res){
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	res.render('search', {drink: '', username: u_name, login: GLOBAL_SIGNIN_STATUS, drink_found: true});
});

app.get('/add-drink', function(req, res){
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	res.render('add-drink', {username: u_name, message: ''});
});
app.get('/User', function(req, res){
	res.render('User');
});
//submit ffunction, was used to grap the information someone needed to login successfully.
app.get('/submit', function(req,res){
	var name = req.query.name;
	var pwd = req.query.pwd;
	//console.log(name, pwd);
	var get_pwd = "select * from users where username = '" + name +"';";
	db.query(get_pwd)
		.then(function(data){
			var real_pwd = data[0].password;
			if(real_pwd == pwd){
				GLOBAL_SIGNIN_STATUS = true;
				res.cookie("userID", data[0].user_id);
				res.cookie("username", data[0].username);
				res.cookie("name", data[0].name);
				res.render('login', {
					message: 'success',
					username: data[0].username
				})
			}
			else{
				GLOBAL_SIGNIN_STATUS = false;
				res.render('login', {
					message: 'warning',
					username: ''
				})
			}
		})
		.catch(error => {
			GLOBAL_SIGNIN_STATUS = false;
			res.render('login', {
				message: 'error',
				username: ''
			});
		})
});
//used to search for the drink that the user inputted, push back info to fill out user drink card.
app.get('/search/get_drink', function(req, res)
{
	var drink_name = req.query.drinkname;
	var drink_search = "select * from drinks where name ILIKE '"+ drink_name + "';";
	console.log(drink_search);

  db.any(drink_search)
    .then(data => {
			GLOBAL_SEARCH_u_name = '';
			GLOBAL_SEARCH_drink = data[0];
			GLOBAL_SEARCH_title = "Drink Search";

			if(req.cookies.username){
				GLOBAL_SEARCH_u_name = req.cookies.username;
			}

			if(data[0])
			{
				res.render('search', {
					my_title: GLOBAL_SEARCH_title,
					drink: GLOBAL_SEARCH_drink,
					username: GLOBAL_SEARCH_u_name,
					login: GLOBAL_SIGNIN_STATUS,
					drink_found: true
				})
			}
			else
			{
				res.render('search', {
					my_title: GLOBAL_SEARCH_title,
					drink: GLOBAL_SEARCH_drink,
					username: GLOBAL_SEARCH_u_name,
					login: GLOBAL_SIGNIN_STATUS,
					drink_found: false
				})
			}
    	
    })
    .catch(error => {
		// display error message in case an error
		console.log(error);
            request.flash('error', err);
            response.render('search', {
								my_title: 'Drink Search',
                drink: '',
								username: '',
								login: GLOBAL_SIGNIN_STATUS,
								drink_found: false
            })
    });

});
// Function used to find favorited drinks when you open your account
app.post('/search/favorite', function(req, res)
{
	var user_id = '';
	var drink_id = req.body.favname;

	console.log(drink_id)

	if(req.cookies.userID){
		user_id = req.cookies.userID;
		console.log(user_id)
	}

	var favorite_insert = "insert into fav_drinks values (" + user_id + "," + drink_id + ");";

	console.log(favorite_insert)

  db.query(favorite_insert)
    .then(data => {
			res.render('search', {
				my_title: GLOBAL_SEARCH_title,
				drink: GLOBAL_SEARCH_drink,
				username: GLOBAL_SEARCH_u_name,
				login: GLOBAL_SIGNIN_STATUS,
				drink_found: true
			})
    })
    .catch(error => {
		// display error message in case an error
			console.log(error);
			request.flash('error', err);
			res.render('search', {
				my_title: GLOBAL_SEARCH_title,
				drink: GLOBAL_SEARCH_drink,
				username: GLOBAL_SEARCH_u_name,
				login: GLOBAL_SIGNIN_STATUS,
				drink_found: true
			})
    });
});
//for when you were registering a new account, grabs info and puts it into the database
app.post('/register', function(req,res){
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	var name = req.body.name;
	var username = req.body.username;
	var emailAddress = req.body.emailAddress;
	var password = req.body.passwordFirst;
	var cpassword = req.body.passwordConfirm;
	var age = req.body.age;
	var good_length = (password.length < 255 && name.length < 255 && username.length < 255 && emailAddress.length < 255);
	//console.log(name, username, emailAddress, password, cpassword, age);
	var find_id = "select max(user_id) from users;";
	var check_user = "select * from users where username = '" + username +"';";
	if(age == 'Yes' && password == cpassword && good_length){
		/*db.query(find_id)
			.then(function(max){
				var id = max[0].max + 1;
				var insert = "INSERT INTO users VALUES(" + id + ",'" + name + "','" + username +"','" 
							+ password+ "','"+ emailAddress+"');";
				db.query(insert)
					.then(function(result){
						console.log("success");
					})
			})*/
		db.task('get-everything', task =>{
			return task.batch([
				task.any(find_id),
				task.any(check_user)
			])
		})
		.then(info =>{
			var id = info[0][0].max +1;
			//console.log(info[1].length);
			if(info[1].length>0){
				res.render('register',{
					message: 'warning',
					username: u_name
				})
			}
			else{
				var insert = "INSERT INTO users VALUES(" + id + ",'" + name + "','" + username +"','" 
							+ password+ "','"+ emailAddress+"');";
				db.query(insert)
					.then(function(result){
						//console.log("success");
					})
				GLOBAL_SIGNIN_STATUS = true;
				res.cookie("userID", id);
				res.cookie("username", username);
				res.cookie("name", name);
				res.render('login',{
					message: 'success2',
					username: username
				});
			}
		})
	}
	else{
		res.render('register',{
			message: 'error',
			username: u_name
		});
	}
});

app.post('/add-drink', function(req,res){
	var name = req.body.name;
	var category = req.body.category;
	var ing_list = req.body.ingredients;
	var description = req.body.description;
	var image_link = req.body.imglink;
	var ingredients = ing_list.split(",").map(function(item){
		return item.trim();
	});
	var array_txt = "ARRAY [";
	if(ingredients.length >0){
		array_txt += "'"+ingredients[0]+"'";
		if (ingredients.length >1){
			for (i = 1; i < ingredients.length; i++){
				array_txt += ",'"+ingredients[i]+"'";
			}
		}
	}
	array_txt += "]";
	var query =  "INSERT INTO drinks VALUES('" + name + "', nextval('drinks_seq2'),'" + category +"'," 
						+ array_txt +",'"+description+"','"+image_link+"');";
	//console.log(query);
	var length_good = (name.length < 255 && image_link.length < 255 && description.length < 255);
	if (length_good){
		db.query(query)
			.then(function(result){
				var u_name = '';
				if(req.cookies.username){
					u_name = req.cookies.username;
				}
				res.render('example_home', {username: u_name, drink: '', check: ''});
			});
	}
	else{
		if(req.cookies.username){
				u_name = req.cookies.username;
			}
			res.render('add-drink', {username: u_name, message: 'error'});
	}
});
/*
Function: Add a favorite drink to your account, When you press add favorite on a drinks card, it will add the drink to the persons account page.
*/
app.get('/account', function(req,res){
	if(req.cookies.userID){
		var id = req.cookies.userID;
		var username = req.cookies.username;
		var name = req.cookies.name;
		var query = "select distinct * from drinks inner join fav_drinks on fav_drinks.drink_id = drinks.id where fav_drinks.user_id = '"+id+"';";
		db.query(query)
			.then(function(data){
				// console.log(data);
				res.render('user',{user: name, username: username, drinks: data});
			});
	}
	else{
		res.render('example_home', {username : '', drink: '', check:''})
	}
});
/*
Function, delete an added favorite drink when the button is clicked on someones account
*/
app.post('/account/remove', function(req,res){
	if(req.cookies.userID){
		var id = req.cookies.userID;
		var username = req.cookies.username;
		var name = req.cookies.name;
		var drink_id = req.body.delname;

		var query = "select distinct * from drinks inner join fav_drinks on fav_drinks.drink_id = drinks.id where fav_drinks.user_id = '"+id+"';";
		var removal = "delete from fav_drinks where user_id = "+ id +" and drink_id = "+ drink_id+";"

		db.task('get-everything', task => {
			return task.batch([
					task.any(removal),
					task.any(query)
			]);
		})
		.then(function(data){
			// console.log(data);
			res.render('user',{user: name, username: username, drinks: data[1]});
		});
	}
	else{
		res.render('example_home', {username : '', drink: '', check: ''})
	}
});
/*
Function below, used to grab the drinks which have the selected ingredient from an input.
used on the example_home.html webpage
*/
app.get('/home/get_ingredient', function(req, res)
{
	var ingredient_name = req.query.ingredientname;
	var ingredient_search = "select name, img_src from drinks where '"+ ingredient_name+"' ILIKE ANY(ingredients) ORDER BY name ASC;";
	console.log(ingredient_name);

  db.any(ingredient_search)
    .then(data => {
    	if(data[0])
			{
    	res.render('example_home', {

				my_title: "Ingredient Search",
				drink: data,
				username: '',
				check: 'success'
			

			})
    }
    else{
    	res.render('example_home', {

				my_title: "Ingredient Search",
				drink: data,
				username: '',
				check: 'fail'

			})
    }
    })
    .catch(error => {
		// display error message in case an error
		console.log(error);
            request.flash('error', err);
            response.render('example_home', {
								my_title: 'Drink Search',
                drink: '',
                username: '',
                check: ''
            })
    });

});


//app.listen(3000);
//console.log('3000 is the magic port');
app.listen(process.env.PORT);