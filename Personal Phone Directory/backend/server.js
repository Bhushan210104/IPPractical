const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let contacts = [
  { id: 1, name: 'Sahil', phone: '9481525965' },
  { id: 2, name: 'Shiv', phone: '9876543210' }
];

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const newContact = {
    id: contacts.length + 1,
    name: req.body.name,
    phone: req.body.phone
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
