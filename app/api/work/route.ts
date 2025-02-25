import { fileUploadManager } from "@/utils/file";
import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { genericErrorEnum } from "@/types/errors";
import { workSuccessEnum } from "@/types/success";

interface WorkUpdate {
  title: string;
  link: string;
  description: string;
  banner?: { create: { name: string; url: string } };
}

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  const formData = await req.formData();

  const title = formData.get("title");
  const link = formData.get("link");
  const autor = userId;
  const description = formData.get("description");
  const media = formData.get("media");

  try {
    if (!title || !link || !media || !autor)
      throw genericErrorEnum.missingRequiredField;

    const mediaUploaded = await fileUploadManager(media as File);

    await prima.projects.create({
      data: {
        title: title.toString(),
        link: link.toString(),
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
    return NextResponse.json({ message: workSuccessEnum.added });
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
  const workId = formData.get("workId");
  const link = formData.get("link");
  const description = formData.get("description");
  const media = formData.get("media");

  try {
    if (!title || !link || !workId) {
      throw genericErrorEnum.missingRequiredField;
    }

    const dataUpdate: WorkUpdate = {
      title: title.toString(),
      link: link.toString(),
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

    await prima.projects.update({
      where: { id: workId.toString() },
      data: dataUpdate,
    });
    return NextResponse.json({ message: workSuccessEnum.updated });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 400,
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all");
  const except = searchParams.get("except");
  const limit = searchParams.get("limit");

  let result;
  if (all) {
    const reqParams: Prisma.ProjectsFindManyArgs = {
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
    result = await prima.projects.findMany(reqParams);
  } else {
    const one = searchParams.get("one");
    if (one) {
      const id = searchParams.get("oneId");
      if (id) {
        result = await prima.projects.findUnique({
          where: { id },
          include: {
            banner: true,
            autor: true,
          },
        });
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

  try {
    if (!id) throw genericErrorEnum.missingRequiredField;
    const result = await prima.projects.delete({
      where: { id: id?.toString() },
    });
    return NextResponse.json({ message: workSuccessEnum.deleted });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
