import React, { useEffect, useRef } from "react";
import "./Bargraph.scss";
import Chart from "chart.js/auto";
import { useData } from "../../../DataContext";
export default function Bargraph() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstance1 = useRef(null);
  const chartInstance2 = useRef(null);
  const data = useData();
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
    const branchWise = [0, 0, 0, 0, 0, 0];
    const IndexMap = new Map();
    IndexMap.set("bcs", 0);
    IndexMap.set("bit", 1);
    IndexMap.set("etc", 2);
    IndexMap.set("bei", 3);
    IndexMap.set("bmc", 4);
    IndexMap.set("bcb", 5);
    /*Index --
   0->cs
   1-> it
   2->e&tc 
   3->e&i
   4->mech 
   5->civil*/
    /*Index--
   0->BE:PT
   1->BE:FT
   2->ME:PT
   3->ME:FT
   4:MSc
   */
    data &&
      Object.entries(
        data["All Students"]["Students"]["BE"]["Branches"]
      ).forEach(([key, value]) => {
        branchWise[IndexMap.get(key)] = value.length;
      });
    IndexMap.clear();
    const degreeWise = [120, 150, 100, 90, 80];

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
            data: degreeWise,
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
  }, [data]);

  return (
    <div className="chart-container">
      <div className="chart-row">
        <div className="chart">
          <p className="chart-heading">Branch Wise Distribution</p>
          <canvas ref={chartRef1} />
        </div>
        <div className="chart">
          <p className="chart-heading">Degree Wise Distribution</p>
          <canvas ref={chartRef2} />
        </div>
      </div>
    </div>
  );
}
