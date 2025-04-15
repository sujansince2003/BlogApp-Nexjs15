import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Params = Promise<{ blogid: string }>;

async function getData(blogid: string) {
  const blogData = await prisma.blog.findUnique({
    where: {
      id: blogid,
    },
  });
  if (!blogData) {
    return notFound();
  }
  return blogData;
}

const page = async ({ params }: { params: Params }) => {
  const { blogid } = await params;
  const blogData = await getData(blogid);
  console.log(blogData);
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants({ variant: "blueBg" })} href="/dashboard">
        Back to posts
      </Link>
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {blogData?.title}{" "}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={blogData?.authorImage}
                alt={blogData.authorName}
                className="object-cover"
                fill
              />
            </div>
            <p className="font-medium">{blogData?.authorName}</p>
          </div>
          <time className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(blogData?.createdAt))}
          </time>
        </div>
      </div>
      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={blogData.imageurl}
          alt={blogData.title}
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      <Card>
        <CardContent>
          <p className="text-gray-700"> {blogData.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
