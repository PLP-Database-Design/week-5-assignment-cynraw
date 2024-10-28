const express = require('express')
const app = express()
const mysql = require('mysql2'); 
const dotenv = require('dotenv');

app.use(express.json());

dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,           
    user: process.env.DB_USER,           
    password: process.env.DB_PASSWORD,    
    database: 'hospital_db'              
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});


// Question 1 goes here
app.get('/api/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({ error: 'Error retrieving patients' });
        }
        res.json(results);
    });
});

// Question 2 goes here
app.get('/api/providers', (req, res) =>{
    const query = 'SELECT first_name,last_name,provider_speciality FROM providers';

    db.query(query, (err, results)=> {
        if (err) {
            console.error('Error retrieving providers:', err);
            return res.status(500).json({ error: 'Error retrieving providers' });
        }
        res.json(results);
    });
});

// Question 3 goes here
app.get('/api/patients_first_name', (req, res) => {
    const query = 'SELECT first_name FROM patients';

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error retrieving patients' first names:", err);  
            return res.status(500).json({ error: 'Error retrieving patients' });
        }
        res.json(results); 
    });
});


// Question 4 goes here
app.get('/api/providers_speciality', (req, res)=>{
    const query ='SELECT provider_speciality FROM providers';

    db.query(query, (err, results)=>{
        if(err){
            console.error("Error retrieving providers 'providers speciality:", err);
            return res.status(500).json({error: 'Error retrieving providers'});
        }
        res.json(results);
    });
});


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
});
