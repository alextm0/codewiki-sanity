import React from 'react';
import { TbDotsVertical } from 'react-icons/tb';

// Nextjs Link
import Link from 'next/link'; 
// import Dropdown from './Dropdown';

interface Problem {
  source: string;
  name: string;
  link: string;
  sourceLink: string;
  badge: 'easy' | 'normal' | 'hard' | string;
  tags: string;
}

interface ProblemSetTableProps {
  problemSetName: string;
  problemSet: Problem[];
}

const ProblemSetTable: React.FC<ProblemSetTableProps> = ({ problemSetName, problemSet }) => {
  const normalBadge = (
    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      Normal
    </span>
  );
  const easyBadge = (
    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Easy
    </span>
  );
  const hardBadge = (
    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
      Hard
    </span>
  );
  const otherBadge = <span>...</span>;

  const ProblemSetRow = problemSet.map((problem) => {
    let currentBadge = otherBadge;
    if (problem.badge === 'hard') currentBadge = hardBadge;
    else if (problem.badge === 'normal') currentBadge = normalBadge;
    else if (problem.badge === 'easy') currentBadge = easyBadge;

    return (
      <tr key={problem.name} className="bg-gray-50 border-b">
        <th
          scope="row"
          className="py-4 px-6 mt-[6px] font-medium flex items-center gap-5 text-gray-900 whitespace-nowrap"
        >
          {/* <Dropdown position="down" /> */}
          <a
            href={problem.sourceLink}
            className="inline-block text-gray-600 relative after:absolute after:bg-gray-400 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
          >
            {problem.source}
          </a>
        </th>
        <td className="py-4 px-6">
          <a href={problem.link} className="font-medium text-[#2563eb]">
            {problem.name}
          </a>
        </td>

        {/* Badge */}
        <td className="py-4 px-6 text-gray-600">
          {problem.badge === 'hard'
            ? hardBadge
            : problem.badge === 'normal'
            ? normalBadge
            : problem.badge === 'easy'
            ? easyBadge
            : currentBadge}
        </td>

        <td className="py-4 px-6 text-gray-600">{problem.tags}</td>

        {problem.badge === 'hard' || problem.badge === 'normal' || problem.badge === 'easy' ? (
          <td className="py-4 px-6 text-2xl text-gray-600">
            <Link href={`/solutie/${problem.name}`}>
              <TbDotsVertical />
            </Link>
          </td>
        ) : (
          <td className="py-4 px-6 text-2xl text-gray-600"></td>
        )}
      </tr>
    );
  });

  return (
    <div className="font-poppins">
      <h1 className="text-gray-700 text-[1.8rem] mb-5 font-semibold">Practice Problems</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-violet-100 bg-[#5363B7] border-b-[1px] border-gray-300"
              >
                Source
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-violet-100 bg-[#5363B7] border-b-[1px] border-gray-300"
              >
                Problem Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-violet-100 bg-[#5363B7] border-b-[1px] border-gray-300"
              >
                Difficulty
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-violet-100 bg-[#5363B7] border-b-[1px] border-gray-300"
              >
                Tags
              </th>
              <th
                scope="col"
                className="font-medium text-violet-100 bg-[#5363B7] border-b-[1px] border-gray-300"
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
