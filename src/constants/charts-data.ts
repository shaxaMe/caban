import type LineChartData from "@/types/chart";
import type ColumnChartData from "@/types/chart";

export const lineChartData: LineChartData[] = [
    {
        name: "Desktop",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
        name: "Mobile",
        data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
    },
];

export const pieData: number[] = [44, 55, 41, 17, 15];

export const columnData:ColumnChartData[] = [
    {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
]