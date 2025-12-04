import React, { useEffect, useState } from 'react';
import { Card, Button } from '../components/UI';
import { TrendingUp, CheckSquare, Zap } from 'lucide-react';
import { db } from '../services/mockDb';
import { Task } from '../types';

const Optimizer = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    db.tasks.getAll().then(setTasks);
  }, []);

  const toggleTask = async (id: string) => {
    const updated = await db.tasks.toggle(id);
    if (updated) {
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Royalty Optimizer</h2>
        <p className="text-zinc-500">Maximize your earnings with AI-driven insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <TrendingUp size={32} className="text-green-500 mb-2" />
          <h3 className="text-3xl font-bold">$1,245</h3>
          <p className="text-sm text-zinc-500">Est. Unclaimed Royalties</p>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <CheckSquare size={32} className="text-blue-500 mb-2" />
          <h3 className="text-3xl font-bold">85%</h3>
          <p className="text-sm text-zinc-500">Catalog Registration Health</p>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <Zap size={32} className="text-brand-yellow mb-2" />
          <h3 className="text-3xl font-bold">3</h3>
          <p className="text-sm text-zinc-500">High Impact Actions</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Recommended Actions</h3>
          <Button size="sm" variant="secondary" onClick={() => {
            setTasks(prev => [...prev, { id: Date.now().toString(), description: "Register 'Broken Strings' with MLC", completed: false }]);
          }}>
            <Zap size={14} className="mr-2" /> Refresh Plan
          </Button>
        </div>
        
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 accent-brand-red rounded cursor-pointer"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-800'}`}>
                {task.description}
              </span>
              {task.completed && <span className="text-xs text-green-600 font-medium">Done</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Optimizer;