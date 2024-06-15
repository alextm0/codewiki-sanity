import React from "react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

import AdmitereIcon from "@/public/assets/admitere-icon.svg";
import BacalaureatIcon from "@/public/assets/bacalaureat-icon.svg";
import OlimpiadaIcon from "@/public/assets/olimpiada-icon.svg";

import PageDivider from "@/app/components/PageDivider";

function StartLearningPage() {
  return (
    <div className="bg-white font-poppins">
      <div className="bg-gradient-to-br from-[#00044D] to-[#00044D] mb-16">
        {/* Replace with your PageDivider component if it exists */}
        <PageDivider />
      </div>
      <div className="mb-20">
        <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
          <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-32">
            <div
              data-aos="fade-up"
              className="bg-white p-6 text-center rounded-xl shadow-xl hover:shadow-2xl hover:shadow-orange-100"
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                <Image src={AdmitereIcon} alt="Admitere Icon" className="w-8 h-8" />
              </div>
              <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
                Admitere
              </h1>
              <p className="px-4 text-gray-500 mb-10">
                Indiferent de nivelul tău de pregătire, vei găsi materiale utile
                care să te ajute să te pregătești și să-ți maximizezi șansele de
                a obține un loc la o facultate de informatică{" "}
              </p>
              {/* Features */}
              <div className="text-gray-600 flex justify-center items-center">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium ">
                      Intrarea la o facultate de specialitate
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">Pregătirea pentru viitor </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">Invățarea continuă</p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">Concentrare intensa</p>
                  </li>
                </ul>
              </div>
              <Link
                className="font-quicksand mx-auto lg:mx-0 inline-flex font-bold px-8 py-3 mt-20 my-8 text-sm text-white transition bg-orange-500 hover:bg-orange-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
                href="/admitere"
              >
                Incepe aici
                <BsArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="bg-white shadow-xl p-6 text-center rounded-xl hover:shadow-2xl hover:shadow-orange-100"
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                <Image
                  src={BacalaureatIcon}
                  alt="Bacalaureat Icon"
                  className=" w-8 h-8 mt-[3px] text-white"
                />
              </div>
              <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
                Bacalaureat
              </h1>
              <p className="px-4 text-gray-500 mb-10">
                Poți beneficia de ghiduri studiu, subiecte din anii trecuți
                rezolvate complet, cu explicații detaliate și feedback
                personalizat la propriile soluții{" "}
              </p>

              {/* Features */}
              <div className="text-gray-600 flex justify-center items-center">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium ">
                      Invatarea de noi tehnici de rezolvare
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      Imbunatatirea performantelor scolare
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {" "}
                      Gestionarea eficienta a timpului{" "}
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">Abilitatea de concentrare</p>
                  </li>
                </ul>
              </div>
              <Link
                className="font-quicksand mx-auto lg:mx-0 inline-flex font-bold px-8 py-3 mt-20 my-8 text-sm text-white transition bg-orange-500 hover:bg-orange-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
                href="/bacalaureat"
              >
                Incepe aici
                <BsArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white shadow-xl p-6 text-center rounded-xl hover:shadow-2xl hover:shadow-orange-100"
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
                <Image src={OlimpiadaIcon} alt="Olimpiada Icon" className="w-10 mt-[2px]" />
              </div>
              <h1 className="font-medium text-xl mb-2 lg:px-14 text-darken">
                Olimpiada
              </h1>
              <p className="px-4 text-gray-500 mb-10">
                Oferim o varietate de materiale de învățare, astfel încât să
                poți învăța în ritmul tău ca să te poți simți pregătit pentru a
                excela la competițiile de programare{" "}
              </p>
              {/* Features */}
              <div className="text-gray-600 flex justify-center items-center">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium ">
                      Rezolvarea de probleme de algoritmica
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      Algoritmi si structuri de date complexe
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      Gandire critica si rationament logic
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2">
                      <svg
                        className="w-4 h-4 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      Utilizarea abilitatilor matematica
                    </p>
                  </li>
                </ul>
              </div>
              <Link
                className="font-quicksand mx-auto lg:mx-0 inline-flex font-bold px-8 py-3 mt-20 my-8 text-sm text-white transition bg-orange-500 hover:bg-orange-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
                href="/olimpiada"
              >
                Incepe aici
                <BsArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartLearningPage;
