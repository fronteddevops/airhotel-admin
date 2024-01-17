import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactsIcon from '@mui/icons-material/Contacts';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PaymentsIcon from '@mui/icons-material/Payments';
import DiscountIcon from '@mui/icons-material/Discount';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import RoomIcon from '@mui/icons-material/Room';
export const items = [
  
  {
    title: 'Users',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Category',
    path: '/category',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  
  {
    title: 'Vendor',
    path: '/vendor',
    icon: (
      <SvgIcon fontSize="small">
         <ContactsIcon />
      </SvgIcon>
    )
  },
  
  {
    title: 'Hotel',
    path: '/hotel',
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalanceIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Subscription',
    path: '/subscription',
    icon: (
      <SvgIcon fontSize="small">
        <SubscriptionsIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Vendor Buy Subscription',
    path: '/vendorbuysubscription',
    icon: (
      <SvgIcon fontSize="small">
        <UnsubscribeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Support',
    path: '/support',
    icon: (
      <SvgIcon fontSize="small">
        <AssignmentIndIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Booking',
    path: '/booking',
    icon: (
      <SvgIcon fontSize="small">
        <MenuBookIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Ratings',
    path: '/ratings',
    icon: (
      <SvgIcon fontSize="small">
        <ReviewsIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: (
      <SvgIcon fontSize="small">
        <PaymentsIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Rooms',
    path: '/rooms',
    icon: (
      <SvgIcon fontSize="small">
        <RoomIcon />
      </SvgIcon>
    )
  },


  {
    title: 'Coupon',
    path: '/coupon',
    icon: (
      <SvgIcon fontSize="small">
        <DiscountIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logout',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
