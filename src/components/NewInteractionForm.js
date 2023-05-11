import React, { useState } from 'react';
import axios from 'axios';

function NewInteractionForm({ onCreateInteraction }) {
  const [interactionData, setInteractionData] = useState({
    type: '',
    description: '',
    customerId: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/Interactions', interactionData)
      .then(response => {
        onCreateInteraction(response.data); // Passa l'interazione creata al componente padre
        setInteractionData({ type: '', description: '', customerId: '' }); // Reimposta i dati del form
      })
      .catch(error => console.log(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInteractionData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Interaction</h2>
      <div>
        <label>Type:</label>
        <input type="text" name="type" value={interactionData.type} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={interactionData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Customer ID:</label>
        <input type="text" name="customerId" value={interactionData.customerId} onChange={handleChange} />
      </div>
      <button type="submit">Create Interaction</button>
    </form>
  );
}

export default NewInteractionForm;
