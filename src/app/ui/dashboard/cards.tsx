'use client';

import { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  InboxIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';


const iconMap = {
  users: UserGroupIcon,
  reports: InboxIcon,
  beaches: GlobeAltIcon,
  subscriptions: CurrencyDollarIcon,
};

export default function CardWrapper() {
  const [data, setData] = useState({
    numberOfUsers: 0,
    numberOfReports: 0,
    numberOfBeaches: 0,
    numberOfSubscriptions: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/cards');
      const result = await res.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      <Card title="Total Users" value={data.numberOfUsers} type="users" />
      <Card title="Total Reports" value={data.numberOfReports} type="reports" />
      <Card title="Number of Beaches" value={data.numberOfBeaches} type="beaches" />
      <Card title="Subscriptions (Paid)" value={data.numberOfSubscriptions} type="subscriptions" />
    </>
  );
}

function Card({ title, value, type }: { title: string; value: number; type: string }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}