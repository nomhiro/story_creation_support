'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavItemProps {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ label, link, icon }) => {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={`flex p-4 items-center w-full hover:bg-blue-400 font-medium ${
        pathname === link ? 'bg-gray-400 border-r-4 border-r-green-500' : ''
      }`}
    >
      <div className="mr-3">{icon}</div>
      <div>{label}</div>
    </Link>
  );
};

export default NavItem;
