
import React, { useState, useMemo } from 'react';
import { Card, Button, Input, Select, Badge } from '../components/UI';
import { Search, MapPin, Globe, ExternalLink, Phone, Navigation } from 'lucide-react';
import { venues } from '../data/venues';

const VenueDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');

  // Extract unique states for the filter dropdown
  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set(venues.map(v => v.state))).sort();
    return uniqueStates.map(s => ({ value: s, label: s }));
  }, []);

  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      const matchesSearch = 
        venue.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState ? venue.state === selectedState : true;
      
      return matchesSearch && matchesState;
    });
  }, [searchTerm, selectedState]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-zinc-400 text-sm hover:underline cursor-pointer" onClick={() => window.history.back()}>Directories</span>
            <span className="text-zinc-400 text-sm">/</span>
            <span className="text-brand-red text-sm font-medium">Venues</span>
          </div>
          <h2 className="text-2xl font-bold">Venue Directory</h2>
          <p className="text-zinc-500">Find and book the perfect stage for your next show.</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by venue name or city..." 
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black bg-white"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">All States</option>
              {states.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-600">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Venue Name</th>
                <th className="px-6 py-3 font-semibold">Location</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredVenues.length > 0 ? (
                filteredVenues.map((venue, index) => (
                  <tr key={index} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      {venue.venue}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{venue.city}, {venue.state}</span>
                        <span className="text-xs text-zinc-400">{venue.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                         {venue.phone && (
                           <span className="flex items-center gap-1 text-xs">
                             <Phone size={12} /> {venue.phone}
                           </span>
                         )}
                         {venue.website && (
                           <a 
                            href={venue.website.startsWith('http') ? venue.website : `http://${venue.website}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                           >
                             <Globe size={12} /> Website
                           </a>
                         )}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`, '_blank')}
                      >
                        <Navigation size={16} className="text-zinc-500" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                    No venues found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 text-xs text-zinc-500 flex justify-between items-center">
           <span>Showing {filteredVenues.length} venues</span>
           {/* Pagination could go here */}
        </div>
      </div>
    </div>
  );
};

export default VenueDirectory;
