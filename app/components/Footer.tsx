import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import PageDivider from "@/app/components/PageDivider"; // Adjust the import path as necessary

function Footer() {
  return (
    <footer className="relative bg-[#00044D] text-text-300">
      {/* Reversed PageDivider */}
      <div className="rotate-180 pt-20">
        <PageDivider />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl pt-12 pb-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-text-100 mb-4">
              CodeWiki
            </h2>
            <p className="text-text-400 text-sm mb-6">
              Resursa excelentă pentru a învăța programare și a te pregăti
              pentru olimpiada si concursurile de informatică.
            </p>
          </div>

          {/* Footer Links */}
          <div>
            <h2 className="text-xl font-semibold text-text-100 mb-4">
              Legături utile
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="relative after:absolute after:bg-primary-200 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500 hover:text-primary-300 transition-colors duration-300 ease-in-out"
                >
                  Despre noi
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="relative after:absolute after:bg-primary-200 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500 hover:text-primary-300 transition-colors duration-300 ease-in-out"
                >
                  Cursuri
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="relative after:absolute after:bg-primary-200 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500 hover:text-primary-300 transition-colors duration-300 ease-in-out"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="relative after:absolute after:bg-primary-200 after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500 hover:text-primary-300 transition-colors duration-300 ease-in-out"
                >
                  Politica de confidențialitate
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="text-center md:text-right">
            <h2 className="text-xl font-semibold text-text-100 mb-4">
              Social Media
            </h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors duration-300 ease-in-out"
              >
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors duration-300 ease-in-out"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors duration-300 ease-in-out"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors duration-300 ease-in-out"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-background-700 mt-8 pt-6 text-center text-sm text-text-500">
          <p>
            &copy; {new Date().getFullYear()} CodeWiki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
