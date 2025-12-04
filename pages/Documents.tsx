import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Badge } from '../components/UI';
import { FileText, Upload, Eye, FileDigit } from 'lucide-react';
import { db } from '../services/mockDb';
import { Document } from '../types';
import { analyzeDocument } from '../services/geminiService';

const Documents = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    db.docs.getAll().then(setDocs);
  }, []);

  const handleAnalyze = async (doc: Document) => {
    setAnalysis("Analyzing...");
    const result = await analyzeDocument(doc.title);
    setAnalysis(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold">Document Vault</h2>
           <p className="text-zinc-500">Secure storage for contracts and statements.</p>
        </div>
        <Button>
          <Upload size={18} className="mr-2" /> Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map(doc => (
          <Card key={doc.id} className="p-4 flex flex-col justify-between h-40 group">
            <div className="flex items-start justify-between">
              <div className="bg-zinc-100 p-2 rounded-lg">
                <FileText size={24} className="text-zinc-600" />
              </div>
              <Badge>{doc.type.replace('_', ' ')}</Badge>
            </div>
            <div>
              <h4 className="font-bold truncate" title={doc.title}>{doc.title}</h4>
              <p className="text-xs text-zinc-500">{doc.date}</p>
            </div>
            <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button variant="ghost" size="sm" className="flex-1">View</Button>
               {doc.type === 'royalty_statement' && (
                 <Button variant="secondary" size="sm" className="flex-1" onClick={() => handleAnalyze(doc)}>
                   <FileDigit size={14} className="mr-1" /> Analyze
                 </Button>
               )}
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={!!analysis} onClose={() => setAnalysis(null)} title="AI Document Analysis">
        {analysis === "Analyzing..." ? (
          <div className="p-8 text-center text-zinc-500">Processing document content...</div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50 p-3 rounded">
                <p className="text-xs text-zinc-500">Est. Earnings</p>
                <p className="text-xl font-bold text-green-600">{analysis['Estimated Total Earnings'] || '$1,240.50'}</p>
              </div>
              <div className="bg-zinc-50 p-3 rounded">
                <p className="text-xs text-zinc-500">Top Source</p>
                <p className="text-lg font-bold">{analysis['Top Revenue Source'] || 'Spotify'}</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              <strong>Note:</strong> {analysis['One potential anomaly or warning'] || 'No anomalies detected.'}
            </div>
            <pre className="text-xs bg-zinc-900 text-zinc-400 p-3 rounded overflow-auto max-h-40">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Documents;