import Header from "@/app/components/Header";
import { Tag } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
import React from "react";

async function getAllTags() {
  const query = `
    *[_type == "tag"] {
      name,
      slug,
      published, 
      _id,
      "postCount": count(*[_type == "post" && published == true && references("tags", ^._id)])
    }
  `;
  const tags = await client.fetch(query);
  return tags;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tags",
  description: "Search for posts by tags on the blog",
};

const TagsPage = async () => {
  const tags: Tag[] = await getAllTags();

  return (
    <div className="max-w-[1024px] mx-auto py-12"> {/* Add padding to the bottom */}
      <Header title="Toate etichetele" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 p-4 mb-20">
        {tags?.length > 0 &&
          tags.map(
            (tag: any) =>
              tag?.postCount > 0 && (
                <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
                  <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800">
                    <div className="text-purple-600 dark:text-purple-400 font-semibold text-lg">
                      #{tag.name}
                    </div>
                    <div className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                      {tag.postCount} {tag.postCount === 1 ? 'post' : 'posts'}
                    </div>
                  </div>
                </Link>
              )
          )}
      </div>
    </div>
  );
};

export default TagsPage;
