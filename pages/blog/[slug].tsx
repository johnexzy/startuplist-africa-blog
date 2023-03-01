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
    </>
  );
}
