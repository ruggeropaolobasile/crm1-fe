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
    <div className="container customer-details">
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
      <table className="table table-striped interaction-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.id} className="interaction-row">
              <td>{interaction.type}</td>
              <td>{interaction.description}</td>
              <td>{interaction.date}</td>
              <td>{interaction.duration}</td>
              <td>{interaction.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="new-interaction">
        <h2>Sezione New Interaction</h2>
        <label htmlFor="interactionType">Interaction Type:</label>
        <select
          id="interactionType"
          className="form-control"
          value={newInteraction.type}
          onChange={(event) =>
            setNewInteraction({ ...newInteraction, type: event.target.value })
          }
        >
          <option value="">Select Type</option>
          <option value="chiamata in ingresso">Chiamata in Ingresso</option>
          <option value="chiamata in uscita">Chiamata in Uscita</option>
        </select>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={newInteraction.description}
            onChange={(event) =>
              setNewInteraction({
                ...newInteraction,
                description: event.target.value,
              })
            }
            required
          />
          {newInteraction.description === "" && (
            <small className="text-danger">Description is required</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            className="form-control"
            value={newInteraction.date}
            onChange={(event) =>
              setNewInteraction({ ...newInteraction, date: event.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            className="form-control"
            value={newInteraction.duration}
            onChange={(event) =>
              setNewInteraction({
                ...newInteraction,
                duration: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="outcome">Outcome:</label>
          <input
            type="text"
            id="outcome"
            className="form-control"
            value={newInteraction.outcome}
            onChange={(event) =>
              setNewInteraction({
                ...newInteraction,
                outcome: event.target.value,
              })
            }
          />
        </div>
        <button className="btn btn-primary" onClick={createNewInteraction}>
          Create Interaction
        </button>
      </div>
    </div>
  );
}

export default CustomerDetail;
