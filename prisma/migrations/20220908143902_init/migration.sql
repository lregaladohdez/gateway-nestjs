-- CreateTable
CREATE TABLE "Gateway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipv4" TEXT NOT NULL,
    "maxPeripherals" INTEGER NOT NULL DEFAULT 10,
    "generatedPeripherals" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Peripheral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "gatewayId" INTEGER NOT NULL,
    "claimedBy" TEXT,
    CONSTRAINT "Peripheral_gatewayId_fkey" FOREIGN KEY ("gatewayId") REFERENCES "Gateway" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Gateway_serial_key" ON "Gateway"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "Peripheral_uuid_key" ON "Peripheral"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Peripheral_claimedBy_key" ON "Peripheral"("claimedBy");
