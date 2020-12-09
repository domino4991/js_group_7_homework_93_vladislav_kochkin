const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const users = require('./routes/users');
const events = require('./routes/events');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
    await mongoose.connect(config.database, config.databaseOpt);
    console.log('Connected to MongoDB EventsDB');

    app.use('/users', users);
    app.use('/events', events);
    app.use((req, res) => {
        res.status(404).send({"error": "404 Not found"});
    });

    app.listen(PORT, () => {
       console.log(`Server started at http://localhost:${PORT}`);
    });
};

run().catch(console.log);