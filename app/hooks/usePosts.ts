"use client"

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { Post } from '@/app/utils/interface';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `
          *[_type == "post" && published == true] | order(publishedAt desc) {
            title,
            slug,
            publishedAt,
            excerpt,
            coverImage {
              asset-> {
                url
              },
              alt
            },
            tags[]-> {
              _id,
              slug,
              name
            }
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching posts'));
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, isLoading, error };
}