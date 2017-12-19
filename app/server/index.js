const express = require('express');
const app = express();
const router = require(__base + 'app/server/router');

app.use(express.static(__base + 'public'));
app.use('/node_modules',  express.static(__base + 'node_modules'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({'extended': true}));

app.get('/ping', (req, res) => res.status(200).send('pong'));

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} - ${req.originalUrl}`);
    next();
});

app.use('/api', router);
app.listen(process.env.PORT, () => console.log(`listening at ${process.env.PORT}`));
