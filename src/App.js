import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CustomerRow from "./CustomerRow";
import { get, put } from "./apiService";
import CustomerDetail from "./components/CustomerDetail";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const customersData = await get("customers");
      setCustomers(customersData);
      setError(null);
    } catch (error) {
      setError(
        "Errore durante il recupero dei dati dei clienti. Possibili cause includono:"
      );
      setErrorList([
        "Problemi di connessione al server - il back end non è in run",
        "Il server non è in esecuzione o non è raggiungibile",
        "Errore interno del server",
        "Endpoint API non corretto",
      ]);
    }
  };

  const handleUpdateCustomer = async (updatedCustomer) => {
    try {
      const response = await put(
        `customers/${updatedCustomer.id}`,
        updatedCustomer
      );
      if (response) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === updatedCustomer.id ? response : customer
          )
        );
      }
      setError(null);
    } catch (error) {
      setError("Errore durante l'aggiornamento del cliente.");
    }
  };

  const handleOpenDetail = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  const handleCloseDetail = () => {
    setSelectedCustomerId(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Customers</h1>

      <input
        className="app-search-input"
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />

      {filteredCustomers.map((customer) => (
        <CustomerRow
          key={customer.id}
          customer={customer}
          onUpdate={handleUpdateCustomer}
          onOpenDetail={handleOpenDetail}
        />
      ))}

      {selectedCustomerId && (
        <CustomerDetail
          customerId={selectedCustomerId}
          onCloseDetail={handleCloseDetail}
        />
      )}

      {error && (
        <div className="error-message">
          {error}
          <ul className="error-list">
            {errorList.map((errorMessage) => (
              <li key={errorMessage}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
