/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_autorId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_autorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bannerId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "freelance" BOOLEAN NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "bannerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_bannerId_key" ON "Users"("bannerId");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "FileUploadeds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
