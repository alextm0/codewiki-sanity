"use client"

import Link from "next/link";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div className="flex items-center gap-3">
                <span className="font-righteous text-3xl text-slate-800 dark:text-white">
                  CodeWiki
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - centered */}
          <div className="hidden md:flex flex-grow items-center justify-center">
            <nav className="flex space-x-10">
              {/* Navigation links */}
              <div className="relative after:absolute after:bg-gray-600 dark:after:bg-gray-400 mt-2 after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                <Link href="/articles">
                  <div className="text-base font-medium text-gray-800 dark:text-gray-200 light:hover:text-gray-600 dark:hover:text-gray-400">
                    Articole
                  </div>
                </Link>
              </div>

              {/* Dropdown Menu */}
              <div className="relative after:absolute after:bg-gray-600 dark:after:bg-gray-400 mt-2 after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 cursor-pointer">
                <div className="font-medium text-gray-800 dark:text-gray-200 light:hover:text-gray-600 dark:hover:text-gray-400 flex justify-center items-center gap-1 cursor-pointer">
                  <Dropdown
                    classNames={{
                      content:
                        "p-4 rounded-md font-medium font-poppins bg-[#1F2937]",
                    }}
                  >
                    <DropdownTrigger>
                      <div className="flex items-center">
                        Categorii
                        <MdOutlineArrowDropDown />
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key="olimpiada"
                        as={Link}
                        href="/olimpiada"
                        className="no-border"
                      >
                        <div className="flex gap-2 my-2">
                          <RiMedal2Fill /> Olimpiada
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        key="admitere"
                        as={Link}
                        href="/admitere"
                        className="no-border"
                      >
                        <div className="flex gap-2 my-2">
                          <FaUserGraduate /> Admitere
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        key="bacalaureat"
                        as={Link}
                        href="/bacalaureat"
                        className="no-border"
                      >
                        <div className="flex gap-2 my-2">
                          <IoSchoolSharp /> Bacalaureat
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {/* Navigation link */}
              <div className="relative after:absolute after:bg-gray-600 dark:after:bg-gray-400  mt-2 after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                <Link href="/problems">
                  <div className="text-base font-medium text-gray-800 dark:text-gray-200 light:hover:text-gray-600 dark:hover:text-gray-400">
                    Probleme
                  </div>
                </Link>
              </div>
            </nav>
          </div>

          {/* Theme Toggle - right-aligned */}
          <div className="flex gap-2 justify-end lg:w-0 lg:flex-1">
            <button>
              <ThemeSwitcher />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
