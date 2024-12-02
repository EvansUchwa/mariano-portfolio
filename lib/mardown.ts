"use server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "contents");

export async function getMarkdownData(fileName: string) {
  const filePath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Utilise gray-matter pour extraire les métadonnées
  const { data } = matter(fileContents);
  return data;
}
