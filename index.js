const express = require("express");
const app = express();
const PORT = process.env.PORT || 8082;
const path = require("path");
const homeRouter = require("./routes/home");
//const hbsRouter = require("./routes/hbs");
//const pugRouter = require("./routes/pug");
const ejsRouter = require("./routes/ejs");



/* --- ENGINES --- */

/*
const hbsEngine = require("./engines/handlebars");
hbsEngine(app);

const pugEngine = require("./engines/pug");
pugEngine(app);

*/

const ejsEngine = require("./engines/ejs");
ejsEngine(app);

/* --- PORT --- */

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});

/* --- MIDDLEWARES --- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next, err) => {

    console.log("Error");
    const error = { Error: `Hubo un error ${err}` }

    res.status(500).send(JSON.stringify(error, null, 2));

});

/* --- ROUTES --- */

app.use("/", homeRouter);
// app.use("/hbs", hbsRouter);
// app.use("/pug", pugRouter);
app.use("/ejs", ejsRouter);
