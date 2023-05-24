const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const registerRouter = require('./router/registerRoute');
const loginRouter = require('./router/loginRoute');
const employeeRouter = require('./router/employeeRoute');
const adminRouter = require('./router/adminRoute');
const reviewRouter = require('./router/reviewRoute');
const passport = require('passport');
const expressSession = require('express-session');
const { initializingPassport } = require('./passportConfig');

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();


//mongoose connection
mongoose.connect(process.env.DB, () => {
    console.log('mongoose sucessfully connected');
})

initializingPassport(passport);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: "secret", resave: false, saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", 'ejs');
app.use(expressLayouts);
app.use(registerRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);
app.use('/review', reviewRouter);

//server listening
app.listen(process.env.port, () => {
    console.log(`server is listening at ${port}`);
})