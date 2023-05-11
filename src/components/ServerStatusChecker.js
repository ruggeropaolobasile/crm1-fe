import React, { useEffect } from 'react';
import axios from 'axios';

const ServerStatusChecker = () => {
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get('/api/healthcheck');
        if (response.status === 200) {
          console.log('Il server backend è online');
        }
      } catch (error) {
        console.log('Impossibile contattare il server backend');
      }
    };

    // Chiamare la funzione per verificare lo stato del server
    checkServerStatus();
  }, []);

  return <div>Checking server status...</div>;
};

export default ServerStatusChecker;
