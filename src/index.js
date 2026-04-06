import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
//import { DashboardProvider } from './context/DashboardContext';

// 1. Root element को सिलेक्ट करना
const root = ReactDOM.createRoot(document.getElementById('root'));

// 2. DashboardProvider का उपयोग करके App को रेंडर करना
// StrictMode डेवलपमेंट के दौरान पोटेंशियल प्रॉब्लम्स को ढूंढने में मदद करता है
root.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);