import { GetStaticProps } from "next";
import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
export default function Blog({ allPosts: { posts } }: any) {
  function createMarkup(html: string) {
    return { __html: html };
  }
  return (
    <>
      <Head>
        <title>AfroLabs - Blog</title>
        <meta
          name="description"
          content="Creating a Better Future for Africa with Afrolabs' Innovative Solutions"
        />
        <meta
          property="og:image"
          content="/ogimage.jpg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From Our blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post: any) => (
              <article
                key={post.ID}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.URL}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <div
                    className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={createMarkup(post.excerpt)}
                  >
                    {/* {post.excerpt} */}
                  </div>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image
                    src={post.featured_image}
                    alt=""
                    width={200}
                    height={100}
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.URL}>
                        <span className="absolute inset-0" />
                        {post.author.nice_name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.name}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const res = await fetch(
    "https://public-api.wordpress.com/rest/v1/sites/197428563/posts"
  );
  const allPosts = await res.json();

  return {
    props: { allPosts },
  };
};
