import { PrismaClient, Role, Condition } from '@prisma/client';
import config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany({});
  await prisma.stuff.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding database...');

  if (config.defaultUsers) {
    await Promise.all(
      config.defaultUsers.map(async (user) => {
        console.log(`➡️  Creating user: ${user.email}`);

        return prisma.user.upsert({
          where: { id: user.id },
          update: {},
          create: {
            id: user.id,
            email: user.email,
            password: user.password, // already hashed
            role: (user.role as Role) || Role.USER,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
            followers: user.followers,
            following: user.following,
            gameInterests: user.gameInterests || [],
            gameTags: user.gameTags || [],
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          },
        });
      }),
    );
  }

  if (config.defaultData) {
    await Promise.all(
      config.defaultData.map((item, index) => {
        console.log(`Adding stuff: ${item.name}`);

        return prisma.stuff.upsert({
          where: { id: index + 1 },
          update: {},
          create: {
            name: item.name,
            quantity: item.quantity,
            owner: item.owner,
            condition: (item.condition as Condition) || Condition.good,
          },
        });
      }),
    );
  }

  if (config.defaultGames) {
    await Promise.all(
      config.defaultGames.map((game) => {
        console.log(`Creating game: ${game.name}`);

        return prisma.game.upsert({
          where: { id: game.id },
          update: {},
          create: {
            id: game.id,
            name: game.name,
            description: game.description,
            picture: game.picture,
          },
        });
      }),
    );
  }

  if (config.defaultPosts) {
    await Promise.all(
      config.defaultPosts.map((post) => {
        console.log(`Creating post: ${post.id}`);

        return prisma.post.upsert({
          where: { id: post.id },
          update: {},
          create: {
            id: post.id,
            content: post.content,
            tags: post.tags || [],
            userID: post.userID,
            gameID: post.gameID,
            createdAt: new Date(post.createdAt),
          },
        });
      }),
    );
  }

  console.log('Database seeded successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
