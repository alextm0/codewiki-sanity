import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="leading-normal tracking-normal text-gray-900">
      <div className="pt-16 md:pl-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="font-righteous my-4 text-5xl leading-tight font-bold text-white">
              Învaţă, experimentează şi crează în informatică
            </h1>
            <p className="font-poppins leading-normal text-xl mb-8 text-gray-500">
              Explorează universul informaticii și începe-ți călătoria cu cele
              mai bune resurse de învățare online
            </p>
            <Link
              href="/courses"
              className="bg-red-500 font-quicksand mx-auto lg:mx-0 inline-flex font-bold px-8 py-3 my-8 text-sm text-white transition rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
            >
              Incepe aici
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            {/* Dynamically switch image based on theme */}
            <Image
              src={'/assets/Dark_HeroImage.svg'}
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
