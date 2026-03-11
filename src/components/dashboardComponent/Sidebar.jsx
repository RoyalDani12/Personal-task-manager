import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faTasks,
  faGauge,
  faFolder,
  faFlag,
  faUser,
  faBars,
  faNoteSticky
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    icon: faGauge,
    label: "Dashboard"
  },
  {
    icon: faTasks,
    label: "My Tasks"
  },
  {
    icon: faFolder,
    label: "Categories"
  },
  {
    icon: faFlag,
    label: "Priorities"
  },
  {
    icon: faNoteSticky,
    label: "Notes"
  },
  {
    icon: faGear,
    label: "Settings"
  }
];

const Sidebar = ({ UserName }) => {

  return (
    <div className="
      h-screen
      w-64
      bg-slate-900
      border-r border-slate-800
      flex
      flex-col
      justify-between
    ">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="
          flex
          items-center
          justify-between
          px-6
          py-6
          border-b
          border-slate-800
        ">

          <h1 className="text-white text-xl font-semibold tracking-wide">
            TaskFlow
          </h1>

          <FontAwesomeIcon
            icon={faBars}
            className="text-slate-400 cursor-pointer hover:text-white transition"
          />

        </div>


        {/* Menu */}
        <ul className="mt-6 space-y-2 px-3">

          {menuItems.map((item, index) => (
            <li
              key={index}
              className="
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-lg
                text-slate-400
                cursor-pointer
                transition-all
                duration-200
                hover:bg-slate-800
                hover:text-indigo-400
                hover:translate-x-1
              "
            >

              <FontAwesomeIcon icon={item.icon} />

              <span className="text-sm font-medium">
                {item.label}
              </span>

            </li>
          ))}

        </ul>

      </div>


      {/* User Profile */}
      <div className="
        border-t
        border-slate-800
        p-6
        flex
        items-center
        gap-4
      ">

        <div className="
          w-10
          h-10
          rounded-full
          bg-indigo-500
          flex
          items-center
          justify-center
          text-white
        ">
          <FontAwesomeIcon icon={faUser} />
        </div>

        <p className="text-slate-300 text-sm font-medium">
          {UserName?.toUpperCase()}
        </p>

      </div>

    </div>
  );
};

export default Sidebar;