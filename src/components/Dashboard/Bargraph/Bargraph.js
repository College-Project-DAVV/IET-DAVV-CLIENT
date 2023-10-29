import React, { useEffect, useRef } from "react";
import "./Bargraph.scss";
import Chart from "chart.js/auto";

export default function Bargraph() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstance1 = useRef(null);
  const chartInstance2 = useRef(null);

  useEffect(() => {
    if (chartInstance1.current) {
      chartInstance1.current.destroy();
    }
    if (chartInstance2.current) {
      chartInstance2.current.destroy();
    }

    const myChartRef1 = chartRef1.current.getContext("2d");
    const myChartRef2 = chartRef2.current.getContext("2d");

    const barColors = [
      "rgba(116, 211, 247, 1)",
      "rgba(108, 116, 202, 1)",
      "rgba(116, 211, 247, 1)",
      "rgba(108, 116, 202, 1)",
      "rgba(116, 211, 247, 1)",
      "rgba(108, 116, 202, 1)",
    ];

  const branchWise = [260, 200, 195, 185, 150, 140];
  const yearWise = [120, 150, 100, 90, 80];

    chartInstance1.current = new Chart(myChartRef1, {
      type: "bar",
      data: {
        labels: ["CS", "IT", "E&TC", "E&I", "Mech", "Civil"],
        datasets: [
          {
            data: branchWise,
            backgroundColor: barColors,
            borderWidth: 0,
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    chartInstance2.current = new Chart(myChartRef2, {
      type: "bar",
      data: {
        labels: ["BE:PT", "BE:FT", "ME:PT", "ME:FT", "MSc"],
        datasets: [
          {
            data: yearWise,
            backgroundColor: barColors,
            borderWidth: 0,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstance1.current) {
        chartInstance1.current.destroy();
      }
      if (chartInstance2.current) {
        chartInstance2.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-row">
        <div className="chart">
          <h3 className="chart-heading">Branch Wise Distribution</h3>
          <canvas ref={chartRef1} />
        </div>
        <div className="chart">
          <h3 className="chart-heading">Degree Wise Distribution</h3>
          <canvas ref={chartRef2} />
        </div>
      </div>
    </div>
  );
}
