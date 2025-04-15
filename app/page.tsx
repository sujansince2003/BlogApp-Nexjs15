import prisma from "@/lib/prisma";
import { Blogcard, SkeletonBlogPostsGrid } from "./mycomponents";
import { Suspense } from "react";

async function getData() {
  const items = await prisma.blog.findMany({});
  return items;
}

export default function Home() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Latest Blog posts
      </h1>
      <Suspense fallback={<SkeletonBlogPostsGrid />}>
        <ShowBlogs />
      </Suspense>
    </div>
  );
}

async function ShowBlogs() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((item) => (
        <Blogcard key={item.id} data={item} />
      ))}
    </div>
  );
}
