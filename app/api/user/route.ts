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
  resume?: {
    create: {
      url: string;
      name: string;
    };
  };
  description: string;
  jobRole: string;
  jobDescription: string;
  isAvailable: boolean;
  freelance: boolean;
}

export async function PUT(req: NextRequest) {
  // let body = await req.json();
  const userId = req.headers.get("x-user-id");
  const formData = await req.formData();

  const fullname = formData.get("fullname");
  const banner = formData.get("banner");
  const resume = formData.get("resume");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const age = formData.get("age");
  const address = formData.get("address");
  const description = formData.get("description");
  const jobRole = formData.get("jobRole");
  const jobDescription = formData.get("jobDescription");
  const isAvailable = formData.get("isAvailable");
  const freelance = formData.get("freelance");

  try {
    if (!userId) throw genericErrorEnum.missingRequiredField;

    const dataToUp: UserUpdate = {
      description: "",
      jobRole: "",
      jobDescription: "",
      isAvailable: false,
      freelance: false,
    };
    if (banner) {
      const mediaUploaded = await fileUploadManager(banner as File);
      dataToUp.banner = {
        create: {
          url: mediaUploaded.url,
          name: mediaUploaded.filename,
        },
      };
    }

    if (resume) {
      const mediaUploaded = await fileUploadManager(resume as File);
      dataToUp.resume = {
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
    if (description) dataToUp.description = description.toString();
    if (jobRole) dataToUp.jobRole = jobRole.toString();
    if (jobDescription) dataToUp.jobDescription = jobDescription.toString();
    if (freelance) dataToUp.freelance = JSON.parse(freelance.toString());
    if (isAvailable) dataToUp.isAvailable = JSON.parse(isAvailable.toString());

    const updateUser = await prisma.users.update({
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

  const user = await prisma.users.findUnique({
    where: { id: userId?.toString() },
  });
  return NextResponse.json(user);
};
