import {
  MdDashboard,
  MdPerson,
  MdPeople,
  MdDevices,
  MdSensors,
  MdSpeed,
  MdSettings,
  MdHeadset,
} from "react-icons/md";

export const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    isActive: true,
    hasDropdown: false,
  },
  {
    id: "site-admin",
    label: "Site Admin",
    icon: MdPerson,
  },
  {
    id: "users",
    label: "Users",
    icon: MdPeople,
  },
  {
    id: "assets",
    label: "Assets",
    icon: MdDevices,
    isActive: true,
    hasDropdown: true,
    children: [
      {
        id: "device-details",
        label: "Device Details",
        icon: MdDevices,
      },
      {
        id: "sensors",
        label: "Sensors",
        icon: MdSensors,
        badge: 2,
      },
      {
        id: "threshold-value",
        label: "Threshold Value",
        icon: MdSpeed,
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: MdSettings,
  },
  {
    id: "support",
    label: "Support",
    icon: MdHeadset,
  },
];
