import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function DoughnutChart({ chartData }) {
  const options = {
    plugins: {
      legend: {
        position: "left",
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };
  return <Doughnut data={chartData} options={options} />;
}
