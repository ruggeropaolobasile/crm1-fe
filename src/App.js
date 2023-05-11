import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CustomerRow from './CustomerRow';
import { get, put } from './apiService';
import CustomerDetail from './components/CustomerDetail';

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const customersData = await get('customers');
    setCustomers(customersData);
  };

  const handleUpdateCustomer = async (updatedCustomer) => {
    const response = await put(`customers/${updatedCustomer.id}`, updatedCustomer);
    if (response) {
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === updatedCustomer.id ? response : customer
        )
      );
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
    <div>
      <h1>Customers</h1>
      
      <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearch} />
      
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
    </div>
  );
}

export default App;
