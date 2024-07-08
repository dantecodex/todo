/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `subtasks` DROP FOREIGN KEY `subTasks_tasksId_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_usersId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Users_username_key` ON `Users`(`username`);

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subTasks` ADD CONSTRAINT `subTasks_tasksId_fkey` FOREIGN KEY (`tasksId`) REFERENCES `Tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
