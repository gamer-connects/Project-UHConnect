import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Try to delete existing user, ignore if doesn't exist
  try {
    await prisma.user.delete({
      where: { email: 'john@foo.com' },
    });
    console.log('Deleted existing user');
  } catch (error) {
    console.log('No existing user to delete');
  }

  // Hash the password
  const hashedPassword = await hash('changeme', 10);

  // Create a sample user
  const user = await prisma.user.create({
    data: {
      email: 'john@foo.com',
      password: hashedPassword, // Now it's properly hashed!
      username: 'JohnGamer123',
      bio: 'Casual gamer looking to connect with others who enjoy competitive FPS games and RPGs. Always down for a good co-op session! Been gaming since 2010 and love discovering new indie titles.',
      gameInterests: ['Valorant', 'League of Legends', 'Elden Ring', 'Minecraft', 'Apex Legends'],
      gameTags: ['FPS', 'RPG', 'Competitive', 'Co-op', 'Strategy'],
      followers: 42,
      following: 56,
    },
  });

  console.log('Created user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
