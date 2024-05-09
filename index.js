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

    const update = {
        properties: {
            "name": req.body.newVal,
            "description": req.body.newVal,
            "age": req.body.newVal,
        }
    }

    const email = req.query.email;
    const newCobj = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(newCobj, post, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));