import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogcardProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageurl: string;
    authorName: string;
    authorImage: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const Blogcard = ({ data }: BlogcardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all  hover:shadow-lg">
      <Link href={`/blog/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image src={data.imageurl} alt="blog image" fill />
        </div>
      </Link>
    </div>
  );
};

export default Blogcard;
