const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const exphbs  = require('express-handlebars');

const connectDB = require('./config/db.js')

dotenv.config({ path : './config/config.env'})

connectDB()
const app =express()

//template
app.engine('.hbs', exphbs({defaulrLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//static
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/',require('./routes/index'))

//logging
if(process.env.NODE_ENV=== "development"){
    app.use(morgan('dev'))
}
const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))