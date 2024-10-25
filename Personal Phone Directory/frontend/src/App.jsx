import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { name, phone };

    fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setName('');
        setPhone('');
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  return (
    <div className="App">
      <h1>Bhushan's Phone Directory</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
      <hr />
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          
          <li key={contact.id}>
            <span>&#9742;</span> &nbsp;&nbsp;{contact.name} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
