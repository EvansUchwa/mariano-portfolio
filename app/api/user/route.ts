import prisma from "@/lib/prisma";
import { genericErrorEnum } from "@/types/errors";
import { profileSuccessEnum } from "@/types/success";
import { fileUploadManager } from "@/utils/file";
import { NextRequest, NextResponse } from "next/server";

interface UserUpdate {
  fullname?: string;
  phone?: string;
  age?: number;
  address?: string;
  email?: string;
  banner?: {
    create: {
      url: string;
      name: string;
    };
  };
}

export async function PUT(req: NextRequest) {
  // let body = await req.json();
  const userId = req.headers.get("x-user-id");
  const formData = await req.formData();

  const fullname = formData.get("fullname");
  const banner = formData.get("banner");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const age = formData.get("age");
  const address = formData.get("address");

  try {
    if (!userId) throw genericErrorEnum.missingRequiredField;

    const dataToUp: UserUpdate = {};
    if (banner) {
      const mediaUploaded = await fileUploadManager(banner as File);
      dataToUp.banner = {
        create: {
          url: mediaUploaded.url,
          name: mediaUploaded.filename,
        },
      };
    }

    if (fullname) dataToUp.fullname = fullname.toString();
    if (phone) dataToUp.phone = phone.toString();
    if (age) dataToUp.age = parseInt(age.toString());
    if (address) dataToUp.address = address.toString();
    if (email) dataToUp.email = email.toString();

    const updateUser = await prisma.user.update({
      where: { id: userId.toString() },
      data: dataToUp,
    });
    return NextResponse.json(
      { message: profileSuccessEnum.updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 400,
      }
    );
  }
}

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");

  const user = await prisma.user.findUnique({
    where: { id: userId?.toString() },
  });
  return NextResponse.json(user);
};
