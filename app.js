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

dotenv.config({ path : './config/config.env'})

//passport config
require('./config/passport')(passport)
connectDB()
const app =express()

//logging
if(process.env.NODE_ENV=== "development"){
    app.use(morgan('dev'))
}
//template
app.engine('.hbs', exphbs({defaulrLayout:'main', extname: '.hbs'}));
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

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))


const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))