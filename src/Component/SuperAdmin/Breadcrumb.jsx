import React from "react";

// eg:
// const breadcrumbItems = [
//   { text: "Devices", link: "/devices" },
//   { text: "Device Details" },
// ];

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400 mx-2">&gt;</span>}
          <span
            className={`${
              index === items.length - 1
                ? "text-gray-500 cursor-default"
                : "text-gray-800 hover:text-gray-600 cursor-pointer"
            }`}
          >
            {item.link && index !== items.length - 1 ? (
              <a href={item.link} className="hover:underline">
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
