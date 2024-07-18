export const slugify = (text: string) => {
  // Remove LaTeX content and other unwanted characters
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/[\s]+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, ""); // Remove all non-word characters except dashes
};
