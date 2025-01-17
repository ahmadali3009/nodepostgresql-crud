let router = require("express").Router();

let {getuser , createuser , updateuser , deleteuser , getuserbyid} = require("../controller/index.js");


router.get("/users", getuser);

router.post("/users", createuser);

router.get("/users/:id", getuserbyid);

router.put("/users/:id", updateuser);

router.delete("/users/:id", deleteuser);

module.exports = router;
