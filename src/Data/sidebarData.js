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
    hasDropdown: false,

  },
  {
    id: "users",
    label: "Users",
    icon: MdPeople,
    hasDropdown: false,

  },
  {
    id: "assets",
    label: "Assets",
    icon: MdDevices,
    hasDropdown: true,
    children: [
      {
        id: "device-details",
        label: "Device Details",
        icon: MdDevices,
        isActive: false,
      },
      {
        id: "sensors",
        label: "Sensors",
        icon: MdSensors,
        isActive: false,

        badge: 2,
      },
      {
        id: "threshold-value",
        label: "Threshold Value",
        icon: MdSpeed,
        isActive: false,

      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: MdSettings,
    hasDropdown: false,
  },
  {
    id: "support",
    label: "Support",
    icon: MdHeadset,
    hasDropdown: false,
  },
];
