-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bannerId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bannerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "FileUploadeds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
