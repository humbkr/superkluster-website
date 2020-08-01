import React from 'react'
import Header from 'next/head'

/**
 * Extends the Next Head component to automatically append common information.
 */
const Head: React.FC<{
  title: string
  description: string
}> = ({ title, description, children = '' }) => {
  const pageTitle = `SuperKluster | ${title}`

  return (
    <Header>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/share-picture.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="" /> */}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/share-picture.png`}
      />
      {children}
    </Header>
  )
}

export default Head
