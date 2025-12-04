import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { Bot, Send } from 'lucide-react';
import { askTaxAssistant } from '../services/geminiService';

const Business = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hello! I am your Artist Business & Tax assistant. Ask me about deductions, write-offs, or entity structures.' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    const answer = await askTaxAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Business & Tax Tools</h2>
        <p className="text-zinc-500">Smart guidance for your bottom line.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
           {/* Tax Checklist Card */}
           <Card className="p-6">
             <h3 className="font-bold mb-4">Tax Prep Checklist</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {['Track Studio Rent', 'Log Mileage', 'Gather 1099s', 'Categorize Meals', 'Instrument Depreciation'].map(item => (
                 <label key={item} className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
                   <input type="checkbox" className="w-4 h-4 accent-brand-black" />
                   {item}
                 </label>
               ))}
             </div>
           </Card>

           {/* Chat Interface */}
           <Card className="flex-1 flex flex-col p-0 overflow-hidden min-h-[400px]">
             <div className="p-4 border-b border-zinc-100 bg-zinc-50 font-medium flex items-center gap-2">
               <Bot size={18} className="text-brand-red" /> Tax AI Assistant
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                     m.role === 'user' 
                       ? 'bg-brand-black text-white' 
                       : 'bg-zinc-100 text-zinc-800'
                   }`}>
                     {m.text}
                   </div>
                 </div>
               ))}
               {loading && <div className="text-xs text-zinc-400 ml-4">Thinking...</div>}
             </div>
             <form onSubmit={handleSend} className="p-4 border-t border-zinc-100 flex gap-2">
               <input 
                 className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-black"
                 placeholder="Can I write off my Spotify subscription?"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
               />
               <Button type="submit" disabled={loading} size="sm">
                 <Send size={18} />
               </Button>
             </form>
           </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-brand-yellow/10 border-brand-yellow">
            <h3 className="font-bold text-brand-black mb-2">Did you know?</h3>
            <p className="text-sm text-zinc-700">
              You can deduct 100% of equipment purchased for your business if it's under $2,500 per item, using the De Minimis Safe Harbor election.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Business;