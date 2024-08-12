export const slugify = (text: string) => {
  // Extract only the text portion from markdown links, ignoring the URL
  const linkText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // Slugify the cleaned text
  return linkText
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/[\s]+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, ""); // Remove all non-word characters except dashes
};
