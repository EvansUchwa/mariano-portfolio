/*
  Warnings:

  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freelance` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobRole` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "freelance" BOOLEAN NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "jobRole" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectsToSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectsToSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectsToSkills_B_index" ON "_ProjectsToSkills"("B");

-- AddForeignKey
ALTER TABLE "_ProjectsToSkills" ADD CONSTRAINT "_ProjectsToSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToSkills" ADD CONSTRAINT "_ProjectsToSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
