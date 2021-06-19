-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "license_status" TEXT NOT NULL,
    "pdp_status" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficFine" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_traffic_fine" (
    "traffic_fine_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'NOT_PAID',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id","traffic_fine_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.id_number_unique" ON "users"("id_number");

-- AddForeignKey
ALTER TABLE "user_traffic_fine" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_traffic_fine" ADD FOREIGN KEY ("traffic_fine_id") REFERENCES "TrafficFine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
