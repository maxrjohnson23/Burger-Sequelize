const routes = require("express").Router();
const dbModels = require("../models");

routes.get("/", function (req, res) {
    dbModels.Burger.findAll({
        attributes: ['id', 'burger_name', 'devoured'],
        raw: true
    }).then(result => {
        // Populate results based on devoured status
        let devoured = result.filter(b => b.devoured === 1);
        let undevoured = result.filter(b => b.devoured === 0);
        res.render("index", {
            undevouredList: undevoured,
            devouredList: devoured
        });
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});

routes.get("/api/burger", (req, res) => {
    dbModels.Burger.findAll({
        attributes: ['id', 'burger_name', 'devoured'],
        raw: true
    }).then((err, result) => {
        res.json(result);
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});

routes.post("/api/burger", (req, res) => {
    if (!req.body.name) {
        res.status(500).send({error: "Burger name is required"});
    }
    dbModels.Burger.create({
        burger_name: req.body.name,
        devoured: req.body.devoured
    }).then(id => {
        res.json(id);
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});

routes.put("/api/burger/:id", (req, res) => {
    dbModels.Burger.update({
            devoured: req.body.devoured
        },
        {
            where: {id: req.params.id}
        }).then(result => {
        res.json(result);
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});


module.exports = routes;
