const fs = require('fs');
const ipath = "./file.json";

class Container {
    constructor(path) {

        this.path = path;

    }

    async saveFile(object) {

        if (object === undefined || !object) {

            throw new Error("El objeto no existe.");

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);
            let id = obj.prods.length + 1;

            object.id = id;

            obj.prods.push(object);

            let file = JSON.stringify(obj, null, 2);

            fs.promises.writeFile(this.path, file);

            return id;

        }
    }

    async getById(id) {

        if (id === undefined || !id) {

            throw new Error("No hay ID.")

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);

            let retItem = undefined;

            for (let item of obj.prods) {

                if (item.id === id) {

                    retItem = item;

                }

            }

            return retItem;

        }

    }

    async getAll() {

        let data = await fs.promises.readFile(this.path, "utf-8");
        let obj = JSON.parse(data);

        return obj.prods;

    }

    async deleteById(id) {

        if (id === undefined || !id) {

            throw new Error("No hay ID.");

        } else {

            let data = await fs.promises.readFile(this.path, "utf-8");
            let obj = JSON.parse(data);

            obj.prods = obj.prods.filter(item => {
                return item.id != id;
            });

            let file = JSON.stringify(obj, null, 2)
            fs.promises.writeFile(this.path, file);

        }

    }

    async deleteAll() {

        let data = await fs.promises.readFile(this.path, "utf-8");
        let obj = JSON.parse(data);

        obj.prods = [];

        let file = JSON.stringify(obj, null, 2);
        fs.promises.writeFile(this.path, file);

    }

}

module.exports = Container;

const obj = {
    title: "Buzo Cyberpunk Tokyo",
    price: 35,
    thumbnail: "img/items/hoodies/hoodies2.jpg"
}

// cont.saveFile(obj)
//     .then((response) => console.log(response))
//     .catch((e) => console.log(e));

// cont.getById(1)
//     .then((reponse) => console.log(reponse))
//     .catch((e) => console.log(e));

// cont.getAll()
//     .then((reponse) => console.log(reponse))
//     .catch((e) => console.log(e));

// cont.deleteById(1);

// cont.deleteAll();