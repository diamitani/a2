import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Select, Badge, Modal } from '../components/UI';
import { CheckCircle2, Circle, ExternalLink, Wand2 } from 'lucide-react';
import { db } from '../services/mockDb';
import { PROProfile, Company, RoyaltySource } from '../types';
import { analyzeDocument } from '../services/geminiService';

const Setup = () => {
  const [activeTab, setActiveTab] = useState<'pro' | 'company' | 'royalties'>('pro');
  const [proData, setProData] = useState<PROProfile | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [royalties, setRoyalties] = useState<RoyaltySource[]>([]);
  const [oneSheet, setOneSheet] = useState<string>("");
  const [showOneSheetModal, setShowOneSheetModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setProData(await db.pro.get());
      setCompanyData(await db.company.get());
      setRoyalties(await db.royaltySources.getAll());
    };
    fetchData();
  }, []);

  const handleSavePro = async () => {
    if (proData) {
      await db.pro.update(proData);
      alert('P.R.O. details saved!');
    }
  };

  const handleSaveCompany = async () => {
    if (companyData) {
      await db.company.update(companyData);
      alert('Company details saved!');
    }
  };

  const handleGenerateOneSheet = async () => {
    // Mocking the AI generation for One Sheet based on Company Data
    setOneSheet("Generating...");
    setShowOneSheetModal(true);
    setTimeout(() => {
      setOneSheet(`
        PUBLISHING COMPANY ONE-SHEET
        ----------------------------
        Company: ${companyData?.company_name || 'N/A'}
        Entity: ${companyData?.entity_type}
        EIN: ${companyData?.ein}
        
        Overview:
        Professional music publishing entity established to manage rights, collect mechanical and performance royalties, and exploit copyright assets globally.
        
        Contact: legal@${(companyData?.company_name || 'artist').replace(/\s+/g, '').toLowerCase()}.com
      `);
    }, 1500);
  };

  if (!proData || !companyData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Publishing Setup</h2>
          <p className="text-zinc-500">Your command center for rights management.</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-zinc-200">
          <button onClick={() => setActiveTab('pro')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'pro' ? 'bg-brand-black text-white shadow' : 'text-zinc-500 hover:text-zinc-900'}`}>P.R.O.</button>
          <button onClick={() => setActiveTab('company')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'company' ? 'bg-brand-black text-white shadow' : 'text-zinc-500 hover:text-zinc-900'}`}>Entity</button>
          <button onClick={() => setActiveTab('royalties')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'royalties' ? 'bg-brand-black text-white shadow' : 'text-zinc-500 hover:text-zinc-900'}`}>Checklist</button>
        </div>
      </div>

      {activeTab === 'pro' && (
        <Card className="p-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="bg-brand-yellow w-2 h-6 rounded-full"></span>
            Performance Rights Organization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Select 
                label="Select Your P.R.O." 
                options={[
                  { value: '', label: 'Select...' },
                  { value: 'ASCAP', label: 'ASCAP' },
                  { value: 'BMI', label: 'BMI' },
                  { value: 'SESAC', label: 'SESAC' }
                ]}
                value={proData.pro_name}
                onChange={(e) => setProData({...proData, pro_name: e.target.value as any})}
              />
              <Input 
                label="Member ID / Account Number" 
                value={proData.member_id}
                onChange={(e) => setProData({...proData, member_id: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <Input 
                label="Writer IPI Number" 
                placeholder="000000000"
                value={proData.writer_ipi}
                onChange={(e) => setProData({...proData, writer_ipi: e.target.value})}
              />
              <Input 
                label="Publisher IPI Number" 
                placeholder="Optional if self-pub"
                value={proData.publisher_ipi}
                onChange={(e) => setProData({...proData, publisher_ipi: e.target.value})}
              />
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
            <a href="https://www.ascap.com/join-ascap" target="_blank" rel="noreferrer" className="text-sm text-brand-red font-medium flex items-center gap-1 hover:underline">
              Need to register? <ExternalLink size={14} />
            </a>
            <Button onClick={handleSavePro}>Save P.R.O. Profile</Button>
          </div>
        </Card>
      )}

      {activeTab === 'company' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <Card className="p-6 col-span-2">
            <h3 className="text-lg font-bold mb-4">Publishing Entity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Company Name" 
                value={companyData.company_name}
                onChange={(e) => setCompanyData({...companyData, company_name: e.target.value})}
              />
              <Input 
                label="EIN / Tax ID" 
                value={companyData.ein}
                onChange={(e) => setCompanyData({...companyData, ein: e.target.value})}
              />
              <Select 
                label="Entity Type" 
                options={[
                  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
                  { value: 'LLC', label: 'LLC' },
                  { value: 'Corporation', label: 'Corporation' }
                ]}
                value={companyData.entity_type}
                onChange={(e) => setCompanyData({...companyData, entity_type: e.target.value})}
              />
              <Input 
                label="State of Formation" 
                value={companyData.state}
                onChange={(e) => setCompanyData({...companyData, state: e.target.value})}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={handleGenerateOneSheet}>
                <Wand2 size={16} className="mr-2" />
                Generate One-Sheet
              </Button>
              <Button onClick={handleSaveCompany}>Save Company</Button>
            </div>
          </Card>
          
          <Card className="p-6 bg-zinc-900 text-white">
            <h4 className="font-bold text-brand-yellow mb-2">Why form an entity?</h4>
            <ul className="text-sm space-y-3 text-zinc-300">
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Professional appearance</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Liability protection (LLC)</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Easier to open business bank accounts</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0" /> Separate personal and business finances</li>
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'royalties' && (
        <Card className="p-0 animate-in fade-in slide-in-from-bottom-4">
           <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
             <h3 className="font-bold text-lg">Collection Society Checklist</h3>
             <Button variant="secondary" size="sm" onClick={() => alert("AI scanning... Your setup looks 60% complete.")}>
                <Wand2 size={14} className="mr-2" />
                Fix Gaps with AI
             </Button>
           </div>
           <div className="divide-y divide-zinc-100">
             {royalties.map(source => (
               <div key={source.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                 <div className="flex items-center gap-4">
                   {source.status === 'Complete' 
                    ? <CheckCircle2 className="text-green-500" /> 
                    : <Circle className="text-zinc-300" />}
                   <div>
                     <p className="font-medium">{source.name}</p>
                     <p className="text-xs text-zinc-500">{source.notes}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <Badge color={source.status === 'Complete' ? 'green' : source.status === 'In Progress' ? 'yellow' : 'gray'}>
                      {source.status}
                    </Badge>
                    <button 
                      className="text-xs text-blue-600 hover:underline"
                      onClick={async () => {
                         const newStatus = source.status === 'Complete' ? 'Not Started' : 'Complete';
                         const updated = await db.royaltySources.update(source.id, newStatus);
                         setRoyalties(prev => prev.map(p => p.id === updated?.id ? updated : p));
                      }}
                    >
                      Toggle
                    </button>
                 </div>
               </div>
             ))}
           </div>
        </Card>
      )}

      <Modal isOpen={showOneSheetModal} onClose={() => setShowOneSheetModal(false)} title="Company One-Sheet">
         <pre className="bg-zinc-100 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap">
           {oneSheet}
         </pre>
         <div className="mt-4 flex justify-end">
           <Button onClick={() => setShowOneSheetModal(false)}>Close</Button>
         </div>
      </Modal>
    </div>
  );
};

export default Setup;