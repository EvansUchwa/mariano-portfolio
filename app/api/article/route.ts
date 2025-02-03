import { fileUploadManager } from "@/utils/file";
import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface ArticleUpdate {
  title: string;
  content: string;
  description: string;
  autor: { connect: { id: string } };
  banner?: { create: { name: string; url: string } };
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const autor = formData.get("autor");
  const description = formData.get("description");
  const media = formData.get("media");

  if (!title || !content || !media || !autor) {
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
  return NextResponse.json({ ok: true });
};

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();

  const title = formData.get("title");
  const articleId = formData.get("articleId");
  const content = formData.get("content");
  const autor = formData.get("autor");
  const description = formData.get("description");
  const media = formData.get("media");

  if (!title || !content || !autor || !articleId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const dataUpdate: ArticleUpdate = {
    title: title.toString(),
    content: content.toString(),
    description: description?.toString() || "",
    autor: {
      connect: { id: autor.toString() },
    },
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
  return NextResponse.json({ ok: true });
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all");
  const except = searchParams.get("except");
  const limit = searchParams.get("limit");
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  let result;
  if (all) {
    const reqParams: Prisma.ArticlesFindManyArgs = {
      where: {},
      include: {
        banner: true,
        autor: true,
      },
    };

    if (except) {
      reqParams.where = {
        NOT: {
          id: except,
        },
      };
    }
    if (limit) {
      reqParams.take = parseInt(limit);
    }
    result = await prima.articles.findMany(reqParams);
  } else {
    const one = searchParams.get("one");
    if (one) {
      const id = searchParams.get("oneId");
      if (id) {
        result = await prima.articles.findUnique({
          where: { id },
          include: {
            banner: true,
            autor: true,
          },
        });
        if (result) {
          const copyViewers = [...result.views];
          if (!copyViewers.includes(ip)) {
            copyViewers.push(ip);
          }
          await prima.articles.update({
            where: { id },
            data: { views: copyViewers },
          });
        }
      } else {
        result = null;
      }
    }
  }

  return NextResponse.json(result);
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const result = await prima.articles.delete({
    where: { id: id?.toString() },
  });

  return NextResponse.json(result);
};
