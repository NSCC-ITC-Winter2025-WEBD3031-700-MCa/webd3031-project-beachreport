import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users

  // User 1: Paid Subscriber
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "hashedpassword123", // Replace with your hashed password
      isPaidSubscriber: true,
      // isAdmin defaults to false
    },
  });

  // User 2: Regular User (non-admin)
  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "hashedpassword456",
      // isAdmin and isPaidSubscriber default to false
    },
  });

  // User 3: Admin
  const user3 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      password: "hashedpassword789",
      isAdmin: true,
      // isPaidSubscriber defaults to false (or set true if desired)
    },
  });

  // Create Nova Scotia Beaches
  const beach1 = await prisma.beach.create({
    data: {
      slug: "lawrencetown-beach",
      name: "Lawrencetown Beach",
      location: "Lawrencetown, NS",
      description: "A popular surfing destination with stunning ocean views.",
      imageUrl: "https://coastalnovascotia.ca/wp-content/uploads/2019/06/Lawrencetown-beach.jpg",
    },
  });

  const beach2 = await prisma.beach.create({
    data: {
      slug: "carters-beach",
      name: "Carter's Beach",
      location: "Port Mouton, NS",
      description: "White sand and turquoise waters, often compared to the Caribbean.",
      imageUrl: "https://novascotia.com/wp-content/uploads/2024/09/38103.webp",
    },
  });

  const beach3 = await prisma.beach.create({
    data: {
      slug: "ingonish-beach",
      name: "Ingonish Beach",
      location: "Cape Breton, NS",
      description: "A mix of saltwater and freshwater swimming options with scenic views.",
      imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b4/96/46/img-20190804-124051-522.jpg?w=900&h=500&s=1",
    },
  });

  // Add Beach Reports
  await prisma.report.createMany({
    data: [
      {
        beachId: beach1.id,
        userId: user1.id, // Report by John Doe (paid subscriber)
        reportText: "Great waves today! Perfect for surfing.",
        rating: 5,
      },
      {
        beachId: beach2.id,
        userId: user2.id, // Report by Jane Smith (regular user)
        reportText: "The water was crystal clear and warm.",
        rating: 4,
      },
      {
        beachId: beach3.id,
        userId: user1.id, // Another report by John Doe (paid subscriber)
        reportText: "Beautiful views but the water was a bit cold.",
        rating: 3,
      },
      {
        beachId: beach1.id,
        userId: user3.id, // Report by Alice Johnson (admin)
        reportText: "I checked the facilities, and everything looks great!",
        rating: 5,
      },
    ],
  });

  console.log("Dummy data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


