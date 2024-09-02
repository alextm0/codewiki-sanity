"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const navigation = [
  { name: "Articole", href: "/articole", current: false },
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
  { name: "Probleme", href: "/probleme", current: false },
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
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-text-200 hover:bg-background-400 hover:text-text-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:justify-between sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <div className="flex items-center gap-3">
                      <span className="font-righteous text-3xl text-text-50">
                        CodeWiki
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Navigation Links - centered */}
                <div className="hidden md:flex flex-1 items-center justify-center font-poppins">
                  <nav className="flex space-x-10">
                    {/* Navigation links */}
                    <Link href="/articole">
                      <div className="relative font-medium text-text-50 hover:text-primary-100">
                        Articole
                      </div>
                    </Link>

                    {/* Dropdown Menu */}
                    <Dropdown>
                      <DropdownTrigger>
                        <div className="relative font-medium text-text-50 flex items-center gap-1 cursor-pointer hover:text-primary-100 transition-colors duration-300">
                          Olimpiada
                          <MdOutlineArrowDropDown />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu className="bg-text-50 shadow-lg rounded-lg py-4 px-4">
                        <DropdownItem
                          key="olimpiada-incepator"
                          as={Link}
                          href="/olimpiada/incepator"
                          className="px-3 py-2 hover:bg-primary-50 rounded-md hover:text-secondary-500"
                        >
                          <div className="font-poppins font-medium flex gap-2 text-text-700">
                            <RiMedal2Fill /> Incepator
                          </div>
                        </DropdownItem>
                        <DropdownItem
                          key="olimpiada-intermediar"
                          as={Link}
                          href="/olimpiada/intermediar"
                          className="px-3 py-2 hover:bg-primary-50 rounded-md"
                        >
                          <div className="font-poppins font-medium flex gap-2 text-text-700 ">
                            <FaUserGraduate /> Intermediar
                          </div>
                        </DropdownItem>
                        <DropdownItem
                          key="olimpiada-avansat"
                          as={Link}
                          href="/olimpiada/avansat"
                          className="px-3 py-2 hover:bg-primary-50 rounded-md"
                        >
                          <div className="font-poppins font-medium flex gap-2 text-text-700">
                            <IoSchoolSharp /> Avansat
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    {/* Navigation link */}
                    <Link href="/probleme">
                      <div className="relative text-base font-medium text-text-50 hover:text-primary-100">
                        Probleme
                      </div>
                    </Link>
                  </nav>
                </div>

                {/* Subtle Enhanced Button on the Right */}
                <div className="hidden md:flex items-center justify-end">
                  <Link href="/contact">
                    <button className="bg-primary-300 text-white px-5 py-2 rounded-md shadow-md hover:bg-primary-400 transition-all duration-200 transform hover:scale-105">
                      Contactează-ne
                    </button>
                  </Link>
                </div>
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
                      ? "bg-background-800 text-text-50"
                      : "text-text-200 hover:bg-background-600 hover:text-text-50",
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
