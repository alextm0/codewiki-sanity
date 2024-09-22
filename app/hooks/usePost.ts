'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { Post } from '@/app/utils/interface';

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const query = `
          *[_type == "post" && slug.current == $slug][0] {
            title,
            slug,
            publishedAt,
            excerpt,
            body,
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
        const data = await client.fetch(query, { slug });
        setPost(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching the post'));
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, isLoading, error };
}