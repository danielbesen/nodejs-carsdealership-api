const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

var database = [
    {
        id: 0,
        name: "Civic",
        brand: "Honda",
        avaliable: true,
    },
    {
        id: 1,
        name: "Supra",
        brand: "Toyota",
        avaliable: false,
    },
];

app.get("/", (req, res) => {
    res.status(200).send({ message: "Daniels Dealership" });
});

app.get("/cars", (req, res) => {
    res.status(200).send(
        database.map((car, i) => {
            return car;
        })
    );
});

app.get("/cars/avaliable", (req, res) => {
    res.status(200).send(database.filter((car) => car.avaliable));
});

app.get("/cars/unavaliable", (req, res) => {
    res.status(200).send(database.filter((car) => !car.avaliable));
});

app.post("/cars", (req, res) => {
    let car = req.body;

    if (!car.name)
        res.status(400).send({
            message: "Name input required!",
        });
    else if (!car.brand)
        res.status(400).send({
            message: "Brand input required!",
        });
    else {
        car.avaliable = car.avaliable || true;
        car.id = database.length;
        database.push(car);
        res.status(201).send({ message: "New car added!" });
    }
});

app.put("/cars/:id", (req, res) => {
    const { id } = req.params;
    const reqcar = req.body;

    database
        .filter((car) => car.id == id)
        .forEach(
            (car) => (
                (car.avaliable = reqcar.avaliable),
                (car.name = reqcar.name),
                (car.brand = reqcar.brand)
            )
        );

    res.status(200).send({ message: "Car updated" });
});

app.delete("/cars/:id", (req, res) => {
    const { id } = req.params;
    const list = database.filter((car) => car.id == id);

    if (list.length > 0) {
        database = database.filter((car) => car.id != id);
        res.send(database);
    } else {
        res.status(404).send({ message: "Car not found!" });
    }
});

app.listen(PORT, () => {
    console.log(`Application running in htpp://localhost:${PORT}...`);
});
