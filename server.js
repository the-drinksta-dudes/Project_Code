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

/*const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'drinksta',
	user: 'postgres',
	password: 'pwd'
};*/

var db = pgp(dbConfig);


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
		res.render('example_home', {username : u_name});
	}
	else{
		res.render('login', {username: ''});
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
	res.render('example_home', {username : u_name});
});

app.get('/logout', function(req, res){
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
	res.render('search', {drink: '', username: u_name});
});

app.get('/add-drink', function(req, res){
	var u_name = '';
	if(req.cookies.username){
		u_name = req.cookies.username;
	}
	res.render('add-drink', {username: u_name});
});
app.get('/User', function(req, res){
	res.render('User');
});

app.get('/submit', function(req,res){
	var name = req.query.name;
	var pwd = req.query.pwd;
	//console.log(name, pwd);
	var get_pwd = "select * from users where username = '" + name +"';";
	db.query(get_pwd)
		.then(function(data){
			var real_pwd = data[0].password;
			if(real_pwd == pwd){
				res.cookie("userID", data[0].user_id);
				res.cookie("username", data[0].username);
				res.cookie("name", data[0].name);
				res.render('login', {
					message: 'success',
					username: data[0].username
				})
			}
			else{
				res.render('login', {
					message: 'warning',
					username: ''
				})
			}
		})
		.catch(error => {
			res.render('login', {
				message: 'error',
				username: ''
			});
		})
});

app.get('/search/get_drink', function(req, res) {
	var drink_name = req.query.drinkname;
	var drink_search = 'select * from drinks where name = "'+ drink_name +'";';

  db.task('get-everything', task => {
        return task.batch([
            task.any(drink_search)
        ]);
    })
    .then(data => {
    	res.render('search',{
				my_title: "Drink Search",
				drink: data[0],
				username: ''
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('search', {
                my_title: 'Drink Search',
                drink: '',
                username: ''
            })
    });

});

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
	//console.log(name, username, emailAddress, password, cpassword, age);
	var find_id = "select max(user_id) from users;";
	var check_user = "select * from users where username = '" + username +"';";
	if(age == 'Yes' && password == cpassword){
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
				res.render('register',{
					message: 'success',
					username: u_name
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
	db.query(query)
		.then(function(result){
			var u_name = '';
			if(req.cookies.username){
				u_name = req.cookies.username;
			}
			res.render('example_home', {username: u_name});
		})
});

//app.listen(3000);
//console.log('3000 is the magic port');
app.listen(process.env.PORT);