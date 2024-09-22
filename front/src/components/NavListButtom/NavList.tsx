import React from 'react';
import { BsRocketTakeoff } from 'react-icons/bs';
import { FaRocket } from 'react-icons/fa';
import { FaDog } from 'react-icons/fa';
import NavItem from './NavItem';

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const NavList = () => {
  const navList: NavItemType[] = [
    {
      id: 5,
      label: 'Mobile Investigative Unit',
      link: '/miu',
      icon: <FaDog className="size-5" />,
    }
  ];
  return (
    <div className="mt-12">
      {navList.map((navItem) => {
        return (
          <NavItem
            label={navItem.label}
            link={navItem.link}
            icon={navItem.icon}
            key={navItem.id}
          />
        );
      })}
    </div>
  );
};

export default NavList;