const express = require('express');
const app = express();
const port = 3000;
let goods = [
    {"id": 1, "name": "toster", "coast": 10000},
    {"id": 2, "name": "banana", "coast": 200},
    {"id": 3, "name": "TV", "coast": 12000},
]

app.use(express.json());

app.post('/goods'
    , (req, res) => {
        const { name, coast } = req.body;
        const newGood = {
            id: Date.now(),
            name,
            coast
        };
        goods.push(newGood);
        res.status(201).json(newGood);
    });
app.get('/goods'
    , (req, res) => {
        res.send(JSON.stringify(goods));
    });
app.get('/goods/:id'
    , (req, res) => {
        let good = goods.find(g => g.id == req.params.id);
        res.send(JSON.stringify(good));
    });
app.patch('/goods/:id'
    , (req, res) => {const good = goods.find(g => g.id == req.params.id);
        const { name, coast } = req.body;
        if (name !== undefined) good.name = name;
        if (coast !== undefined) good.coast = coast;
        res.json(good);
    });
app.delete('/goods/:id'
    , (req, res) => {
        goods = goods.filter(g => g.id != req.params.id);
        res.send('Ok');
    });


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});