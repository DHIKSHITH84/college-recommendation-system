import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export function ProbabilityChart({ recommendations }) {
  const top10 = recommendations.slice(0, 10);

  const data = {
    labels: top10.map(r => r.college_code),
    datasets: [{
      label: 'Admission Probability (%)',
      data: top10.map(r => r.probability_score),
      backgroundColor: top10.map(r =>
        r.probability_score >= 70 ? '#10b981'
          : r.probability_score >= 40 ? '#f59e0b' : '#8b5cf6'
      ),
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Top 10 Colleges - Admission Probability', font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true, max: 100, title: { display: true, text: 'Probability (%)' } },
    },
  };

  return <Bar data={data} options={options} />;
}

export function ClassificationChart({ safe, target, dream }) {
  const data = {
    labels: ['Safe Colleges', 'Target Colleges', 'Dream Colleges'],
    datasets: [{
      data: [safe.length, target.length, dream.length],
      backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6'],
      borderWidth: 0,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'College Classification Distribution', font: { size: 16 } },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export function CompareChart({ colleges }) {
  const data = {
    labels: colleges.map(c => c.college_code),
    datasets: [
      {
        label: 'Cutoff Rank',
        data: colleges.map(c => c.cutoff_rank),
        backgroundColor: '#2563eb',
        borderRadius: 4,
      },
      {
        label: 'Fee (₹ thousands)',
        data: colleges.map(c => c.fee_per_year / 1000),
        backgroundColor: '#7c3aed',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'College Comparison', font: { size: 16 } },
    },
  };

  return <Bar data={data} options={options} />;
}
