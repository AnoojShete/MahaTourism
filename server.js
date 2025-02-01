const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Amit@12345', // Replace with your MySQL password
    database: 'MahaTourism1', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the database.');
});

// API Endpoints

// 1. Fetch all tourist spots
app.get('/api/destinations', (req, res) => {
    const sql = 'SELECT * FROM destinations';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});


// 2. Fetch a specific tourist spot by ID
app.get('/api/destinations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM destinations WHERE destinations_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});


// 3. Add a new tourist spot
// app.post('/api/destinations', (req, res) => {
//     const { name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude } = req.body;
//     const sql = `
//         INSERT INTO destinations (name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     db.query(sql, [name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude], (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             res.json({ id: result.insertId, name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude });
//         }
//     });
// });

// Add a new tourist spot from Geoapify by ID
app.post('/api/destinations/geoapify', (req, res) => {
    const { placeId } = req.body; // Place ID should be sent in the request body
    const apiKey = 'a773383543d540cb808fd62de4e262e7'; // Replace with your Geoapify API key

    // Geoapify API URL to fetch details of the place
    const url = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${apiKey}`;

    // Fetch place details from Geoapify API
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            const place = result.features[0].properties;

            // Extract relevant data
            const name = place.name;
            const description = place.description || 'No description available';
            const location = place.location || 'Unknown location';
            const category = place.category || 'Tourism';
            const address = place.address || 'Address not available';
            const open_hours = place.opening_hours || 'Not available';
            const entry_fee = place.entry_fee || 'Free';
            const image_url = place.image_url || '';
            const latitude = place.lat || null;
            const longitude = place.lon || null;

            // Insert data into the MySQL database
            const sql = `
                INSERT INTO destinations (name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(sql, [name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude], (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json({ 
                        message: 'Tourist spot added successfully from Geoapify',
                        id: result.insertId,
                        name,
                        description,
                        location,
                        category,
                        address,
                        open_hours,
                        entry_fee,
                        image_url,
                        latitude,
                        longitude
                    });
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching data from Geoapify:', error);
            res.status(500).json({ error: 'Error fetching data from Geoapify' });
        });
});



// 4. Update a tourist spot
app.put('/api/destinations/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude } = req.body;
    const sql = `
        UPDATE destinations
        SET name = ?, description = ?, location = ?, category = ?, address = ?, open_hours = ?, entry_fee = ?, image_url = ?, latitude = ?, longitude = ?
        WHERE destinations_id = ?`;
    db.query(sql, [name, description, location, category, address, open_hours, entry_fee, image_url, latitude, longitude, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Destination updated successfully.' });
        }
    });
});


// 5. Delete a tourist spot
app.delete('/api/destinations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM destinations WHERE destinations_id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Destination deleted successfully.' });
        }
    });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

