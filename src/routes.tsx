import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdOutlineCompareArrows,
  MdOutlineAllInbox,
  MdNotifications,
  MdEvent,
  MdSettings
} from 'react-icons/md';

const routes = [
  {
    name: 'Home',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  {
    name: 'Packages',
    layout: '/admin',
    icon: <MdOutlineAllInbox className="h-6 w-6" />,
    path: 'packages',
    // items: [{
    //   name: 'Add Package',
    //   layout: '/admin',
    //   icon: <MdOutlineAllInbox className="h-6 w-6" />,
    //   path: 'add',
    // }]
  },
  {
    name: 'Transactions',
    layout: '/admin',
    icon: <MdOutlineCompareArrows className="h-6 w-6" />,
    path: 'transactions',
  },

  {
    name: 'Users',
    layout: '/admin',
    path: 'users',
    icon: <MdPerson className="h-6 w-6" />,
  },


  {
    name: 'Events',
    layout: '/admin',
    path: 'events',
    icon: <MdEvent className="h-6 w-6" />,
  },

  {
    name: 'Web Pages',
    layout: '/admin',
    path: 'web-pages',
    icon: <AiOutlineFileText className="h-6 w-6" />,
  },

  {
    name: 'Send Notification',
    layout: '/admin',
    path: 'send-notifications',
    icon: <MdNotifications className="h-6 w-6" />,
  },

  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdSettings className="h-6 w-6" />,
  },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
];
export default routes;
