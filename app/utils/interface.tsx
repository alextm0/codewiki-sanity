export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  coverImage?: {
    asset: {
      url: string;
    };
    alt: string;
  };
  body: any;
  tags: Array<Tag>;
  _id: string;
  headings?: Array<HTMLHeadElement | string>;
  comments?: Array<Comment>;
  published: boolean;  // Add this field
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number
}

export interface Comment {
  name: string;
  comment: string;
  _createdAt: string;
  _id: string;
  published: boolean; // New field
}


export interface Topic {
  _type: string;
  topicName: string;
  details: string;
}

export interface Category {
  name: string;
  category: string;
  description: string;
  topics: Topic[];
}

export interface Solution {
  title: string;
  slug: { current: string };
  publishedAt: string;
  problemLink: string;
  body: any;
  tags: Array<Tag>;
  author: string | undefined;
  difficulty: string | undefined;
  relatedSolutions: Array<Solution>;
  _id: string;
}

