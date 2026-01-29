
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import AgentPage from './pages/AgentPage';
import CashierPage from './pages/CashierPage';
import MapPage from './pages/MapPage';
import SubscribersPage from './pages/SubscribersPage';
import ReportsPage from './pages/ReportsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/cashier" element={<CashierPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/subscribers" element={<SubscribersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;