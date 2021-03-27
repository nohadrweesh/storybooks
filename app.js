const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const exphbs  = require('express-handlebars');
const passport  = require('passport');
const mongoose  = require('mongoose');
const session  = require('express-session');
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const methodOverride = require('method-override')

dotenv.config({ path : './config/config.env'})

//passport config
require('./config/passport')(passport)
connectDB()
const app =express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

//logging
if(process.env.NODE_ENV=== "development"){
    app.use(morgan('dev'))
}
//helpers
const{formatDate,truncate,stripTags,editIcon,select}=require('./helpers/hbs')
//template
app.engine('.hbs', 
    exphbs(
        {
            helpers:{formatDate,truncate,stripTags,editIcon,select},
            defaulrLayout:'main',
            extname: '.hbs'
        }
        )
    );
app.set('view engine', '.hbs');

//static
app.use(express.static(path.join(__dirname,'public')))

//session
app.use(session({
    secret:'keyboar cat',
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create(
        { mongoUrl: process.env.MONGO_URI }
      )
      
}))
//passport
app.use(passport.initialize())
app.use(passport.session()) //need express sessions

//Global variables
app.use(function(req,res,next){
    res.locals.user=req.user ||null
    next()
})

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))


const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))