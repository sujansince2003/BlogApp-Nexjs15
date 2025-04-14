import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Link from "next/link";
import { Blogcard } from "../mycomponents";

async function getData(userId: string) {
  const data = await prisma.blog.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  console.log(data);
  return (
    <div>
      <div className="flex justify-between items-center my-1-4">
        <h2 className="text-xl font-medium ">Dashboard</h2>
        <Link
          className={buttonVariants({ variant: "blueBg" })}
          href={"/dashboard/createblog"}
        >
          Create Blog
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((item) => (
            <div key={item.id}>
              <Blogcard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
