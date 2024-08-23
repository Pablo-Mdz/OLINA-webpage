import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import { SearchProvider } from './context/search.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <Router>
        <AuthProviderWrapper>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProviderWrapper>
      </Router>
    </SearchProvider>
  </QueryClientProvider>,
);
