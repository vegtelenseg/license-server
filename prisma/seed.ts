import { PrismaClient } from '@prisma/client'

// Instantiate Prisma Client
const prisma = new PrismaClient()

async function main() {
  // Clean DB
  await prisma.userTrafficFine.deleteMany({})

  await prisma.user.deleteMany({})
  await prisma.trafficFine.deleteMany({})


  // Create a driver
  const user1 = await prisma.user.create({
    data: {
      firstname: 'Siya',
      lastname: 'Mzam',
      idNumber: '123456789010',
      avatar: 'https://via.placeholder.com/728x90.png',
      dob:'1960/05/05', licenseStatus: 'ACTIVE', pdpStatus: 'N/A',
    }
  });

  // Create a traffic fine
  const trafficFine1 = await prisma.trafficFine.create({
    data: {
      reason: 'Running a red light',
      amount: 300,
    },
  })

  // Assign traffic fine to a driver
  await prisma.userTrafficFine.create({
    data: {
      status: 'UNSETTLED',
      trafficFineId: trafficFine1.id,
      userId: user1.id
    },
  })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })