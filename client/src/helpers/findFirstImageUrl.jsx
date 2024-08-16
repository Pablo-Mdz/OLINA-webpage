export function findFirstImageUrl(body) {
  const imgUrlRegex = /<img\s+src="([^"]+)"/g;

  const match = imgUrlRegex.exec(body);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}
