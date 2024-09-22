import React from 'react';

interface Resource {
  source: string;
  title: string;
  link: string;
  description: string;
  sourceLink: string;
}

interface ResourcesTableProps {
  header: string;
  resource: Resource[];
}

const ResourcesTable: React.FC<ResourcesTableProps> = ({ header, resource }) => {
  return (
    <div className="font-inter max-w-xs md:max-w-full my-16">
      <h1 className="font-bold text-gray-800 text-2xl mb-6">{header}</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th
                scope="col"
                className="py-4 px-6 font-medium text-gray-600 bg-gray-200 border-b border-gray-300"
              >
                RESURSE
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-gray-600 bg-gray-200 border-b border-gray-300"
              ></th>
              <th
                scope="col"
                className="py-4 px-6 text-gray-600 bg-gray-200 border-b border-gray-300"
              ></th>
            </tr>
          </thead>
          <tbody>
            {resource.map((res, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-colors duration-200"
              >
                <th
                  scope="row"
                  className="pl-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  <a
                    href={res.sourceLink}
                    className="inline-block text-gray-600 relative after:absolute after:bg-gray-400 after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
                  >
                    {res.source}
                  </a>
                </th>
                <td className="py-4 px-6">
                  <a href={res.link} className="font-medium text-primary-600 hover:text-primary-500">
                    {res.title}
                  </a>
                </td>
                <td className="py-4 px-6 text-gray-600">{res.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourcesTable;
