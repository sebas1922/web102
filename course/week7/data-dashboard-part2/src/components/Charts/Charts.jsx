import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import style from './Charts.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ listings }) => {
  // Chart 1: Price Distribution
  const priceRanges = {
    'Under $1K': 0,
    '$1K - $2K': 0,
    '$2K - $3K': 0,
    '$3K - $4K': 0,
    '$4K+': 0
  };

  listings.forEach(listing => {
    const price = listing.price || 0;
    if (price < 1000) priceRanges['Under $1K']++;
    else if (price < 2000) priceRanges['$1K - $2K']++;
    else if (price < 3000) priceRanges['$2K - $3K']++;
    else if (price < 4000) priceRanges['$3K - $4K']++;
    else priceRanges['$4K+']++;
  });

  const priceChartData = {
    labels: Object.keys(priceRanges),
    datasets: [
      {
        label: 'Number of Listings',
        data: Object.values(priceRanges),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart 2: Bedrooms Distribution
  const bedroomCounts = {};
  listings.forEach(listing => {
    const bedrooms = listing.bedrooms || 0;
    const label = bedrooms === 0 ? 'Studio' : `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`;
    bedroomCounts[label] = (bedroomCounts[label] || 0) + 1;
  });

  const bedroomChartData = {
    labels: Object.keys(bedroomCounts),
    datasets: [
      {
        data: Object.values(bedroomCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className={style.chartsContainer}>
      <h2 className={style.chartsTitle}>Market Overview</h2>
      <div className={style.chartsGrid}>
        <div className={style.chartCard}>
          <h3>Price Distribution</h3>
          <Bar data={priceChartData} options={chartOptions} />
        </div>
        <div className={style.chartCard}>
          <h3>Bedroom Distribution</h3>
          <Doughnut data={bedroomChartData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts; 