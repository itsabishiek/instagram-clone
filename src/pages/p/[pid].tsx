import Head from "next/head";
import React from "react";

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        />
      </Head>
      <div>Have a good coding</div>;
    </>
  );
};
export default PostPage;
