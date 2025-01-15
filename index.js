const express = require('express');
const Pool = require("pg").Pool;
const app = express();
const port = 8080;

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

let getuser = (req , res)=>
    {
        pool.query("SELECT * FROM cars", (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    }

let createuser = (req , res) =>
    {
        let { brand, model, year } = req.body;
        pool.query("INSERT INTO cars (brand, model , year) VALUES ($1, $2, $3) RETURNING brand", 
            [brand,model,year], 
            (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`User added with ID: ${results.rows[0].brand}`);
        });
    }

app.get("/users", getuser);

app.post("/users", createuser);

app.put("/users/:id", (req, res) => {
    let id = req.params.id;
    let { brand, model, year } = req.body;
    pool.query(
        "UPDATE cars SET brand = $1, model = $2, year = $3 WHERE id = $4", 
        [brand, model, year , id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with ID: ${id}`);
        }
    );});

app.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    pool.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});