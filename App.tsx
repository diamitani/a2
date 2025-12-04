
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Setup from './pages/PublishingSetup';
import Catalog from './pages/Catalog';
import Licensing from './pages/Licensing';
import Documents from './pages/Documents';
import Optimizer from './pages/Optimizer';
import Business from './pages/Business';
import Directories from './pages/Directories';
import VenueDirectory from './pages/VenueDirectory';

const DashboardPlaceholder = () => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold mb-2">Welcome to Artispreneur</h2>
    <p className="text-zinc-500">Select "Publishing Hub" or "Directories" in the sidebar to get started.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPlaceholder />} />
          <Route path="/publishing/setup" element={<Setup />} />
          <Route path="/publishing/catalog" element={<Catalog />} />
          <Route path="/publishing/licensing" element={<Licensing />} />
          <Route path="/publishing/documents" element={<Documents />} />
          <Route path="/publishing/optimizer" element={<Optimizer />} />
          <Route path="/publishing/business" element={<Business />} />
          
          {/* Directories Routes */}
          <Route path="/directories" element={<Directories />} />
          <Route path="/directories/venues" element={<VenueDirectory />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
