import React from "react";
import Image from "next/image";
import { Link } from 'next-view-transitions';

import AdmitereIcon from "@/public/assets/admitere-icon.svg";
import BacalaureatIcon from "@/public/assets/bacalaureat-icon.svg";
import OlimpiadaIcon from "@/public/assets/olimpiada-icon.svg";

import CoursesSection from '@/app/components/CoursesSection';

function StartLearningPage() {
  return (
    <div className="mb-32">
      <CoursesSection />
    </div>
  );
}

export default StartLearningPage;
