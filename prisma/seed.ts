import { PrismaClient, Role, Condition } from '@prisma/client';
import config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // await prisma.post.deleteMany();
  // await prisma.event.deleteMany();
  // await prisma.eventRequest.deleteMany();
  // await prisma.stuff.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.game.deleteMany();

  /*
   GAMES
  */
  if (config.defaultGames?.length) {
    console.log('🎮 Seeding games...');
    await prisma.game.createMany({
      data: config.defaultGames.map((game) => ({
        id: game.id,
        title: game.title, // <-- JSON uses "name"
        description: game.description,
        image: game.image,
        type: 'GAME',
      })),
      skipDuplicates: true,
    });
  }

  /*
   USERS
  */
  if (config.defaultUsers?.length) {
    console.log('👤 Seeding users...');
    await prisma.user.createMany({
      data: config.defaultUsers.map((user) => ({
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role as Role,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage ?? '/profile.png',
        followers: user.followers ?? 0,
        following: user.following ?? 0,
        gameTags: user.gameTags ?? [],
        gameInterestIds: [], // MUST be number[]
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      })),
      skipDuplicates: true,
    });
  }

  /*
   STUFF
  */
  if (config.defaultData?.length) {
    console.log('📦 Seeding stuff...');
    await prisma.stuff.createMany({
      data: config.defaultData.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        owner: item.owner,
        condition: item.condition as Condition,
      })),
    });
  }

  /*
   POSTS (FK safe)
  */
  if (config.defaultPosts?.length) {
    console.log('📝 Seeding posts...');

    const users = await prisma.user.findMany({ select: { id: true } });
    const games = await prisma.game.findMany({ select: { id: true } });

    const userIds = new Set(users.map((u) => u.id));
    const gameIds = new Set(games.map((g) => g.id));

    const validPosts = config.defaultPosts.filter(
      (post) => userIds.has(post.userID) && gameIds.has(post.gameID),
    );

    await prisma.post.createMany({
      data: validPosts.map((post) => ({
        id: post.id,
        content: post.content,
        tags: post.tags ?? [],
        userID: post.userID,
        gameID: post.gameID,
        createdAt: new Date(post.createdAt),
      })),
      skipDuplicates: true,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
