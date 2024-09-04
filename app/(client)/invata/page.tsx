import React from "react";
import Image from "next/image";
import { Link } from 'next-view-transitions';

import AdmitereIcon from "@/public/assets/admitere-icon.svg";
import BacalaureatIcon from "@/public/assets/bacalaureat-icon.svg";
import OlimpiadaIcon from "@/public/assets/olimpiada-icon.svg";

import CoursesSection from '@/app/components/CoursesSection';

export const metadata = {
  title: 'Învață informatica pentru olimpiada si concursuri | CodeWiki',
  description: 'Descoperiți resurse de învățare pentru programare competitivă pe CodeWiki, adaptate pentru toate nivelurile: începător, intermediar și avansat. Învățați algoritmi, structuri de date și tehnici de rezolvare a problemelor la fiecare nivel de dificultate.',
  keywords: 'olimpiada de informatica, ghid de antrenament, resurse de invatare, plan de invatare, învățare programare competitivă, nivel începător programare, nivel intermediar programare, nivel avansat programare, tutoriale algoritmi, structuri de date, CodeWiki',
};


function StartLearningPage() {
  return (
    <div className="mb-32">
      <CoursesSection />
    </div>
  );
}

export default StartLearningPage;
