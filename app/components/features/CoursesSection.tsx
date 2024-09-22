import Image from "next/image";
import { Link } from "next-view-transitions";
import ButtonArrow from "@/public/assets/courses-icons/button-arrow.svg";
import IncepatorIcon from "@/public/assets/courses-icons/incepator.svg";
import IntermediarIcon from "@/public/assets/courses-icons/intermediar.svg";
import AvansatIcon from "@/public/assets/courses-icons/avansat.svg";

interface CourseCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, icon, link, gradientFrom, gradientTo, delay = 0 }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="flex flex-col bg-white dark:bg-background-800 p-8 text-center rounded-xl border border-gray-200 dark:border-background-700 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 group"
  >
    <div className={`bg-background-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 transition-transform duration-300 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-${gradientFrom} group-hover:to-${gradientTo}`}>
      <Image
        src={icon}
        alt={`${title} Icon`}
        width={32}
        height={32}
        className="transform scale-90 group-hover:scale-100 transition-transform duration-300"
      />
    </div>
    <h1 className="font-medium text-xl mb-4 lg:px-10 text-text-800 dark:text-text-100">
      {title}
    </h1>
    <p className="font-inter flex-grow px-6 text-text-500 dark:text-text-400 mb-6">
      {description}
    </p>
    <Link
      href={link}
      className="mt-auto mx-auto bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium py-2 px-8 rounded-full transition-all duration-300 ease-in-out hover:from-secondary-600 hover:to-secondary-700 hover:shadow-lg flex items-center group"
    >
      Află mai multe
      <Image
        src={ButtonArrow}
        width={16}
        height={16}
        alt="right-arrow"
        className="ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1"
      />
    </Link>
  </div>
);

const courseData: CourseCardProps[] = [
  {
    title: "Începător",
    description: "Nu știi de unde să începi? Materialele noastre pentru începători îți oferă tot ce ai nevoie pentru a înțelege conceptele de bază în programare și pentru a-ți dezvolta gândirea logică.",
    icon: IncepatorIcon,
    link: "/olimpiada/incepator",
    gradientFrom: "teal-400",
    gradientTo: "blue-400"
  },
  {
    title: "Intermediar",
    description: "Dacă ai deja o bază în programare și vrei să avansezi, cursurile și articolele noastre pentru nivel intermediar îți vor oferi provocările de care ai nevoie pentru a-ți testa abilitățile și a învăța noi strategii.",
    icon: IntermediarIcon,
    link: "/olimpiada/intermediar",
    gradientFrom: "purple-400",
    gradientTo: "pink-400",
    delay: 150
  },
  {
    title: "Avansat",
    description: "Vrei să fii printre cei mai buni? Accesează materiale avansate, subiecte rezolvate din concursuri anterioare și concepte complexe care te vor ajuta să te pregătești pentru performanțe de top.",
    icon: AvansatIcon,
    link: "/olimpiada/avansat",
    gradientFrom: "orange-400",
    gradientTo: "red-400",
    delay: 300
  }
];

function Courses() {
  return (
    <div className="font-poppins container px-4 lg:px-8 mx-auto max-w-screen-xl text-text-700 dark:text-text-300">
      <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-32">
        <h1 className="font-bold text-text-900 my-3 text-3xl md:text-4xl dark:text-text-100">
          <span className="bg-gradient-to-r from-secondary-500 to-secondary-700 text-transparent bg-clip-text">
            Incepe chiar acum!
          </span>
        </h1>
        <p className="font-inter leading-relaxed text-text-700 dark:text-text-400">
          Găsește abordarea perfectă pentru tine și începe să înveți cu
          încredere!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-14 md:gap-10 mt-20">
        {courseData.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}

export default Courses;
