import { GetStaticProps } from "next";
import { fetchAllPosts, fetchSinglePost, createMarkup } from "@/utils";
import Head from "next/head";
export async function getStaticPaths() {
  const res = (await fetchAllPosts()).posts.map((post: any) => ({
    params: post,
  }));
  return {
    paths: res,
    fallback: false,
  };
}
export const getStaticProps: GetStaticProps = async (context) => {
  const post = await fetchSinglePost(context.params!.slug as string);

  return {
    props: { post },
  };
};

export default function BlogPost({ post }: { post: any }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.title}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={post.featured_image}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white py-12">
        <div className="flex justify-center  ">
          <div className="max-w-xl mx-auto px-6 sm:px-0 blog-html">
            <h1 className=" text-4lg font-medium text-center">{post.title}</h1>
            <div
              className="my-6"
              dangerouslySetInnerHTML={createMarkup(post.content)}
            ></div>
          </div>
        </div>
      </div>
      <div className=" bg-blend-normal blog-header py-24 sm:py-32 border-t-8 border-gray-300">
          <div className="flex justify-between mx-auto max-w-7xl px-6 lg:px-">
            <h2 className="text-3xl font-medium tracking-tight text-gray-100 sm:text-4xl">
              Startuplist Africa Blog
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-100">
              &copy; 2023 All rights reserved. <a href="https://startuplist.africa" className=" decoration-gray-600">Startuplist Africa</a>
            </p>
          </div>
        </div>
    </>
  );
}
