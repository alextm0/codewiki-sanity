import React from "react";
import { Comment } from "../utils/interface";
import { Link } from "next-view-transitions";

interface Props {
  comments: Array<Comment>;
  slug: string;
  commentsOrder: string;
}

const AllComments = ({ comments, slug, commentsOrder }: Props) => {
  const publishedComments = comments

  return (
    <div className="max-w-xs md:max-w-full mt-10 px-4 sm:px-6 lg:px-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2">
        Toate Comentariile
      </h3>
      {publishedComments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Nu există comentarii încă. Fii primul care comentează!
        </p>
      ) : (
        <>
          <div className="mb-4 text-sm">
            <Link
              scroll={false}
              href={`/posts/${slug}?comments=asc`}
              className={`mr-4 ${
                commentsOrder === "asc" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Cele mai vechi
            </Link>
            <Link
              scroll={false}
              href={`/posts/${slug}?comments=desc`}
              className={`mr-4 ${
                commentsOrder === "desc" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Cele mai noi
            </Link>
          </div>
          {publishedComments.map((comment) => (
            <div key={comment?._id} className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
              <div className="mb-2">
                <strong className="text-gray-900 dark:text-white">{comment?.name}</strong>{" "}
                <span className="text-gray-500 text-xs">
                  {new Date(comment?._createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {comment?.comment}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};



export default AllComments;
