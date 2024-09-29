"use client"
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SideMenu from '../../components/SideMenu/SideMenu';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(true);

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  const hideSideMenu = () => {
    if (isSideMenuVisible) {
      setIsSideMenuVisible(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="absolute top-0 left-0 p-2">
        <button onClick={toggleSideMenu} className="text-2xl">
          {isSideMenuVisible ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isSideMenuVisible && <SideMenu />}
      <main className="bg-slate-50 flex-1 overflow-auto" onClick={hideSideMenu}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;