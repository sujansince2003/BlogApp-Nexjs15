import prisma from "@/lib/prisma";

async function getData() {
  const items = await prisma.blog.findMany({});
  return items;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Latest Blog posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item) => (
          <p key={item.title}>{item.title}</p>
        ))}
      </div>
    </div>
  );
}
