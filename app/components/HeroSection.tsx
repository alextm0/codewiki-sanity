import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="leading-normal tracking-normal">
      <div className="pt-8 md:pl-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="font-righteous my-4 text-[46px] leading-tight font-bold text-text-50">
              Pregătește-te pentru olimpiada de Informatică !
            </h1>
            <p className="font-poppins leading-normal text-lg md:text-base mb-8 text-text-500">
            Accesează ghiduri detaliate, articole explicative și exemple de probleme rezolvate, toate organizate pe niveluri de dificultate.
            </p>
            <Link
              href="/courses"
              className="bg-gradient-to-r from-secondary-500 to-secondary-600 dark:from-accent-400 dark:to-accent-500 font-poppins mx-auto lg:mx-0 inline-flex font-bold px-8 py-3 my-8 text-base text-background-50 dark:text-background-900 transition transform duration-300 ease-in-out rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:bg-secondary-600 focus:outline-none focus:ring focus:ring-secondary-300"
            >
              Descoperă resursele
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <Image
              src="/assets/Dark_HeroImage.svg"
              alt="heroimage"
              width={500}
              height={500}
              className="w-full md:w-3/5 ml-auto mr-auto mb-10 sm:mb-20 z-50"
              loading="lazy" // Already implemented
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw" // Add responsive sizes
            />
          </div>
        </div>
      </div>
    </div>
  );
}
