import React from "react";
import { TbDotsVertical } from "react-icons/tb";
import Link from "next/link";

interface Problem {
  solutionSlug: string;
  source: string;
  name: string;
  link: string;
  sourceLink: string;
  badge: "easy" | "normal" | "hard" | string;
  tags: string;
}

interface ProblemSetTableProps {
  problemSetName: string;
  problemSet: Problem[];
}

// Badge Component
const Badge = ({ type }: { type: string }) => {
  const badgeClasses: { [key: string]: string } = {
    easy: "bg-green-100 text-green-800",
    normal: "bg-blue-100 text-blue-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${
        badgeClasses[type] || "bg-gray-100 text-gray-800"
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const ProblemSetTable: React.FC<ProblemSetTableProps> = ({
  problemSetName,
  problemSet,
}) => {
  const ProblemSetRow = problemSet.map((problem) => (
    <tr
      key={problem.name}
      className="border-b hover:bg-gray-100 transition-colors duration-200"
    >
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
      >
        <a
          href={problem.sourceLink}
          className="inline-block text-gray-600 relative after:absolute after:bg-gray-400 after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
        >
          {problem.source}
        </a>
      </th>
      <td className="py-4 px-6">
        <a
          href={problem.link}
          className="inline-block text-primary-600 font-medium relative after:absolute after:bg-primary-400 after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:text-primary-500"
        >
          {problem.name}
        </a>
      </td>
      <td className="py-4 px-6">
        <Badge type={problem.badge} />
      </td>
      <td className="py-4 px-6 text-gray-600">
        {problem.tags.split(",").map((tag, index) => (
          <Link key={index} href={`/tags/${tag.trim()}`} className="hover:underline">
            {tag.trim()}
            {index < problem.tags.split(",").length - 1 && ", "}
          </Link>
        ))}
      </td>
      <td className="py-4 px-6 text-2xl text-gray-600">
        {["hard", "normal", "easy"].includes(problem.badge) && (
          <Link href={`/solutie/${problem.solutionSlug}`}>
            <TbDotsVertical className="hover:text-primary-600 transition-colors duration-200" />
          </Link>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="font-inter max-w-xs md:max-w-full my-16">
      <h2 className="font-bold text-gray-800 text-2xl mb-6">
        {problemSetName}
      </h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th
                scope="col"
                className="py-4 px-6 font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Sursa
              </th>
              <th
                scope="col"
                className="py-4 px-6 font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Numele problemei
              </th>
              <th
                scope="col"
                className="py-4 px-6 font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Dificultatea
              </th>
              <th
                scope="col"
                className="py-4 px-6 font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Tags
              </th>
              <th
                scope="col"
                className="py-4 px-6 bg-gray-200 border-b border-gray-300"
              ></th>
            </tr>
          </thead>
          <tbody>{ProblemSetRow}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemSetTable;
