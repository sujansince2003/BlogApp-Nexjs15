import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  // Calculate time difference for "time ago" display
  const timeAgo = () => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(data.createdAt).getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} ${
          diffInMinutes === 1 ? "minute" : "minutes"
        } ago`;
      }
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(data.createdAt);
    }
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:border-primary/20">
      <Link href={`/blog/${data.id}`} className="block h-full">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={data.imageurl || "/placeholder.svg"}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity hover:opacity-100" />
        </div>

        <CardContent className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="px-2 py-0 text-xs font-normal"
            >
              Blog
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {timeAgo()}
            </span>
          </div>

          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {data.title}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground mb-4">
            {data.content}
          </p>
        </CardContent>

        <CardFooter className="border-t p-5 pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-background">
                <Image
                  src={data.authorImage || "/placeholder.svg"}
                  alt={data.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{data.authorName}</span>
            </div>

            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default Blogcard;
