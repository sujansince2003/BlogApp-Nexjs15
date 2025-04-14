"use server"

import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export async function handleFormSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser()
    const title = formData.get("title")
    const content = formData.get("content")
    const imageurl = formData.get("imageurl")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const blogdata = await prisma.blog.create({
        data: {
            title: title as string,
            content: content as string,
            imageurl: imageurl as string,
            authorId: user?.id as string,
            authorName: user?.given_name as string,
            authorImage: user?.picture as string || ""

        }
    })
    return redirect("/dashboard")
}