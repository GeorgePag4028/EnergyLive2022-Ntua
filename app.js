const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')

// Load config
dotenv.config({path : './config/config.env'})

//Passport config
require('./config/passport')(passport)

//database
const db = require('./config/database');

// Test Database

db.authenticate()
    .then(()=> console.log('Database connected ...'))
    .catch(err => console.log('Error: '+ err))

db.sync({force:true})
// db.sync()


const app = express();

//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Set static folder
app.use(express.static(path.join(__dirname,'public')));


//Routes
// app.get('/',(req, res) => res.send('INDEX'));

app.use('/',require('./authentication/routes/index'))
app.use('/auth',require('./authentication/routes/auth'))

app.use('/users',require('./authentication/routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));