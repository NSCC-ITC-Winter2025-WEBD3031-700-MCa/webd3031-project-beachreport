import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Prisma Database Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Can create a user', async () => {
    const user = await prisma.user.create({
      data: { 
        name: 'Test User', 
        email: 'test@example.com', 
        password: 'TestPassword123' 
      },
    });
    expect(user.id).toBeDefined();
  });
  

  test('Can find a user', async () => {
    const user = await prisma.user.findFirst({ where: { email: 'test@example.com' } });
    expect(user).not.toBeNull();
  });

  test('Can update a user', async () => {
    const user = await prisma.user.update({
      where: { email: 'test@example.com' },
      data: { name: 'Updated User' },
    });
    expect(user.name).toBe('Updated User');
  });

  test('Can delete a user', async () => {
    const user = await prisma.user.delete({
      where: { email: 'test@example.com' },
    });
    expect(user).toBeDefined();
  });
});
