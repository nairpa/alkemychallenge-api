const express = require('express');
const cors = require('cors');
const db = require ('./app/models');

db.sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/api/posts', require('./app/routes/postRoutes'));

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en port ${PORT}.`);
    });
}).catch(err => console.log("Erros: " + err))


