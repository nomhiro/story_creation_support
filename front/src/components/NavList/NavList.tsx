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
      id: 1,
      label: '世界線を決める',
      link: '/world_line',
      icon: <BsRocketTakeoff className="size-5" />,
    },
    {
      id: 2,
      label: '登場人物を決める',
      link: '/characters',
      icon: <FaRocket className="size-5" />,
    },
    {
      id: 3,
      label: '出来事を決める',
      link: '/events',
      icon: <FaRocket className="size-5" />,
    },
    {
      id: 4,
      label: '物語を書く',
      link: '/story',
      icon: <FaRocket className="size-5" />,
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
