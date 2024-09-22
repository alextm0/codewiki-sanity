import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  description: string;
  icon: string;
}

const OlimpiadaCards: React.FC = () => {
  // Hardcoded categories for now. In a real scenario, you'd fetch these from an API or database.
  const categories: Category[] = [
    {
      name: "Incepator",
      description: "Pentru cei care fac primii pași în programarea competitivă.",
      icon: "/assets/incepator-icon.svg"
    },
    {
      name: "Intermediar",
      description: "Pentru cei care au deja o bază solidă și vor să avanseze.",
      icon: "/assets/intermediar-icon.svg"
    },
    {
      name: "Avansat",
      description: "Pentru cei care se pregătesc pentru competiții de nivel înalt.",
      icon: "/assets/avansat-icon.svg"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link key={category.name} href={`/olimpiada/${category.name.toLowerCase()}`}>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={category.icon}
              alt={`${category.name} Icon`}
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center mb-2">{category.name}</h2>
            <p className="text-gray-600 text-center">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OlimpiadaCards;