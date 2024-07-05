import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import { SearchProvider } from './context/search.context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <SearchProvider>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </SearchProvider>,
);
