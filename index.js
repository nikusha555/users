const express = require('express')
const app = express()
const port = 3000;
const connection = require('./db.js')
var bodyparser = require('body-parser')
var cors = require('cors')
const router = express.Router();
const mysql = require('mysql2/promise');






app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})







// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyparser.json())

app.post('/user/signup', (req, res) => {

    connection.query("INSERT INTO `users` (`f_name`, `l_name`, `email`, `phone_number`,`role`, `status`, `create_date`) " +
        "VALUES ('" + req.body.fname + "', '" + req.body.lname + "', '" + req.body.email + "', '" + req.body.phonenumber + "','" + req.body.role + "', 1, now())",
        (error) => {
            console.log(error)
        })
    res.json({
        status: true,
        message: 'რეგისტრაციამ წარმატებით ჩაიარა'
    })
})







app.get('/users', (req, res) => {
    //const connection = await pool.getConnection();
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            res.json(rows);
        }

    })
});

app.listen(port, () => {
    console.log('server is running on port ${port}');
});