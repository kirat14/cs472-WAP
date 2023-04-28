const path = require('path');
const cors = require('cors');
const express = require('express');

const User = require('./models/user');
const app = express();

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const shoppingCartRouter = require('./routes/shoppingCartRouter');

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public', 'assets', 'images')));

app.use('/users', userRouter);
app.use((req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).send('Not Authenticated');
    }

    const decoded = User.verify(accessToken);

    if (decoded) {
        req.user = decoded;
        return next();
    } else {
        return res.status(401).send("Invalid Token");
    }
});

app.use('/products', productRouter);
app.use('/shopping-carts', shoppingCartRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + " API not supported!" });
});

app.use((err, req, res, next) => {
    if (err.message === "NOT Found") {
        res.status(404).json({ error: err.message });
    } else if (err) {
        res.status(500).json({ error: "Something is wrong! Try later" });
    }
});

app.listen(3000, () => console.log(`Server is running on port 3000...`));
