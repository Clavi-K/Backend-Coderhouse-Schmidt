const express = require("express");
const path = require("path");
const { Router } = express;
const router = Router();
const prods = require("../prods");

router.get("/", (req, res) => {

    res.send(JSON.stringify(prods, null, 2));

});

router.get("/:id", (req, res) => {

    const { id } = req.params;
    const prod = prods.find(p => p.id == id);

    if (!prod) {

        const error = { Error: "Product not found" };
        res.status(404).send(JSON.stringify(error, null, 2));

        return;

    }

    res.send(JSON.stringify(prod, null, 2));

});

router.post("/create", (req, res) => {

    const { name, price } = req.body;

    if (!name || !price) {

        const error = { Error: "Please complete the form" };
        res.status(400).send(JSON.stringify(error, null, 2));

        return;

    }

    const prod = { name, price, thumbnail: "-" }
    prods.push(prod);

    res.send(JSON.stringify(prod, null, 2));

});

router.put("/edit/:id", (req, res) => {

    const { id } = req.params;
    const { name, price } = req.body;
    const prod = prods.find(p => p.id == id);

    if (!prod) {

        const error = { Error: "Product not found" };
        res.status(404).send(JSON.stringify(error, null, 2));

        return;

    }

    if (name && price) {

        prod.name = name;
        prod.price = price;

    }

    res.sendStatus(200);

});

router.delete("/delete/:id", (req, res) => {

    const {id} = req.params;
    const prod = prods.find(p => p.id == id);

    if (!prod) {

        const error = {Error: "Product not found"};
        res.status(404).send(JSON.stringify(error, null, 2));

        return;

    }

    const index = prods.indexOf(prod);
    prods.splice(index, 1);

    res.sendStatus(200);

});

module.exports = router;
