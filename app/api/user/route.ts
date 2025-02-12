import prisma from "@/lib/prisma";
import { fileUploadManager } from "@/utils/file";
import { NextRequest, NextResponse } from "next/server";

interface UserUpdate {
  fullname?: string;
  phone?: string;
  age?: number;
  address?: string;
  banner?: {
    create: {
      url: string;
      name: string;
    };
  };
}

export async function PUT(req: NextRequest) {
  // let body = await req.json();
  const formData = await req.formData();

  const fullname = formData.get("fullname");
  const banner = formData.get("banner");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const age = formData.get("age");
  const address = formData.get("address");

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

  const updateUser = await prisma.user.update({
    where: { email: email?.toString() },
    data: dataToUp,
  });
  return NextResponse.json(updateUser);
}
