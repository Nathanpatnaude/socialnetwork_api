const router = require('express').Router();
const routes = require('./api');

router.use('./api', routes);
router.use((req, res) => res.send('Wrong route'));