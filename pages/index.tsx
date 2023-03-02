import { GetStaticProps } from "next";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { createMarkup } from "@/utils";
export default function Blog({ allPosts: { posts } }: any) {
  return (
    <>
      <Head>
        <title>Startuplist Africa - Blog</title>
        <meta
          name="description"
          content="Discover and learn more about the african tech ecosystem"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white ">
        <div className=" bg-blend-normal blog-header py-24 sm:py-32 border-b-8 border-gray-300">
          <div className=" mx-auto max-w-7xl px-6 lg:px-">
            <h2 className="text-3xl font-medium tracking-tight text-gray-100 sm:text-4xl">
              Startuplist Africa Blog
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-100">
              Expand your knowledge on African Startups and markets with
              detailed articles and case studies.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {posts.map((post: any) => (
              <article
                key={post.ID}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
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
