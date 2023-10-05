const express = require('express');
const app = express()

// app.get('/jokes',(req,res) => (
//     res.send("Server Started")
// ))

app.use(express.static('dist'));

app.get('/api/jokes',(req,res) => {
    const jokes = [
        {
            id:1,
            title:'A joke',
            content:'This is a joke'
        },
        {
            id:2,
            title:'Another joke',
            content:'This is a joke'
        },
        {
            id:3,
            title:'A third joke',
            content:'This is a joke'
        },
        {
            id:4,
            title:'A forth joke',
            content:'This is a joke'
        },
        {
            id:5,
            title:'A fifth joke',
            content:'This is a joke'
        },
    ];
    res.send(jokes);
})

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Server started at ${port}`)
});