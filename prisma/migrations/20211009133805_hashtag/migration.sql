/*
  Warnings:

  - A unique constraint covering the columns `[hashtag]` on the table `HashTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashtag` to the `HashTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HashTag" ADD COLUMN     "hashtag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HashTag.hashtag_unique" ON "HashTag"("hashtag");
