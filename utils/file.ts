import path from "path";
import { put } from "@vercel/blob";
import { del } from "@vercel/blob";

export async function fileUploadManager(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const originName = file.name.replaceAll(" ", "_");
  const fileExtension = path.extname(originName);

  const filename: string = Math.floor(Date.now() / 1000) + fileExtension;

  const blob = await put(filename, buffer, {
    access: "public",
  });

  const profilPicObj = {
    filename,
    url: blob.url,
  };

  return profilPicObj;
}

export async function deleteFile(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url") as string;
  await del(urlToDelete);

  return new Response();
}
