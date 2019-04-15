var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection

var pgp = require('pg-promise')();
const dbConfig = process.env.DATABASE_URL;

/*const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'drinks_db',
	user: 'postgres',
	password: 'pwd'
};*/

var db = pgp(dbConfig);


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.render('login', {
		message: ''
	});
});

app.get('/login', function(req, res) {
	res.render('login', {
		message: ''
	});
});

app.get('/register', function(req, res) {
	res.render('register', {
		message: ''
	});
});

app.get('/home', function(req, res){
	res.render('example_home');
});

app.get('/search', function(req, res){
	res.render('search', {drink: ''});
});

app.get('/add-drink', function(req, res){
	res.render('add-drink');
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
			//console.log(real_pwd);
			if(real_pwd == pwd){
				res.render('login', {
					message: 'success'
				})
			}
			else{
				res.render('login', {
					message: 'warning'
				})
			}
		})
		.catch(error => {
			res.render('login', {
				message: 'error'
			});
		})
});

app.get('/search/get_drink', function(req, res)
{
	console.log("Here1");
	var drink_name = req.query.drinkname;
	var drink_search = 'select * from drinks where name = "'+ drink_name +'";';
	console.log(drink_search);

  db.task('get-everything', task => {
        return task.batch([
            task.any(drink_search)
        ]);
    })
    .then(data => {
		console.log("Here3");
    	res.render('search',{
				my_title: "Drink Search",
				drink: data[0]
			})
    })
    .catch(error => {
		// display error message in case an error
		console.log(error);
            request.flash('error', err);
            response.render('search', {
                my_title: 'Drink Search',
                drink: ''
            })
    });

});

app.post('/register', function(req,res){
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
					message: 'warning'
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
					message: 'success'
				});
			}
		})
	}
	else{
		res.render('register',{
			message: 'error'
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
	for (i = 0; i < ingredients.length; i++){
		array_txt += "'"+ingredients[i]"',";
	}
	array_txt += "]";
	var query =  "INSERT INTO users VALUES('" + name + "', nextval('drinks_seq2'),'" + category +"'," 
						+ array_txt + ",'"+image_link+"');";
	db.query(query)
		.then(function(result){
			res.render('home');
		})
});

//app.listen(3000);
//console.log('3000 is the magic port');
app.listen(process.env.PORT);