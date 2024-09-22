const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  revalidate: {
    default: isDevelopment ? 1 : 60, // 1 second in dev, 60 seconds in production
    article: isDevelopment ? 1 : 60, // 1 second in dev, 60 seconds in production
    articleList: isDevelopment ? 1 : 60, // 1 second in dev, 60 seconds in production
  },
};

export default config;