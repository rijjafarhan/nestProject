-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECEPTIONIST', 'SALESPERSON', 'SALESMANAGER', 'FINANCE_MANAGER', 'FINANCE_ASSISTANT', 'FINANCE_DIRECTOR', 'GENERAL_MANAGER', 'ACCOUNTANT', 'MAKE_READY', 'STATUS_LOG', 'EXECUTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hashPass" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
