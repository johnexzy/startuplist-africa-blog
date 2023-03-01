export async function fetchAllPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/rest/v1/sites/197428563/posts?fields=slug"
  );
  return await res.json();
}

export async function fetchSinglePost(slug: string) {
  const res = await fetch(
    `https://public-api.wordpress.com/rest/v1/sites/197428563/posts/slug:${slug}`
  );
  return await res.json();
}

export function createMarkup(html: string) {
  return { __html: html };
}
