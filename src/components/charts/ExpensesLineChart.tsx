import React, { useEffect, useRef } from 'react';

interface DataPoint {
  month: string;
  amount: number;
}

interface ExpensesLineChartProps {
  data: DataPoint[];
}

const ExpensesLineChart: React.FC<ExpensesLineChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Format currency
  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find min and max values
    const amounts = data.map(d => d.amount);
    const maxAmount = Math.max(...amounts) * 1.1; // Add 10% padding
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // X axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    
    // Draw grid lines and labels
    const gridLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#6b7280';
    
    for (let i = 0; i <= gridLines; i++) {
      const y = height - padding - (i / gridLines) * chartHeight;
      const value = (i / gridLines) * maxAmount;
      
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.fillText(formattedCurrency(value), padding - 5, y + 3);
    }
    
    ctx.stroke();
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    const step = chartWidth / (data.length - 1);
    
    data.forEach((point, i) => {
      const x = padding + i * step;
      ctx.fillText(point.month, x, height - padding + 15);
    });
    
    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    
    // Create gradient for area
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    // Calculate points
    const points = data.map((point, i) => {
      const x = padding + i * step;
      const y = height - padding - (point.amount / maxAmount) * chartHeight;
      return { x, y };
    });
    
    // Draw the smooth curve
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    
    ctx.quadraticCurveTo(
      points[points.length - 2].x, 
      points[points.length - 2].y, 
      points[points.length - 1].x, 
      points[points.length - 1].y
    );
    
    ctx.stroke();
    
    // Fill area under the curve
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.lineTo(points[0].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw data points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
  }, [data]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={300} 
        className="w-full h-auto"
      ></canvas>
    </div>
  );
};

export default ExpensesLineChart;