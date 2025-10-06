-- CreateEnum
CREATE TYPE "public"."GENDER" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "public"."STATUS_USER" AS ENUM ('A', 'S', 'D');

-- CreateEnum
CREATE TYPE "public"."ID_TYPE" AS ENUM ('RUC', 'DNI');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "gender" "public"."GENDER",
    "status" "public"."STATUS_USER" NOT NULL DEFAULT 'A',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."PasswordUser" (
    "userId" BIGINT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "PasswordUser_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."OAuthUser" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,

    CONSTRAINT "OAuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Organizer" (
    "organizerId" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "companyName" TEXT NOT NULL,
    "idType" "public"."ID_TYPE" NOT NULL,
    "idNumber" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("organizerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "OAuthUser_userId_idx" ON "public"."OAuthUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthUser_provider_providerUserId_key" ON "public"."OAuthUser"("provider", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_userId_key" ON "public"."Organizer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_idNumber_key" ON "public"."Organizer"("idNumber");

-- AddForeignKey
ALTER TABLE "public"."PasswordUser" ADD CONSTRAINT "PasswordUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OAuthUser" ADD CONSTRAINT "OAuthUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Organizer" ADD CONSTRAINT "Organizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
