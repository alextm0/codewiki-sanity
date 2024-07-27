import React from "react";
import { TbDotsVertical } from "react-icons/tb";
import Link from "next/link";

interface Problem {
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

const ProblemSetTable: React.FC<ProblemSetTableProps> = ({
  problemSetName,
  problemSet,
}) => {
  const normalBadge = (
    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
      Normal
    </span>
  );
  const easyBadge = (
    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-green-100 text-green-800">
      Easy
    </span>
  );
  const hardBadge = (
    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-red-100 text-red-800">
      Hard
    </span>
  );
  const otherBadge = <span>...</span>;

  const ProblemSetRow = problemSet.map((problem) => {
    let currentBadge = otherBadge;
    if (problem.badge === "hard") currentBadge = hardBadge;
    else if (problem.badge === "normal") currentBadge = normalBadge;
    else if (problem.badge === "easy") currentBadge = easyBadge;

    return (
      <tr key={problem.name} className="border-b hover:bg-gray-50">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
        >
          <a
            href={problem.sourceLink}
            className="inline-block text-gray-600 relative after:absolute after:bg-gray-400 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
          >
            {problem.source}
          </a>
        </th>
        <td className="py-4 px-6">
          <a href={problem.link} className="font-semibold text-[#2563eb]">
            {problem.name}
          </a>
        </td>
        <td className="py-4 px-6 text-gray-600">{currentBadge}</td>
        <td className="py-4 px-6 text-gray-600">{problem.tags}</td>
        <td className="py-4 px-6 text-2xl text-gray-600">
          {problem.badge === "hard" ||
          problem.badge === "normal" ||
          problem.badge === "easy" ? (
            <Link href={`/solutie/${problem.name}`}>
              <TbDotsVertical />
            </Link>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="font-inter max-w-xs md:max-w-full">
      <h1 className="font-semibold text-gray-700 text-2xl mb-5">
        {problemSetName}
      </h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Source
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Problem Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Difficulty
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                Tags
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
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
