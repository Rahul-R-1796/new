const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://imran:imran@imran.blji5mm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create the Contact schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/contacts', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedContact = await Contact.findByIdAndRemove(id);
    res.json(deletedContact);
  } catch (error) {
    res.status(404).json({ message: 'Contact not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
