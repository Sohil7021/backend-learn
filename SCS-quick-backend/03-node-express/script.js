const express = require('express');
const app = express();

app.set("view engine", "ejs");

// middleware
app.use('/',(req,res,next) => {
    // res.send("wow")
    next();
});

// template engine

app.get('/',(req,res) => {
    res.render("index", {age:12});
})

// dynamic routing



app.get('/profile/:username',(req,res) => {
    res.send(`Hello from ${req.params.username}`);
})





app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })

app.listen(3000)