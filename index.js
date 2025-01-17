const express = require('express');
const Pool = require("pg").Pool;
const app = express();
const port = 8080;
const router = require('./routes/routes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456789',
    port: 5432,
});    

app.use((req , res , next) => {
    req.pool = pool;
    next();
}) 
app.use('/', router);



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});