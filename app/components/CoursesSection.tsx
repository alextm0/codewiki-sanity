import Image from "next/image";
import { Link } from "next-view-transitions";

import BacalaureatIcon from "@/public/assets/bacalaureat-icon.svg";
import AdmitereIcon from "@/public/assets/admitere-icon.svg";
import OlimpiadaIcon from "@/public/assets/olimpiada-icon.svg";

function Courses() {
  return (
    <div className="font-poppins container px-4 lg:px-8 mx-auto max-w-screen-xl text-text-700 dark:text-text-300">
      <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-32">
        <h1 className="font-bold text-text-900 my-3 text-3xl md:text-4xl dark:text-text-100">
          <span className="bg-gradient-to-r from-secondary-500 to-secondary-700 text-transparent bg-clip-text">
            Investește în educația ta
          </span>
        </h1>
        <p className="font-inter leading-relaxed text-text-700 dark:text-text-400 mt-4">
          Alege metoda de învățare potrivită nevoilor și dorințelor tale!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-14 md:gap-10 mt-20">
        <div
          data-aos="fade-up"
          className="flex flex-col bg-white dark:bg-background-800 p-8 text-center rounded-xl border border-gray-200 dark:border-background-700 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
        >
          <div className="bg-background-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 group-hover:bg-gradient-to-r group-hover:from-primary-100 group-hover:to-primary-200 group-hover:text-white transition-colors duration-300">
            <Image src={AdmitereIcon} alt="Admitere Icon" className="w-8 h-8 invert" />
          </div>
          <h1 className="font-medium text-xl mb-4 lg:px-10 text-text-800 dark:text-text-100">
            Admitere
          </h1>
          <p className="font-inter flex-grow px-6 text-text-500 dark:text-text-400 mb-6">
            Indiferent de nivelul tău de pregătire, vei găsi materiale utile
            care să te ajute să te pregătești și să-ți maximizezi șansele de a
            obține un loc la o facultate de informatică.
          </p>
          <Link
            href="/admitere"
            className="mt-auto mx-auto bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium py-2 px-8 rounded-full transition-all duration-300 ease-in-out hover:from-secondary-600 hover:to-secondary-700 hover:shadow-lg"
          >
            Află mai multe
          </Link>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="flex flex-col bg-white dark:bg-background-800 p-8 text-center rounded-xl border border-gray-200 dark:border-background-700 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
        >
          <div className="bg-background-200 dark:bg-background-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 group-hover:bg-gradient-to-r group-hover:from-secondary-400 group-hover:to-secondary-600 group-hover:text-white transition-colors duration-300">
            <Image
              src={OlimpiadaIcon}
              alt="Olimpiada Icon"
              className="w-[36px] h-[36px] mt-[2px] invert"
            />
          </div>
          <h1 className="font-medium text-xl mb-4 lg:px-10 text-text-800 dark:text-text-100">
            Olimpiadă
          </h1>
          <p className="font-inter flex-grow px-6 text-text-500 dark:text-text-400 mb-6">
            Oferim o varietate de materiale de învățare, astfel încât să poți
            învăța în ritmul tău ca să te poți simți pregătit pentru a excela la
            competițiile de programare.
          </p>
          <Link
            href="/olimpiada"
            className="mt-6 mx-auto bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium py-2 px-8 rounded-full transition-all duration-300 ease-in-out hover:from-secondary-600 hover:to-secondary-700 hover:shadow-lg"
          >
            Află mai multe
          </Link>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col bg-white dark:bg-background-800 p-8 text-center rounded-xl border border-gray-200 dark:border-background-700 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
        >
          <div className="bg-background-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 group-hover:bg-gradient-to-r group-hover:from-primary-100 group-hover:to-primary-200 group-hover:text-white transition-colors duration-300">
            <Image
              src={BacalaureatIcon}
              alt="Bacalaureat Icon"
              className="ml-1 w-8 h-8 mt-[3px] invert"
            />
          </div>
          <h1 className="font-medium text-xl mb-4 lg:px-10 text-text-800 dark:text-text-100">
            Bacalaureat
          </h1>
          <p className="font-inter text-base flex-grow px-6 text-text-500 dark:text-text-400 mb-6">
            Poți beneficia de ghiduri studiu, subiecte din anii trecuți
            rezolvate complet, cu explicații detaliate și feedback personalizat
            la propriile soluții.
          </p>
          <Link
            href="/bacalaureat"
            className="mt-auto mx-auto bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium py-2 px-8 rounded-full transition-all duration-300 ease-in-out hover:from-secondary-600 hover:to-secondary-700 hover:shadow-lg"
          >
            Află mai multe
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Courses;
