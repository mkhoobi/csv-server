const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.use(cors({
    origin: '*', 
  }));

const csvWriter = createObjectCsvWriter({
  path: 'template.csv',
  header: [
    { id: 'Anforderungsnummer', title: 'Anforderungsnummer' },
    { id: 'Herzgröße', title: 'Herzgröße' },
    { id: 'PleuraergussLinks', title: 'PleuraergussLinks' },
    { id: 'PleuraergussRechts', title: 'PleuraergussRechts' },
    { id: 'InfiltrateLinks', title: 'InfiltrateLinks' },
    { id: 'InfiltrateRechts', title: 'InfiltrateRechts' },
    { id: 'Stauung', title: 'Stauung' },
    { id: 'BelüftungsstörungenLinks', title: 'BelüftungsstörungenLinks' },
    { id: 'BelüftungsstörungenRechts', title: 'BelüftungsstörungenRechts' },
    { id: 'Untersucher', title: 'Untersucher' },
  ],
  append: true,
});

app.post('/api/save-to-csv', (req, res) => {
  const record = req.body;

  csvWriter.writeRecords([record])
    .then(() => {
      res.json({ message: 'Record saved successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to save record' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
