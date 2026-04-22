import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TaskDistributionChart = ({ completed, active, pending }) => {
  const total = completed + active + pending;
  
  const data = [
    { name: 'Completed', value: completed, color: '#10B981' },
    { name: 'Active', value: active, color: '#F59E0B' },
    { name: 'Pending', value: pending, color: '#6B7280' },  
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4 shadow-lg relative overflow-hidden group">
      
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-200/5 blur-[100px] rounded-full"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
      
        <div className="relative w-full md:w-1/2 h-70">
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
                contentStyle={{ backgroundColor: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#111827' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
        
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-tighter">Total Tasks</span>
            <span className="text-4xl font-mono font-extrabold text-gray-900">{total.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Performance Analytics</h3>
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-700 text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-900 font-mono font-bold text-lg">{item.value}</span>
                <span className="text-[10px] text-gray-500 uppercase">Units</span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TaskDistributionChart;