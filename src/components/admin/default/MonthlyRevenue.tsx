import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
  MdArrowDropDown,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";

const MonthlyRevenue = (props) => {
  // console.log('props', props?.chartData?.chartData?.map(data => data?.revenue));
  const dynamicChartOptions = { ...lineChartOptionsTotalSpent, xaxis: { ...lineChartOptionsTotalSpent?.xaxis, categories: props?.chartData?.chartData?.map(data => data?.monthName) } }
  const dynamicChartData = props?.chartData?.chartData?.map(data => data?.revenue)

  // console.log('dynamicChartOptions', dynamicChartOptions);
  // console.log('dynamicChartData', dynamicChartData);

  const actualChartData = [{
    name: 'Revenue',
    data: dynamicChartData,
    color: '#4318FF',
  }]

  // console.log('actualChartData', actualChartData);

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {props?.chartData?.currentMonthRevenue || 0}
            <span className="text-base font-normal text-gray-600 ml-1">SAR</span>
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Growth</p>
            <div className="flex flex-row items-center justify-center">
              {props?.chartData?.growthRate >= 0 ? (
                <MdArrowDropUp className="font-medium text-green-500" />
              ) : (
                <MdArrowDropDown className="font-medium text-red-500" />
              )}
              <p className={props?.chartData?.growthRate >= 0 ? "text-sm font-bold text-green-500" : "text-sm font-bold text-red-500"}> {props?.chartData?.growthRate || 0}% </p>
            </div>
          </div>
        </div>

        <div className="h-full w-full">
          <LineChart
            chartOptions={dynamicChartOptions || lineChartOptionsTotalSpent}
            chartData={actualChartData || lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default MonthlyRevenue;
