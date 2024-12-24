import { fileUploadManager } from "@/utils/file";
import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const media = formData.get("media");

  if (!title || !content || !media) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const mediaUploaded = await fileUploadManager(media as File);

  await prima.articles.create({
    data: {
      title: title.toString(),
      content: content.toString(),
      description: content.toString().slice(0, 150),
      banner: {
        create: {
          url: mediaUploaded.url,
          name: mediaUploaded.filename,
        },
      },
    },
  });
  return NextResponse.json({ ok: true });
};
