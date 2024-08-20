import React from "react";
import Image from "next/image";
import { Link } from 'next-view-transitions';

import BeginnerIcon from "@/public/assets/admitere-icon.svg";
import IntermediateIcon from "@/public/assets/bacalaureat-icon.svg";
import AdvancedIcon from "@/public/assets/olimpiada-icon.svg";

function OlimpiadaCategories() {
  return (
    <div className="font-poppins container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
      <div className="max-w-xl mx-auto text-center mt-24">
        <h1 className="font-bold text-darken my-3 text-2xl dark:text-white">
          <span className="text-[#FF725E]">Pregătește-te pentru Olimpiadă</span>
        </h1>
        <p className="leading-relaxed text-gray-500 dark:text-white">
          Selectează nivelul tău de pregătire și începe să înveți conform nevoilor tale!
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
        
        {/* Beginner Card */}
        <Link href="/olimpiada/incepator" passHref>
          <div
            data-aos="fade-up"
            className="cursor-pointer bg-white p-6 text-center rounded-xl shadow-xl hover:shadow-2xl hover:shadow-orange-100 transition-shadow duration-300"
          >
            <div className="bg-[#FF725E] rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
              <Image src={BeginnerIcon} alt="Beginner Level Icon" className="w-8 h-8" />
            </div>
            <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
              Începător
            </h1>
            <p className="px-4 text-gray-500">
              Învață conceptele fundamentale ale programării și pregătește-te pentru primele tale competiții.
            </p>
          </div>
        </Link>
        
        {/* Intermediate Card */}
        <Link href="/olimpiada/intermediar" passHref>
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="cursor-pointer bg-white p-6 text-center rounded-xl shadow-xl hover:shadow-2xl hover:shadow-orange-100 transition-shadow duration-300"
          >
            <div className="bg-[#FF725E] rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
              <Image src={IntermediateIcon} alt="Intermediate Level Icon" className="w-8 h-8" />
            </div>
            <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
              Intermediar
            </h1>
            <p className="px-4 text-gray-500">
              Aprofundează cunoștințele tale și explorează algoritmi și structuri de date mai complexe.
            </p>
          </div>
        </Link>

        {/* Advanced Card */}
        <Link href="/olimpiada/avansat" passHref>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="cursor-pointer bg-white p-6 text-center rounded-xl shadow-xl hover:shadow-2xl hover:shadow-orange-100 transition-shadow duration-300"
          >
            <div className="bg-[#FF725E] rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12">
              <Image src={AdvancedIcon} alt="Advanced Level Icon" className="w-8 h-8" />
            </div>
            <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
              Avansat
            </h1>
            <p className="px-4 text-gray-500">
              Pregătește-te pentru cele mai dificile competiții cu subiecte avansate și provocări complexe.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default OlimpiadaCategories;
