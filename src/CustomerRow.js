import React, { useState, useEffect } from 'react';
import { put, get } from './apiService';

function CustomerRow({ customer, onUpdate, onOpenDetail }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const addressResponse = await get(`addresses?customerId=${customer.id}`);
      if (addressResponse && addressResponse.length > 0) {
        setAddress(addressResponse[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const updatedCustomer = {
      id: customer.id,
      name,
      email,
      phoneNumber
    };

    put(`customers/${customer.id}`, updatedCustomer)
      .then(response => {
        onUpdate(response);
        setEditing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleOpenDetail = () => {
    onOpenDetail(customer.id);
  };

  return (
    <div className="customer-row" key={customer.id}>
      {editing ? (
        <>
          <div>ID: {customer.id}</div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <div>ID: {customer.id}</div>
          <span>Name: {customer.name}</span>
          <span>Email: {customer.email}</span>
          <span>Phone: {customer.phoneNumber}</span>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          <button className="detail-button" onClick={handleOpenDetail}>Detail</button>
        </>
      )}
      {address && (
        <div className="address-details">
          <div>Street: {address.street}</div>
          <div>City: {address.city}</div>
          <div>State: {address.state}</div>
          <div>Zip Code: {address.zipCode}</div>
        </div>
      )}
    </div>
  );
}

export default CustomerRow;
