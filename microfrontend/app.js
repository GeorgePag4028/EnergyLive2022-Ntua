const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')

const passport = require('passport')
const session = require('express-session')


const app = express();

//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', '.hbs');


//Set static folder
app.use(express.static(path.join(__dirname,'public')));


// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Parser
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',require('./routes/index'))
//app.use('/auth',require('./routes/auth'))
app.use('/communication',require('./routes/comm'))


app.use('/renew',require('./routes/renew'));

app.use('/about',(req,res)=> res.render('about'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));



