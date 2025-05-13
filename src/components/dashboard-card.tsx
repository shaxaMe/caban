import ReactApexChart from "react-apexcharts";
import { lineChartData, pieData, columnData } from "@/constants/charts-data";
import { useState } from "react";
import type LineChartData from "@/types/chart";
import type ColumnChartData from "@/types/chart";
interface Iseries{
    lineChartData:LineChartData[],
    columnData:ColumnChartData[],
    pieData:number[]
}
function DashboardCard() {
  const [chartsData, setChartsData] = useState<Iseries>({
    lineChartData: lineChartData,
    columnData: columnData,
    pieData: pieData,
  });

  function updateChartSeries() {
    setChartsData((prev) => {
      return {
        ...prev,
        lineChartData: [
          {
            name: "Desktop",
            data: [20, 30, 23, 323, 39, 22, 39, 21, 18],
          },
          {
            name: "Mobile",
            data: [132, 24,33, 56, 77, 38, 99, 77, 45],
          },
        ],
        pieData: [43,35,321, 37, 35],
      };
    });
  }
  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const lineOptions = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const pieOptions = {
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <button
          className="bg-slate-300 text-gray-800 py-2 px-4 rounded-md"
          onClick={updateChartSeries}>
          Update
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-slate-50">
          <ReactApexChart
            options={lineOptions}
            series={chartsData.lineChartData}
            type="line"
            height={300}
          />
        </div>
        <div className="bg-slate-50">
          <ReactApexChart options={options} series={chartsData.columnData} type="bar" height={300} />
        </div>
        <div className="bg-slate-50">
          <ReactApexChart
            options={pieOptions}
            series={chartsData.pieData}
            type="donut"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
