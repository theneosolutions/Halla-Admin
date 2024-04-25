'use client';
import Banner from 'components/admin/profile/Banner';
import General from 'components/admin/profile/General';
import Notification from 'components/admin/profile/Notification';
import Project from 'components/admin/profile/Project';
import Storage from 'components/admin/profile/Storage';
import Upload from 'components/admin/profile/Upload';

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>

    </div>
  );
};

export default ProfileOverview;
