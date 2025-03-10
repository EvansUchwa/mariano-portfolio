import { fileUploadManager } from "@/utils/file";
import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/prisma";
import { genericErrorEnum } from "@/types/errors";
import { articleSuccessEnum } from "@/types/success";

interface ArticleUpdate {
  title: string;
  content: string;
  description: string;
  banner?: { create: { name: string; url: string } };
}

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const autor = userId;
  const description = formData.get("description");
  const media = formData.get("media");

  try {
    if (!title || !content || !media || !autor) {
      throw genericErrorEnum.missingRequiredField;
    }

    const mediaUploaded = await fileUploadManager(media as File);

    await prima.articles.create({
      data: {
        title: title.toString(),
        content: content.toString(),
        description: description?.toString() || "",
        autor: {
          connect: { id: autor.toString() },
        },
        banner: {
          create: {
            name: mediaUploaded.filename,
            url: mediaUploaded.url,
          },
        },
      },
    });
    return NextResponse.json({ message: articleSuccessEnum.added });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 400,
      }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const title = formData.get("title");
  const articleId = formData.get("articleId");
  const content = formData.get("content");
  const description = formData.get("description");
  const media = formData.get("media");

  try {
    if (!title || !content || !articleId)
      throw genericErrorEnum.missingRequiredField;

    const dataUpdate: ArticleUpdate = {
      title: title.toString(),
      content: content.toString(),
      description: description?.toString() || "",
    };

    if (media) {
      const mediaUploaded = await fileUploadManager(media as File);
      dataUpdate.banner = {
        create: {
          name: mediaUploaded.filename,
          url: mediaUploaded.url,
        },
      };
    }

    await prima.articles.update({
      where: { id: articleId.toString() },
      data: dataUpdate,
    });
    return NextResponse.json({ message: articleSuccessEnum.updated });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id) throw genericErrorEnum.missingRequiredField;
    const result = await prima.articles.delete({
      where: { id: id?.toString() },
    });
    return NextResponse.json({ message: articleSuccessEnum.deleted });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
