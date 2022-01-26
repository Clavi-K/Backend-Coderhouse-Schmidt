const express = require('express');
const app = express();
const PORT = process.env.PORT || 8082;
const Container = require('./container');

const cont = new Container("./file.json");

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => {
    console.log(`Ocurrio un error. ${err}`);
});

app.get("/", (req, res) => {

    res.send(`<h1>Entregable Clase 6</h1>
              <a href="/prods"> Todos los productos </a>
              <br>
              <br>
              <a href="/random"> Producto aleatorio</a>`)

});

app.get("/prods", (req, res) => {

    let string = "";

    cont.getAll()
        .then((response) => {

            for (const item of response) {

                string += ` Title: ${item.title} Price: ${item.price} |`

            }

            res.send(string);
        });

});

app.get("/random", (req, res) => {

    let string = "";

    cont.getAll()
        .then((response) => {

            let rand = Math.floor(Math.random() * (response.length) + 1);

            for(const item of response) {

                if (item.id === rand) {

                    string = `Name: ${item.title} | Price: ${item.price}`;

                }

            }

            res.send(string);

        });

});

