import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import "./CustomerDetail.css";

function CustomerDetail({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [newInteraction, setNewInteraction] = useState({
    type: "",
    description: "",
    date: "",
    duration: "",
    outcome: "",
  });

  useEffect(() => {
    fetchCustomerDetail();
    fetchCustomerInteractions();
  }, [customerId]);

  const fetchCustomerDetail = async () => {
    try {
      const addressesResponse = await axios.get("/api/Addresses");
      const matchingAddress = addressesResponse.data.find(
        (address) => address.customerId === customerId
      );

      if (matchingAddress) {
        const customersResponse = await axios.get(
          `/api/customers/${matchingAddress.customerId}`
        );
        setCustomer(customersResponse.data);
        setAddress(matchingAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomerInteractions = async () => {
    try {
      const interactionsResponse = await axios.get("/api/interactions");
      const customerInteractions = interactionsResponse.data.filter(
        (interaction) => interaction.customerId === customerId
      );
      setInteractions(customerInteractions);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewInteraction = async () => {
    try {
      const interactionData = {
        customerId,
        type: newInteraction.type,
        description: newInteraction.description,
        date: newInteraction.date,
        duration: newInteraction.duration,
        outcome: newInteraction.outcome,
      };

      const response = await axios.post("/api/interactions", interactionData);
      const createdInteraction = response.data;

      setInteractions((prevInteractions) => [
        ...prevInteractions,
        createdInteraction,
      ]);
      setNewInteraction({
        type: "",
        description: "",
        date: "",
        duration: "",
        outcome: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!customer || !address) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-details">
      <div className="customer-fields">
        <h1>Customer Detail</h1>
        <div>ID: {customer.id}</div>
        <div>Name: {customer.name}</div>
        <div>Email: {customer.email}</div>
        <div>Phone: {customer.phoneNumber}</div>
        <div className="rating">
          Rating:
          <Rating
            initialValue={customer.rating}
            size={20}
            disabled={true}
            className="star-rating"
          />
        </div>
        <div className="address">
          <div>Address:</div>
          <div>Street: {address.street}</div>
          <div>City: {address.city}</div>
          <div>State: {address.state}</div>
          <div>Zip Code: {address.zipCode}</div>
        </div>

      </div>

      <h2>Interactions</h2>
      <ul className="interaction-list">
        {interactions.map((interaction) => (
          <li key={interaction.id} className="interaction-item">
            <div>Type: {interaction.type}</div>
            <div>Description: {interaction.description}</div>
            <div>Date: {interaction.date}</div>
            <div>Duration: {interaction.duration}</div>
            <div>Outcome: {interaction.outcome}</div>
          </li>
        ))}
      </ul>

      <div className="new-interaction">
        <h2>New Interaction</h2>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={newInteraction.type}
            onChange={(event) =>
              setNewInteraction({ ...newInteraction, type: event.target.value })
            }
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={newInteraction.description}
            onChange={(event) =>
              setNewInteraction({
                ...newInteraction,
                description: event.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="text"
            value={newInteraction.date}
            onChange={(event) =>
              setNewInteraction({ ...newInteraction, date: event.target.value })
            }
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            value={newInteraction.duration}
            onChange={(event) =>
              setNewInteraction({
                ...newInteraction,
                duration: event.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Outcome:</label>
          <input
            type="text"
            value={newInteraction.outcome}
            onChange={(event) =>
              setNewInteraction({
                ...newInteraction,
                outcome: event.target.value,
              })
            }
          />
        </div>
        <button onClick={createNewInteraction}>Create Interaction</button>
      </div>
    </div>
  );
}

export default CustomerDetail;
