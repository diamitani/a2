import React from 'react';
import { Card, Badge, Button } from '../components/UI';
import { ExternalLink, Star } from 'lucide-react';
import { LicensingOpp } from '../types';

const mockOpps: LicensingOpp[] = [
  { id: '1', name: 'Artlist', category: 'Library', contact: 'submits@artlist.io', preferred_genres: 'Pop, Acoustic, Cinematic', submission_link: '#' },
  { id: '2', name: 'Music Bed', category: 'Library', contact: 'A&R', preferred_genres: 'Indie, Folk', submission_link: '#' },
  { id: '3', name: 'Crucial Music', category: 'Agency', contact: 'Online Form', preferred_genres: 'Rock, Blues', submission_link: '#' },
];

const Licensing = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Licensing Directory</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockOpps.map(opp => (
              <Card key={opp.id} className="p-5 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{opp.name}</h3>
                  <div className="flex gap-2 mt-2 mb-3">
                    <Badge color="blue">{opp.category}</Badge>
                    <span className="text-xs text-zinc-500 self-center">Prefers: {opp.preferred_genres}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => window.open(opp.submission_link, '_blank')}>
                  Submit <ExternalLink size={14} className="ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <Card className="p-6 bg-brand-black text-white">
             <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
               <Star className="text-brand-yellow fill-brand-yellow" size={20} />
               Readiness Score
             </h3>
             <p className="text-zinc-400 text-sm mb-4">Select a song to check if it's ready for pitching.</p>
             <select className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-3 py-2 text-sm mb-4">
               <option>Neon Highway</option>
               <option>Broken Strings</option>
             </select>
             
             <div className="text-center py-4">
               <span className="text-4xl font-bold text-brand-yellow">85%</span>
               <p className="text-xs text-zinc-400 mt-1">Ready for Libraries</p>
             </div>

             <div className="space-y-2 mt-4 text-sm text-zinc-300">
               <p className="flex justify-between"><span>Metadata</span> <span className="text-green-400">✓</span></p>
               <p className="flex justify-between"><span>Instrumental</span> <span className="text-red-400">✗</span></p>
               <p className="flex justify-between"><span>Clear Splits</span> <span className="text-green-400">✓</span></p>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Licensing;