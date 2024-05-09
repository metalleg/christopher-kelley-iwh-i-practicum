const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const token = process.env.TOKEN;

// TODO: ROUTE 1 
app.get('/', async (req, res) => {
    const cobj = 'https://api.hubspot.com/crm/v3/objects/2-28943440&properties=firstname&properties=lastname';
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(cobj, { headers });
        const data = resp.data.results;
        console.log(data);
        res.render('homepage', { title: 'All These Babies | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});
// TODO: ROUTE 2 
app.get('/update-cobj/', async (req, res) => {

    try {
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'});
    
    } catch(err) {
        console.error(err);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.
// * Code for Route 3 goes here
app.post('/update-cobj/', async (req, res) => {

    const postData = {
        properties: {
            "name": req.body.name,
            "description": req.body.desc,
            "age": req.body.age,
        }
    }

    const newCobj = `https://api.hubapi.com/crm/v3/objects/babies/`;
    //const newCobj = `https://api.hubapi.com/crm/v3/objects/2-28943440/`;
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