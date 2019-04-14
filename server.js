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
	database: 'drinksta',
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

app.get('/register', function(req, res) {
	res.render('register', {
		message: ''
	});
});

app.get('/home', function(req, res){
	res.render('example_home');
});

app.get('/drinks', function(req, res){
	res.render('example_drinkpage');
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

app.get('/search', function(req, res) {
	var drink_search = 'select * from football_games;';

  db.task('get-everything', task => {
        return task.batch([
            task.any(drink_search)
        ]);
    })
    .then(data => {
    	res.render('pages/team_stats',{
				my_title: "Football Games",
				games: data[0],
				total_losses: data[1][0].count,
				total_wins: data[2][0].count
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('pages/team_stats', {
                title: 'Footbal Games',
                data: '',
                total_wins: 'Error',
                total_losses: 'Error'
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

//app.listen(3000);
//console.log('3000 is the magic port');
app.listen(process.env.PORT);