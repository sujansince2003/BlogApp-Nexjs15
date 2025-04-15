import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Blogcard } from "../mycomponents";
import { Plus, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

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

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col space-y-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link
            className={buttonVariants({ variant: "default", size: "sm" })}
            href="/dashboard/createblog"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Blog
          </Link>
        </div>
        <p className="text-muted-foreground">
          Manage your blog posts and create new content.
        </p>
        <Separator className="my-4" />
      </div>

      {data.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No blogs yet</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            You haven&apos;t created any blog posts yet. Click the button below
            to create your first blog post.
          </p>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/dashboard/createblog"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Blog
          </Link>
        </Card>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div key={item.id} className="transition-all hover:scale-[1.01]">
                <Blogcard data={item} />
              </div>
            ))}
          </div>

          {data.length > 0 && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Showing {data.length} blog post{data.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
