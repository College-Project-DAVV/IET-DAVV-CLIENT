import React, { useEffect, useRef } from "react";
import styles from "./Piechart.module.scss";
import Chart from "chart.js/auto";
import { useAllUsers } from "../../../DataContext";
export default function Piechart() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstance1 = useRef(null);
  const chartInstance2 = useRef(null);
  const data = useAllUsers();
  useEffect(() => {
    if (chartInstance1.current) {
      chartInstance1.current.destroy();
    }
    if (chartInstance2.current) {
      chartInstance2.current.destroy();
    }
    const myChartRef1 = chartRef1.current.getContext("2d");
    const myChartRef2 = chartRef2.current.getContext("2d");
    const pieColors = [
      "rgba(60, 67, 137, 1)",
      "rgba(108, 116, 202, 1)",
      "rgba(116, 211, 247, 1)",
      "rgba(178, 210, 234, 1)",
    ];
    
    const branchWise = [10, 20, 40, 15];
    const degreeWise = [120, 150, 100, 90];

    chartInstance1.current = new Chart(myChartRef1, {
      type: "pie", // Change to "pie" for pie chart
      data: {
        labels: ["CS", "IT", "E&TC", "E&I"],
        datasets: [
          {
            data: branchWise,
            backgroundColor: pieColors,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "left"
          },
          title: {
            display: false,
          },
        },
      },
    });

    chartInstance2.current = new Chart(myChartRef2, {
      type: "pie", // Change to "pie" for pie chart
      data: {
        labels: ["BE:PT", "BE:FT", "ME:PT", "ME:FT"],
        datasets: [
          {
            data: degreeWise,
            backgroundColor: pieColors,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "left",
          },
          title: {
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
  }, [data]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartRow}>
        <div className={styles.chart}>
         <p className={styles.chartHeading}>Branch Wise Distribution</p>
          <canvas ref={chartRef1} />
        </div>
        <div className={styles.chart}>
        <p className={styles.chartHeading}>Degree Wise Distribution</p>
          <canvas ref={chartRef2} />
        </div>
      </div>
    </div>
  );
}
