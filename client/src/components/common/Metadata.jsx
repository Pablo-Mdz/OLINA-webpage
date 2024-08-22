import React from 'react';
import { Helmet } from 'react-helmet';

const defaultImageUrl = '/estetoscopio.webp';

export const MetaData = ({
  title,
  description,
  keywords,
  image = defaultImageUrl,
}) => {
  const imageUrl = image || `${process.env.REACT_APP_SERVER_URL}/${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={imageUrl} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};
