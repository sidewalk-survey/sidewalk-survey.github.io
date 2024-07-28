import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserLogPage from './components/UserLogPage';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

// Replace these with your actual IP addresses
const MY_IP_ADDRESS_1 = '18.29.47.47';
const MY_IP_ADDRESS_2 = '130.44.181.246';

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "surveyAnswers0727"));
        const emailSet = new Set();
        querySnapshot.forEach(doc => {
          let email = doc.data().email;
          let ipAddress = doc.data().ipAddress; // Updated field name
          if (email && ipAddress && ipAddress !== MY_IP_ADDRESS_1 && ipAddress !== MY_IP_ADDRESS_2) {
            emailSet.add(email);
          }
        });
        setEmails(Array.from(emailSet));
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route for the main page */}
          <Route path="/" element={<EmailList emails={emails} />} />
          {/* Route for the user log page */}
          <Route path="/logs/:email" element={<UserLogPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function EmailList({ emails }) {
  return (
    <div>
      <h1>Responses</h1>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            {email} <Link to={`/logs/${encodeURIComponent(email)}`}>View Logs</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
