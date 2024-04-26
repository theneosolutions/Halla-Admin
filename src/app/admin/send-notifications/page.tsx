'use client';
import NotificationForm from 'components/admin/send-notifications/SendNotifications';

const SendNotificationPage = () => {
  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
        <NotificationForm />
      </div>

    </div>
  );
};

export default SendNotificationPage;
