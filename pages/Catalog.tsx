import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Badge, Modal } from '../components/UI';
import { Upload, Music2, Wand2, Download, Copy } from 'lucide-react';
import { db } from '../services/mockDb';
import { Song } from '../types';
import { analyzeSongMetadata, generateSyncPitch } from '../services/geminiService';

const Catalog = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [syncPitch, setSyncPitch] = useState<string | null>(null);

  useEffect(() => {
    db.songs.getAll().then(setSongs);
  }, []);

  const handleUpload = async () => {
    // Simulate upload
    const newSong: Song = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: 'u1',
      title: uploadTitle || (uploadFile?.name.replace(/\.[^/.]+$/, "") || "Untitled"),
      artist: 'Alex Rivera',
      created_at: new Date().toISOString(),
      tags: [],
      writers: 'Alex Rivera (100%)',
      splits: '100'
    };
    
    // Simulate initial AI extraction delay
    setTimeout(async () => {
      const aiData = await analyzeSongMetadata(newSong.title, newSong.artist);
      const enrichedSong = { ...newSong, ...aiData };
      await db.songs.add(enrichedSong);
      setSongs(prev => [...prev, enrichedSong]);
      setUploadModalOpen(false);
      setUploadTitle("");
      setUploadFile(null);
    }, 1000);
  };

  const handleImproveMetadata = async (id: string) => {
    const song = songs.find(s => s.id === id);
    if (!song) return;
    
    const aiData = await analyzeSongMetadata(song.title, song.artist);
    const updated = await db.songs.update(id, aiData);
    if (updated) {
      setSongs(prev => prev.map(s => s.id === id ? updated : s));
    }
  };

  const handleGeneratePitch = async (song: Song) => {
    setSyncPitch("Generating pitch...");
    const pitch = await generateSyncPitch(song);
    setSyncPitch(pitch);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Music Catalog</h2>
          <p className="text-zinc-500">Manage your assets, metadata, and exports.</p>
        </div>
        <Button onClick={() => setUploadModalOpen(true)}>
          <Upload size={18} className="mr-2" />
          Upload New Song
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {songs.map(song => (
          <Card key={song.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-brand-black group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-brand-black group-hover:text-white transition-colors">
                <Music2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">{song.title}</h4>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-zinc-500">
                  <span>{song.bpm ? `${song.bpm} BPM` : 'No BPM'}</span>
                  <span>•</span>
                  <span>{song.genre || 'No Genre'}</span>
                  <span>•</span>
                  <span>{song.mood || 'No Mood'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
              <div className="flex gap-1">
                {song.tags.map(tag => (
                  <Badge key={tag} color="gray">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleImproveMetadata(song.id)}>
                  <Wand2 size={14} className="mr-1" /> Meta
                </Button>
                <div className="relative group/export">
                   <Button variant="outline" size="sm" onClick={() => handleGeneratePitch(song)}>
                     Export
                   </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {songs.length === 0 && (
           <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-xl">
             <p className="text-zinc-400">No songs found. Upload one to get started.</p>
           </div>
        )}
      </div>

      <Modal isOpen={isUploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload Song">
        <div className="space-y-4">
          <Input 
            label="Song Title" 
            value={uploadTitle} 
            onChange={(e) => setUploadTitle(e.target.value)} 
            placeholder="e.g. Midnight City"
          />
          <div className="border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center hover:bg-zinc-50 cursor-pointer relative">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
            <Upload className="mx-auto text-zinc-400 mb-2" />
            <p className="text-sm text-zinc-600">{uploadFile ? uploadFile.name : "Click to select WAV/MP3"}</p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setUploadModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload} disabled={!uploadTitle && !uploadFile}>Upload & Analyze</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!syncPitch} onClose={() => setSyncPitch(null)} title="Sync Pitch Pack">
        <div className="space-y-4">
          <textarea 
            className="w-full h-40 p-3 border border-zinc-200 rounded-lg text-sm"
            readOnly 
            value={syncPitch || ''}
          />
          <div className="flex justify-end gap-2">
             <Button variant="outline" onClick={() => navigator.clipboard.writeText(syncPitch || '')}>
               <Copy size={16} className="mr-2" /> Copy
             </Button>
             <Button onClick={() => setSyncPitch(null)}>Done</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Catalog;