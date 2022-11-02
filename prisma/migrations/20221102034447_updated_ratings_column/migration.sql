/*
  Warnings:

  - You are about to alter the column `ratings` on the `Hotel` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Hotel` MODIFY `ratings` DOUBLE NOT NULL;
