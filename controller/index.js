
let getuser = async (req, res) => {
    try {
        const results = await req.pool.query("SELECT * FROM cars");
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error); // Log the detailed error
        res.status(500).send("An error occurred while fetching data.");
    }
}

let createuser = async (req, res) => {
    let { brand, model, year } = req.body;
    try {
        const results = await req.pool.query(
            "INSERT INTO cars (brand, model, year) VALUES ($1, $2, $3) RETURNING brand",
            [brand, model, year]
        );
        res.status(201).send(`User added with ID: ${results.rows[0].brand}`);
    } catch (error) {
        console.error(error); // Log the detailed error
        res.status(500).send("An error occurred while creating the user."); // Generic error message
    }
}

let updateuser = async (req, res) => {
    let id = req.params.id;
    let { brand, model, year } = req.body;
    try{
        let result = await req.pool.query(
            "UPDATE cars SET brand = $1, model = $2, year = $3 WHERE id = $4 RETURNING *",
            [brand, model, year, id],);
            res.status(200).json(result.rows[0]);
        } 
    catch (error) { 
        console.error(error); // Log the detailed error
        res.status(500).send("An error occurred while updating the user."); // Generic error message
    }
}
let deleteuser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await req.pool.query("DELETE FROM cars WHERE id = $1", [id]);
        res.status(200).send(`User deleted with ID: ${id}`);
    } catch (error) {
        console.error(error); // Log the detailed error
        res.status(500).send("An error occurred while deleting the user."); // Generic error message
    }
}
let getuserbyid = async (req , res) =>
    {
        const id = parseInt(req.params.id);
        try {
            const results = await req.pool.query("SELECT * FROM cars WHERE id = $1", [id]);
            res.status(200).json(results.rows);
        } catch (error) {
            console.error(error); // Log the detailed error
            res.status(500).send("An error occurred while fetching data.");
        }
    }

module.exports = {
    getuser,
    createuser,
    updateuser,
    getuserbyid,
    deleteuser
}