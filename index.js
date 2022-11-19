const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dealershipRouter = require("./routes/dealership");
app.use(dealershipRouter);

app.listen(PORT, () => {
    console.log(`Application running in http://localhost:${PORT}...`);
});
