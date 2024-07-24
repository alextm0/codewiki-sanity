import { Link } from 'next-view-transitions'
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-14 px-4 text-center border-b dark:border-orange-500">
      <h2 className="text-gray-900 dark:text-white font-bold text-4xl">
        {title}
      </h2>

      {tags && (
        <div className="text-base mt-2">
          <Link className='hover:text-[#FF725E]' href="/tag">#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;