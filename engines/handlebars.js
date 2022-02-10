const path = require("path");
const { engine } = require("express-handlebars");

module.exports = function (app) {

    app.set('views', './views/handlebars');
    app.set('view engine', 'handlebars');

    app.engine('handlebars', engine({

        layoutDir: path.join(__dirname, "views/layouts"),
        defaultLayout: "index"

    }));

}