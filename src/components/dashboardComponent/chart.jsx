import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TaskDistributionChart = ({ completed, active, pending }) => {
  const total = completed + active + pending;
  
  const data = [
    { name: 'Completed', value: completed, color: '#00B464' }, // Success Green
    { name: 'Active', value: active, color: '#F7A600' },    // Warning Orange
    { name: 'Pending', value: pending, color: '#848E9C' },   // Muted Slate
  ];

  return (
    <div className="bg-[#17181E] border border-slate-800/60 rounded-2xl p-4 shadow-2xl relative overflow-hidden group">
      {/* Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F7A600]/5 blur-[100px] rounded-full"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: The Chart */}
        <div className="relative w-full md:w-1/2 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius="75%"
                outerRadius="90%"
                paddingAngle={6}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0E0F13', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text: Makes it look like a pro dashboard */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-tighter">Total Tasks</span>
            <span className="text-4xl font-mono font-extrabold text-white">{total.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Right Side: Detailed Legend List */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-white font-bold text-lg mb-2">Performance Analytics</h3>
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-400 text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white font-mono font-bold text-lg">{item.value}</span>
                <span className="text-[10px] text-slate-600 uppercase">Units</span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TaskDistributionChart;