const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const Users = require('./models/users');

const SESSIONS = {};

app.listen(8000);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) =>{
   if(req.cookies.sessionId &&  SESSIONS[req.cookies.sessionId]) {
      req.session = SESSIONS[req.cookies.sessionId];
   }
   else{
      const sessionId = Date.now().toString(16);
      const session = {id:sessionId,role:'guest',basket:[]};
      SESSIONS[sessionId] = session;
      res.cookie('sessionId',sessionId);
      req.session = session;
   }
   next();
})

app.use('/login', (req,res,next) => {

   if(req.session.role != 'guest')
   {
      res.redirect('/')
   }
   next();
});
app.use('/admin', (req,res,next) => {
   if(req.session.role != 'admin') {
      res.redirect('/');
   }
   next();
});
app.get('/', (req,res) => {
   res.redirect('/catalog/1');
});
app.use('/profile', (req,res,next)=>{
   if(req.session.role == 'guest' || req.session.role == undefined)
   {
      res.redirect('/');
   }
   next();
});

app.use('/basket', require('./routes/basket'));
app.use('/search', require('./routes/search'));
app.use('/catalog', require('./routes/catalog'));
app.use('/login', require('./routes/login'));
app.use('/registration', require('./routes/registration'));
app.use('/logout',require('./routes/logout'));
app.use('/admin',require('./routes/admin'));
app.use('/profile',require('./routes/profile'));

