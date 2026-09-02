const express = require('express');
const morgan = require('morgan');
const session=require('express-session');
const flash=require('connect-flash');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const MenuRoutes=require("./routes/menuRoutes.js");
const AuthRoutes=require("./routes/authRoutes.js");
const UserRoutes=require("./routes/userRoutes.js");
const config = require('./config.js');

// express app
const app = express();

const dbURI = config.dbURI;

mongoose.connect(dbURI)
.then(() => console.log("Connected to Database"))
.catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

//cookie store middleware
app.use(cookieParser());

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'nodejs',
  saveUninitialized:true,
  resave:true
}));
app.use(flash())

app.use((req,res,next)=>{
  res.locals.success= req.flash('success');
  res.locals.err= req.flash('err');
  next();
})

//Homepage
app.get('/', (req, res) => {
  res.render('HomePage', { title: 'Home'});
});

//SignUp/Login ROutes
app.use(AuthRoutes);

//Menu Routes
app.use('/Menu',MenuRoutes);

//User Routes
app.use('/User',UserRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

//Listen to requests
// Render (and most hosts) assign the port dynamically via process.env.PORT;
// falls back to 3000 for local development.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
