'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import TaskCard from 'components/admin/default/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import { useEffect, useState } from 'react';
import MonthlyRevenue from 'components/admin/default/MonthlyRevenue';
import UsersTable from 'components/admin/users/UsersTable';
import EventsTable from 'components/admin/events/EventsTable';

type RowObj = {
  totalUsers: number;
  activeUsers: number;
  disabledUsers: number;
  totalRevenue: number;
  totalEvents: number;

};


const Dashboard = () => {
  const [cardData, setCardData] = useState<RowObj | {}>({});
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    // Fetch data from the API with pagination parameters
    fetch(`http://localhost:8000/api/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setCardData(data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Users'}
          subtitle={cardData?.totalUsers || 0}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Active Users'}
          subtitle={cardData?.activeUsers || 0}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Disabled Users'}
          subtitle={cardData?.disabledUsers || 0}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Total Revenue'}
          subtitle={'$' + (cardData?.totalRevenue || 0)}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Events'}
          subtitle={cardData?.totalEvents || 0}
        />
        {/* <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'Total Projects'}
          subtitle={'$2433'}
        /> */}
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        {/* <TotalSpent /> */}
        <MonthlyRevenue chartData={cardData?.revenueChartData} />
        {/* <WeeklyRevenue /> */}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        {/* <TotalSpent /> */}
        <UsersTable isHomePage={true} />
        {/* <MonthlyRevenue chartData={cardData?.revenueChartData} /> */}
        {/* <WeeklyRevenue /> */}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        {/* <TotalSpent /> */}
        <EventsTable isHomePage={true} />
        {/* <MonthlyRevenue chartData={cardData?.revenueChartData} /> */}
        {/* <WeeklyRevenue /> */}
      </div>


      {/* Tables & Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2"> */}
      {/* Check Table */}
      {/* <div>
          <CheckTable tableData={tableDataCheck} />
        </div> */}

      {/* Traffic chart & Pie Chart */}

      {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

      {/* Complex Table , Task & Calendar */}

      {/* <ComplexTable tableData={tableDataComplex} /> */}

      {/* Task chart & Calendar */}

      {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
