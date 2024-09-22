import React from "react";
import Image from "next/image";

// Import the icons from the updated paths
import CodeImg from "@/public/assets/feature-illustration.svg";
import UpdatedIcon from "@/public/assets/features-icons/updated.svg";
import QualityIcon from "@/public/assets/features-icons/quality.svg";
import SupportIcon from "@/public/assets/features-icons/feedback.svg";

function Features() {
  return (
    <>
      <div className="md:flex my-16 md:space-x-10 items-center font-inter">
        <div
          data-aos="fade-right"
          data-aos-delay="300"
          className="md:w-7/12 relative"
        >
          <Image
            className="w-[750px] h-full relative z-50 floating ml-auto mr-auto my-44"
            src={CodeImg}
            alt="codeimg"
            width={750}
            height={0} // Set height to 0 to maintain aspect ratio automatically
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-delay="350"
          className="sm:max-w-[500px] md:w-3/12 -mt-20 mb-40 sm:mt-20 sm:mb-0 ml-6 md:ml-0 md:mt-0 text-text-900 dark:text-text-100"
        >
          {/* Parent container made flex and gap added */}
          <div className="flex flex-col gap-10">
            {/* First Feature */}
            <div className="flex items-center space-x-5 pr-8 md:pr-0">
              <div className="flex-shrink bg-background-50 dark:bg-background-800 shadow-md rounded-full p-3 flex items-center justify-center">
                <Image
                  src={UpdatedIcon}
                  alt="Updated Icon"
                  width={70} // Set width explicitly
                  height={70} // Set height explicitly
                />
              </div>
              <p className="text-text-600 dark:text-text-300">
                <span className="text-secondary-500 font-bold text-lg">
                  Conținut relevant și actualizat
                </span>
                <br />
                <span className="text-text-600 text-[14px]">
                  Lucrăm constant la actualizarea articolelor și lecțiilor,
                  asigurându-ne că ai acces la cele mai noi strategii și tehnici
                  pentru competițiile de informatică.
                </span>
              </p>
            </div>

            {/* Second Feature */}
            <div className="flex items-center space-x-5 pr-8 md:pr-0">
              <div className="flex-shrink bg-background-50 dark:bg-background-800 shadow-lg rounded-full p-3 flex items-center justify-center">
                <Image
                  src={QualityIcon}
                  alt="Quality Icon"
                  width={80} // Set width explicitly
                  height={80} // Set height explicitly
                />
              </div>
              <p className="text-text-600 dark:text-text-300">
                <span className="text-secondary-500 font-bold text-lg">
                  Calitatea conținutului
                </span>
                <br />
                <span className="text-text-600 text-[14px]">
                  Toate materialele sunt realizate de fosti olimpici și sunt
                  testate riguros. Vei învăța cu lecții clare și exemple practice
                  care te vor ajuta să înțelegi conceptele complexe.
                </span>
              </p>
            </div>

            {/* Third Feature */}
            <div className="flex items-center space-x-5 pr-8 md:pr-0">
              <div className="flex-shrink bg-background-50 dark:bg-background-800 shadow-md rounded-full p-3 flex items-center justify-center">
                <Image
                  src={SupportIcon}
                  alt="Support Icon"
                  width={64} // Set width explicitly
                  height={64} // Set height explicitly
                />
              </div>
              <p className="text-text-600 dark:text-text-300">
                <span className="text-secondary-500 font-bold text-lg">
                  Feedback și suport
                </span>
                <br />
                <span className="text-text-600 text-[14px]">
                  Nu ești singur! Oferim suport dedicat și feedback personalizat
                  pentru soluțiile tale, astfel încât să îți îmbunătățești
                  continuu performanța.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
