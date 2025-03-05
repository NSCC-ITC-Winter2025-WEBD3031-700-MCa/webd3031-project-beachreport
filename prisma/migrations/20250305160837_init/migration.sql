-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beach" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Beach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "beachId" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "reportText" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Beach_slug_key" ON "Beach"("slug");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_beachId_fkey" FOREIGN KEY ("beachId") REFERENCES "Beach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
