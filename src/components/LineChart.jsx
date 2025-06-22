import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: true, // Subtle fill for professionalism
        backgroundColor: 'rgba(30, 58, 138, 0.2)', // Darker blue gradient
        borderColor: '#1E3A8A', // Professional dark blue
        borderWidth: 2,
        pointBackgroundColor: '#1E3A8A',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#1E90FF', // Lighter blue for hover
        pointHoverBorderColor: '#1E3A8A',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Lighter grid for professionalism
        },
        ticks: {
          color: 'var(--text-secondary, #666)',
        },
        backgroundColor: 'transparent',
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'var(--text-secondary, #666)',
        },
        backgroundColor: 'transparent',
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'var(--text-primary, #000)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darker tooltip
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#1E3A8A',
        borderWidth: 1,
      },
    },
  };

  return (
    <>
      <Row className="chart-header" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <Title level={2} className="chart-title" style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary, #000)' }}>
            {coinName} Price Chart
          </Title>
        </Col>
        <Col className="price-container" style={{ backgroundColor: 'rgba(245, 246, 245, 0.5)', padding: 'var(--space-sm)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-light)' }}>
          <Title
            level={5}
            className={`price-change ${coinHistory?.data?.change > 0 ? 'positive' : 'negative'}`}
            style={{ margin: 0, fontWeight: 700, color: coinHistory?.data?.change > 0 ? 'var(--positive, #16c784)' : 'var(--negative, #f44336)', fontStyle: 'italic' }}
          >
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price" style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary, #000)' }}>
            Current {coinName} Price: <span style={{ color: '#1E3A8A' }}>$ {currentPrice}</span>
          </Title>
        </Col>
      </Row>
      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;