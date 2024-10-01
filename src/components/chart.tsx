// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // Adapter for date handling in the time scale of Chart.js

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  ScaleChartOptions,
  LineControllerChartOptions,
  DatasetChartOptions,
  PluginChartOptions,
  ElementChartOptions,
  CoreChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns"; // For handling date strings in x-axis
import { _DeepPartialObject } from "chart.js/dist/types/utils";

// Register the required components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({
  data = [
    {
      y: 43,
      x: "2024-01-01",
    },
    {
      y: 25,
      x: "2024-01-02",
    },
    {
      y: 64,
      x: "2024-01-03",
    },
  ],
}: any) => {
  // Prepare the chart data in the required format
  const chartData = {
    datasets: [
      {
        label: "My Dataset",
        data: data, // Accepts data in the form of [{x: number, y: date string}]
        borderColor: "white",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        fill: true, // Fill below the line
        pointRadius: 0, // No points on the line
        tension: 0.4, // Optional: makes the line smoother
      },
    ],
  };

  // Chart options
  const options: _DeepPartialObject<
    CoreChartOptions<"line"> &
      ElementChartOptions<"line"> &
      PluginChartOptions<"line"> &
      DatasetChartOptions<"line"> &
      ScaleChartOptions<"line"> &
      LineControllerChartOptions
  > = {
    layout: {
      padding: {
        left: -10,
        bottom: -10,
        right: -10,
        top: -10,
      },
    },
    scales: {
      x: {
        type: "time", // This tells Chart.js to use time-based x-axis
        time: {
          unit: "day", // Adjust this based on how you want the x-axis labeled (e.g., day, month)
        },
        ticks: {
          color: "transparent", // X-axis label color
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        // beginAtZero: true,
        ticks: {
          color: "white", // Y-axis label color
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend if not needed
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Styles for chart's background
  const chartStyle: any = {
    position: "relative",
    width: "100%",
    height: "200px", // Adjust height as needed
  };

  return (
    <div style={chartStyle}>
      <Line data={chartData} options={options as any} />
    </div>
  );
};

export { LineChart as Chart };
