const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const token = process.env.TOKEN;

// Home Route
app.get('/', async (req, res) => {
    const babies = 'https://api.hubapi.com/crm/v3/objects/babies?limit=10&properties=name&properties=description&properties=age';
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(babies, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'All These Babies | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});

// Form Route
app.get('/update-cobj/', async (req, res) => {

    try {
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'});
    
    } catch(err) {
        console.error(err);
    }
});

// Post Route
app.post('/update-cobj/', async (req, res) => {

    const postData = {
        properties: {
            "name": req.body.name,
            "description": req.body.desc,
            "age": req.body.age,
        }
    }

    //const newCobj = `https://api.hubapi.com/crm/v3/objects/babies/`;
    const newCobj = `https://api.hubapi.com/crm/v3/objects/2-28943440/`;
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    try { 
        console.log('1');
        await axios.post(newCobj, postData, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));