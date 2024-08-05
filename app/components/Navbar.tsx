"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaFileAlt, FaUserGraduate, FaQuestionCircle } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";
import ThemeSwitcher from "./ThemeSwitcher";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const navigation = [
  { name: "Articole", href: "/articles", current: false },
  {
    name: "Olimpiada",
    href: "/olimpiada",
    icon: <RiMedal2Fill />,
    current: false,
  },
  {
    name: "Admitere",
    href: "/admitere",
    icon: <FaUserGraduate />,
    current: false,
  },
  {
    name: "Bacalaureat",
    href: "/bacalaureat",
    icon: <IoSchoolSharp />,
    current: false,
  },
  { name: "Probleme", href: "/problems", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#00044D]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-center">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:justify-between sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <div className="flex items-center gap-3">
                      <span className="font-righteous text-3xl text-white">
                        CodeWiki
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Navigation Links - centered */}
                <div className="hidden md:flex flex-1 items-center justify-center font-poppins">
                  <nav className="flex space-x-10 mr-28">
                    {/* Navigation links */}
                    <div className="relative after:absolute after:bg-gray-600 dark:after:bg-gray-400 mt-2 after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                      <Link href="/articles">
                        <div className="font-medium text-gray-200 hover:text-gray-400">
                          Articole
                        </div>
                      </Link>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="font-poppins relative after:absolute after:bg-gray-600 dark:after:bg-gray-400 mt-2 after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 cursor-pointer">
                      <Dropdown
                        classNames={{
                          content:
                            "p-4 rounded-md font-medium bg-white shadow-lg",
                        }}
                      >
                        <DropdownTrigger>
                          <div className="font-medium text-gray-200 hover:text-gray-400 flex items-center gap-1 cursor-pointer">
                            Categorii
                            <MdOutlineArrowDropDown />
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            key="olimpiada"
                            as={Link}
                            href="/olimpiada"
                          >
                            <div className="font-poppins font-medium flex gap-2 mb-2 text-gray-600 hover:text-[#EC6351]">
                              <RiMedal2Fill /> Olimpiada
                            </div>
                          </DropdownItem>
                          <DropdownItem
                            key="admitere"
                            as={Link}
                            href="/admitere"
                          >
                            <div className="font-poppins font-medium flex gap-2 mb-2 text-gray-600 hover:text-[#EC6351]">
                              <FaUserGraduate /> Admitere
                            </div>
                          </DropdownItem>
                          <DropdownItem
                            key="bacalaureat"
                            as={Link}
                            href="/bacalaureat"
                          >
                            <div className="font-poppins font-medium flex gap-2 text-gray-600 hover:text-[#EC6351]">
                              <IoSchoolSharp /> Bacalaureat
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* Navigation link */}
                    <div className="relative after:absolute after:bg-gray-600 dark:after:bg-gray-400 mt-2 after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                      <Link href="/problems">
                        <div className="text-base font-medium text-gray-200 hover:text-gray-400">
                          Probleme
                        </div>
                      </Link>
                    </div>
                  </nav>
                </div>

                {/* Placeholder button to balance the layout */}
                {/* <div className="hidden md:flex items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.icon ? (
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.name}
                    </div>
                  ) : (
                    item.name
                  )}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
