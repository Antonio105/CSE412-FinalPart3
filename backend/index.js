const express = require('express')
const cors = require('cors')
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Database client assigned with local database parameters
const client = new Client({
    user: 'postgres',
    host: 'localhost',                  
    database: 'whatcd',     
    password: 'password', 
    port: 5434,                       
});
// Connection 
client.connect()
    .then(() => console.log('Connected to the PostgreSQL database'))
    .catch((err) => console.error('Connection error', err.stack));
  
module.exports = client;

// API call for search (Search Artist Name)
app.post('/search', async (req, res) => {
  const { searchQuery, filters } = req.body;

  // General Query
  let query = 'SELECT * FROM whatcd.artists_alias WHERE 1=1';
  const queryParams = [];

  if (searchQuery) {
    query += ' AND name ILIKE $1';
    queryParams.push(`%${searchQuery}%`);
  }

  // Constructed query backend logs
  console.log('Query:', query); 
  console.log('QueryParams:', queryParams); 

  try {
    // Execute the query and print results to the backend
    const result = await client.query(query, queryParams);
    console.log('Results from Database:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server Error');
  }
});

// API call for search-file (In Torrents, Search for Album Names)
app.post('/search-file', async (req, res) => {
  const { albumName, minPositiveVotes } = req.body;
  console.log('Received Album Name:', albumName); 
  console.log('Minimum Positive Votes:', minPositiveVotes); 

  // General Query
  let query = `
    SELECT t.id, t.groupid, t.media, t.format, t.filepath, t.filelist, t.size, t.time,
    COALESCE(SUM(tt.positivevotes), 0) AS positivevotes, 
    COALESCE(SUM(tt.negativevotes), 0) AS negativevotes
    FROM whatcd.torrents t
    LEFT JOIN whatcd.torrents_tags tt ON t.groupid = tt.groupid
    WHERE t.filepath ILIKE $1
    GROUP BY t.id, t.groupid, t.media, t.format, t.filepath, t.filelist, t.size, t.time`;
  const queryParams = [`%${albumName}%`];

  // Appended Input Parameters to Query
  if (minPositiveVotes) {
    query += ' HAVING SUM(tt.positivevotes) >= $2';
    queryParams.push(Number(minPositiveVotes));
  }
  query += ` LIMIT 100;`;

  // Output the constructed query to the backend
  console.log('Constructed Query:', query); 
  console.log('Query Parameters:', queryParams); 
  try {
    const result = await client.query(query, queryParams);
    console.log('Results from Database:', result.rows); 
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/search-collages', async (req, res) => {
  const { collageName, minSubscribers } = req.body;

  // General Query
  let query = `
    SELECT id, name, numtorrents, categoryid, taglist, subscribers, updated
    FROM whatcd.collages
    WHERE 1=1
  `;
  const queryParams = [];

  // Appended Input Parameters to Query
  if (collageName) {
    query += ' AND name ILIKE $1';
    queryParams.push(`%${collageName}%`);
  }

  if (minSubscribers) {
    query += ' AND subscribers >= $2';
    queryParams.push(Number(minSubscribers));
  }

  console.log('Constructed Query:', query);
  console.log('Query Parameters:', queryParams);

  try {
    const result = await client.query(query, queryParams);
    console.log('Results from Database:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => console.log("Server is running"))