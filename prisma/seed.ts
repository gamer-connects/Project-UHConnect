import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Seed users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,

        // REQUIRED FIELDS
        username: account.email.split('@')[0], // Always derived
        updatedAt: new Date(),

        // NON-NULLABLE FIELDS
        followers: 0,
        following: 0,
        gameInterests: [],
        gameTags: [],

        // OPTIONAL
        bio: null,
        profileImage: '/profile.png',
      },
    });
  }

  // Seed Stuff
  for (const data of config.defaultData) {
    const condition = (data.condition as Condition) || Condition.good;

    console.log(`  Adding stuff: ${JSON.stringify(data)}`);

    prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
