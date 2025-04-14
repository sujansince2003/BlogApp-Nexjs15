import { handleFormSubmission } from "@/app/action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import React from "react";

const Page = () => {
  return (
    <div className="my-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>Write and share your blog</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleFormSubmission}>
            <div className="flex flex-col gap-2">
              <Label> Title</Label>
              <Input
                name="title"
                required
                placeholder="Blog Title"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label> Content</Label>

              <Textarea name="content" required placeholder="Blog Content" />
            </div>
            <div className="flex flex-col gap-2">
              <Label> Poster URL</Label>
              <Input
                name="imageurl"
                required
                placeholder="Image URL of blog poster"
                type="url"
              />
            </div>
            <Button className="bg-blue-500">Post Blog</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
