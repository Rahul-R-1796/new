import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://contact-bfw1.onrender.com/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContact = async () => {
    try {
      const response = await axios.post('https://contact-bfw1.onrender.com/contacts', {
        name,
        email,
        phone,
      });
      setContacts([...contacts, response.data]);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await axios.delete(`https://contact-bfw1.onrender.com/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== response.data._id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name}, {contact.email}, {contact.phone}
            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Contact</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
};

export default Contacts;
