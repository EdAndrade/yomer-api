/*
  Warnings:

  - You are about to drop the `ShareMedicalRegistration` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "ShareMedicalRegistration";

-- CreateTable
CREATE TABLE "MedicalRegistration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "relative_asma" BOOLEAN NOT NULL,
    "relative_cancer" BOOLEAN NOT NULL,
    "relative_cardiac_disease" BOOLEAN NOT NULL,
    "relative_diabetes" BOOLEAN NOT NULL,
    "relative_hypertension" BOOLEAN NOT NULL,
    "relative_psychiatric_disorder" BOOLEAN NOT NULL,
    "relative_epilepsy" BOOLEAN NOT NULL,
    "relative_allergy" BOOLEAN NOT NULL,
    "relative_bronchitis" BOOLEAN NOT NULL,
    "relative_other" BOOLEAN NOT NULL,
    "relative_describe_other" BOOLEAN NOT NULL,
    "taking_medications" BOOLEAN NOT NULL,
    "medications_description" TEXT NOT NULL,
    "allergies" BOOLEAN NOT NULL,
    "allergies_description" TEXT NOT NULL,
    "use_tobacco" BOOLEAN NOT NULL,
    "use_illegal_drugs" BOOLEAN NOT NULL,
    "illegal_drugs_family_historic" BOOLEAN NOT NULL,
    "consume_alcohol" BOOLEAN NOT NULL,
    "cronical_disease" BOOLEAN NOT NULL,
    "describe_cronical_disease" TEXT NOT NULL,
    "pastweeks_health_description" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "MedicalRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRegistration_patientId_key" ON "MedicalRegistration"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_number_key" ON "Patient"("phone_number");

-- AddForeignKey
ALTER TABLE "MedicalRegistration" ADD CONSTRAINT "MedicalRegistration_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
