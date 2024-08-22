export const ReadingTime = ({ text }) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/g).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return (
    <>
      <div className="text-sm text-gray-500">
        Approx reading time: {readingTime} min.
      </div>
    </>
  );
};
