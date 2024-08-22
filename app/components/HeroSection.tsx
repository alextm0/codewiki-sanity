import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="leading-normal tracking-normal">
      <div className="pt-16 md:pl-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="font-righteous my-4 text-5xl leading-tight font-bold text-text-50">
              Învaţă, experimentează şi crează în informatică
            </h1>
            <p className="font-poppins leading-normal text-lg md:text-lg mb-8 text-text-400">
              Explorează universul informaticii și începe-ți călătoria cu cele
              mai bune resurse de învățare online
            </p>
            <Link
              href="/courses"
              className="bg-gradient-to-r from-secondary-500 to-secondary-700 dark:from-accent-400 dark:to-accent-500 font-poppins mx-auto lg:mx-0 inline-flex font-bold px-8 py-3 my-8 text-base text-background-50 dark:text-background-900 transition transform duration-300 ease-in-out rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:bg-secondary-600 focus:outline-none focus:ring focus:ring-secondary-300"
            >
              Începe aici
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <Image
              src={"/assets/Dark_HeroImage.svg"}
              alt="heroimage"
              width={500}
              height={500}
              className="w-full md:w-3/5 ml-auto mr-auto mb-10 sm:mb-20 z-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
