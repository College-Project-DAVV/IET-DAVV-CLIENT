import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const question1 = [
    "Prompt test results",
    "Adequate assignments",
    "Recommend teaching ?",
    "Recommend to others?",
    "Adequate syllabus?"
  ];
  
const YesNo = ({item}) => {

const [arr,setArr]=useState([])
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: question1,
      },
      yaxis: {
        title: {
          text: 'Rating Per Question'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val*100 + "% Yes"
          }
        }
      }
    }
  });
  useEffect(()=>{
    const subjects=item.subjects
    const data = [];
    for(let i =0;i<subjects.length;i++)
    {
        data.push({"name":subjects[i].title+" "+subjects[i].first_name+" "+subjects[i].last_name,
        "data":[
          (subjects[i].response.q11_count/subjects[i].response.total).toFixed(2),
          (subjects[i].response.q12_count/subjects[i].response.total).toFixed(2),
          (subjects[i].response.q13_count/subjects[i].response.total).toFixed(2),
        (subjects[i].response.q14_count/subjects[i].response.total).toFixed(2),
        (subjects[i].response.q15_count/subjects[i].response.total).toFixed(2),]

        })


    }
    setArr(data);

  },[])

  return (
    <div  style={{ width: "100%", maxWidth: "700px" }}>
      
        <ReactApexChart options={chartData.options} series={arr} type="bar" height={350} />
     
    </div>
  );
};

export default YesNo;
