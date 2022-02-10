const express = require("express");
const path = require("path");
const { Router } = express;
const router = Router();
const prods = require("../prods");

router.get("/", (req, res) => {

    res.render("prods", { prods });

});

router.post("/", (req, res) => {

    const prod = req.body;
    prod.id = prods.length;

    if (blankSpace(prod)) {

        prods.push(prod);
        res.redirect("/products");

    } else {

        res.render("main", {error: "El producto no cumple con los requisitos para su ingreso."});

    }

});

const blankSpace = (prod) => {

    if (!prod.name) {
        return false;
    } else if (prod.name.trim().length === 0) {
        return false;
    }

    if (!prod.price) {
        return false;
    } else if (prod.price < 0) {
        return false;
    }

    if (!prod.thumbnail) {
        return false;
    } else if (prod.thumbnail.trim().length === 0) {
        return false;
    }

    return true;

}

module.exports = router;