import React from "react";
import { useLogout } from "../hooks/useLogout";
// import { useLogout } from "../../hooks/useLogout";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
const navigation = [
  { name: "Daily Quests", href: "/daily-quests" },
  { name: "My Resolutions", href: "/my-resolutions" },
  { name: "New Resolutions", href: "/new-resolutions" },
];
const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function NavbarTop() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleHomeClick = () => {
    navigate("/");
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Logo and Navigation */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <button onClick={handleHomeClick} className="ml-4">
                    <img
                      alt="Company Logo"
                      src="/src/assets/logo.png"
                      className="h-8 w-auto"
                    />
                  </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-indigo-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* Profile dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="font-semibold text-sm sm:text-base text-white flex justify-center my-1 ml-1 mr-2 select-none">
                        Welcome,{" "}
                        {user?.name
                          ? (() => {
                              const parts = user.name.trim().split(" ");
                              const firstName = parts[0] || "";
                              const lastNameInitial =
                                parts.length > 1
                                  ? parts[parts.length - 1][0]
                                  : "";
                              return firstName && lastNameInitial
                                ? `${firstName} ${lastNameInitial}`
                                : firstName || "User";
                            })()
                          : "User"}
                      </span>
                      <div className="flex items-center justify-center size-8 rounded-full bg-indigo-600 text-white font-medium">
                        {getInitials(user?.name)}
                      </div>
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </MenuItem> */}
                    {/* <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </MenuItem> */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
export default NavbarTop;
