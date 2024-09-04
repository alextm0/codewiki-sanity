"use client";
import Image from "next/image";
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

import DashboardIcon from "@/public/assets/navbar-icons/dashboard.svg";
import BookmarkIcon from "@/public/assets/navbar-icons/bookmark.svg";
import ProblemIcon from "@/public/assets/navbar-icons/problems.svg";
import ContactIcon from "@/public/assets/navbar-icons/contact.svg";

import IncepatorIcon from "@/public/assets/dropdown-icons/incepator.svg";
import IntermediarIcon from "@/public/assets/dropdown-icons/intermediar.svg";
import AvansatIcon from "@/public/assets/dropdown-icons/avansat.svg";

import IncepatorIconWhite from "@/public/assets/dropdown-icons/incepator-white.svg";
import IntermediarIconWhite from "@/public/assets/dropdown-icons/intermediar-white.svg";
import AvansatIconWhite from "@/public/assets/dropdown-icons/avansat-white.svg";

const navigation = [
  { 
    name: "Articole", 
    href: "/articole",
    icon: (
      <Image
        src={BookmarkIcon}
        width={24}
        height={24}
        alt="Articole Icon"
      />
    ),
    current: false 
  },
  {
    name: "Incepator",
    href: "/olimpiada/incepator",
    icon: (
      <Image
        src={IncepatorIconWhite}
        width={24}
        height={24}
        alt="Incepator Icon"
      />
    ),
    current: false,
  },
  {
    name: "Intermediar",
    href: "/olimpiada/intermediar",
    icon: (
      <Image
        src={IntermediarIconWhite}
        width={24}
        height={24}
        alt="Intermediar Icon"
      />
    ),
    current: false,
  },
  {
    name: "Avansat",
    href: "/olimpiada/avansat",
    icon: (
      <Image src={AvansatIconWhite} width={24} height={24} alt="Avansat Icon" />
    ),
    current: false,
  },
  { name: "Probleme", href: "/probleme", current: false, icon: (
    <Image
      src={ProblemIcon}
      width={24}
      height={24}
      alt="Probleme Icon"
    />
  )
  },
  { 
    name: "Contact", 
    href: "/contact",
    icon: (
      <Image
        src={ContactIcon}
        width={24}
        height={24}
        alt="Contact Icon"
      />
    ),
    current: false
  },
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
                    <div className="relative after:absolute after:bg-primary-200 mt-2 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500">
                      <Link href="/articole">
                        <div className="font-medium text-text-50 hover:text-primary-100 flex items-center gap-2">
                          <Image
                            src={BookmarkIcon}
                            className=""
                            alt="bookmark-icon"
                            width={20}
                            height={20}
                          />
                          Articole
                        </div>
                      </Link>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="font-poppins relative after:absolute after:bg-primary-200 mt-2 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500 cursor-pointer">
                      <Dropdown>
                        <DropdownTrigger>
                          <div className="font-medium text-text-50 flex items-center gap-2 cursor-pointer hover:text-primary-100 transition-colors duration-300">
                            <Image
                              src={DashboardIcon}
                              className=""
                              alt="dashboard-icon"
                              width={20}
                              height={20}
                            />
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
                            <div className="font-poppins font-medium flex gap-4 text-text-700 items-center">
                              <Image src={IncepatorIcon} className="text-text-700" alt="Incepator Icon" width={20} height={20} /> Incepator
                            </div>
                          </DropdownItem>
                          <DropdownItem
                            key="olimpiada-intermediar"
                            as={Link}
                            href="/olimpiada/intermediar"
                            className="px-3 py-2 hover:bg-primary-50 rounded-md"
                          >
                            <div className="font-poppins font-medium flex gap-4 text-text-700 items-center">
                              <Image src={IntermediarIcon} className="text-text-700" alt="Intermediar Icon" width={20} height={20} /> Intermediar
                            </div>
                          </DropdownItem>
                          <DropdownItem
                            key="olimpiada-avansat"
                            as={Link}
                            href="/olimpiada/avansat"
                            className="px-3 py-2 hover:bg-primary-50 rounded-md"
                          >
                            <div className="font-poppins font-medium flex gap-4 text-text-700 items-center">
                              <Image src={AvansatIcon} className="text-text-700" alt="Avansat Icon" width={20} height={20} /> Avansat
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* Navigation link */}
                    <div className="relative after:absolute after:bg-primary-200 mt-2 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500">
                      <Link href="/probleme">
                        <div className="text-base font-medium text-text-50 hover:text-primary-100 flex items-center gap-2">
                          <Image
                            src={ProblemIcon}
                            className=""
                            alt="problem-icon"
                            width={20}
                            height={20}
                          />
                          Probleme
                        </div>
                      </Link>
                    </div>
                  </nav>
                </div>

                {/* Enhanced Button on the Right */}
                <div className="hidden md:flex md:gap-2 items-center justify-end">
                  <Link href="/contact">
                    <button className="bg-gradient-to-r from-primary-100 to-primary-100 text-text-900 font-poppins text-[16px] px-4 py-2 rounded-lg hover:shadow-lg transition-transform duration-300 hover:scale-105 flex items-center gap-2">
                      {/* <Image
                        src={ContactIcon}
                        width={20}
                        height={20}
                        alt="mail-icon"
                      /> */}
                      Contact
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
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
                    <div className="flex items-center gap-4">
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