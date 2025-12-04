
import React from 'react';
import { Card, Button } from '../components/UI';
import { MapPin, Radio, Mic2, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Directories = () => {
  const navigate = useNavigate();

  const directories = [
    {
      id: 'venues',
      title: 'Venue Directory',
      description: 'Browse over 1,000 music venues across the country. Find clubs, halls, and bars to book your next gig.',
      icon: MapPin,
      color: 'bg-blue-100 text-blue-600',
      link: '/directories/venues',
      count: '1,200+'
    },
    {
      id: 'radio',
      title: 'Radio Stations',
      description: 'Connect with college, community, and commercial radio stations to get your music on air.',
      icon: Radio,
      color: 'bg-purple-100 text-purple-600',
      link: '#',
      count: 'Coming Soon'
    },
    {
      id: 'service',
      title: 'Service Providers',
      description: 'Find producers, engineers, graphic designers, and other industry professionals.',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      link: '#',
      count: 'Coming Soon'
    },
    {
      id: 'festivals',
      title: 'Festival Guide',
      description: 'A comprehensive list of music festivals accepting submissions.',
      icon: Mic2,
      color: 'bg-orange-100 text-orange-600',
      link: '#',
      count: 'Coming Soon'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Directories</h2>
        <p className="text-zinc-500">Connect with the industry. Find venues, partners, and opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {directories.map((dir) => (
          <Card key={dir.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer group" onClick={() => {
            if (dir.link !== '#') navigate(dir.link);
          }}>
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${dir.color}`}>
                <dir.icon size={32} />
              </div>
              <span className="text-xs font-medium bg-zinc-100 px-2 py-1 rounded-full text-zinc-600">
                {dir.count} {dir.link === '#' ? '' : 'Entries'}
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl font-bold group-hover:text-brand-red transition-colors flex items-center">
                {dir.title}
                {dir.link !== '#' && <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </h3>
              <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
                {dir.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Directories;
