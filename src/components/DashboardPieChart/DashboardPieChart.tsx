'use client';

import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6961'];

const DashboardPieChart = ({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">{ title }</h3>
    <ResponsiveContainer width="100%" height={ 300 }>
      <PieChart>
        <Pie data={ data } dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={ 100 } label>
          {
            data.map((entry, index) => (
              <Cell key={ index } fill={ COLORS[index % COLORS.length] } />
            ))
          }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardPieChart;
