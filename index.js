const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

var database = [
    {
        name: "Civic",
        brand: "Honda",
        avaliable: true,
    },
    {
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

app.delete("/cars/:name", (req, res) => {
    const { name } = req.params;
    const list = database.filter(
        (car) => car.name.toLowerCase() == name.toLowerCase()
    );

    if (list.length > 0) {
        database = database.filter(
            (car) => car.name.toLowerCase() != name.toLowerCase()
        );
        res.send(database);
    } else {
        res.status(404).send({ message: "Car not found!" });
    }
});

app.post("/cars", (req, res) => {
    const car = req.body;

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
        database.push(car);
        res.status(201).send({ message: "New car added!" });
    }
});

app.listen(PORT, () => {
    console.log(`Application running in htpp://localhost:${PORT}...`);
});
