export const setFirstLetterUppercase = (word: string) => {
  if (word.length === 0) {
    return word;
  }
  return word
    .split(" ")
    .map((str, index) =>
      index === 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : str
    )
    .join(" ");
};
