import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {

  const bruno = await prisma.user.upsert({
    where: { email: 'bruno@prisma.io' },
    update: {},
    create: {
      email: 'bruno@teste.io',
      name: 'Bruno Landim',
      posts: {
        create: {
          title: 'Título do post do Bruno',
          content: 'Esse é o conteúdo do post do Bruno',
          published: true,
        },
      },
    },
  });

  const rafael = await prisma.user.upsert({
    where: { email: 'rafael@prisma.io' },
    update: {},
    create: {
      email: 'rafael@teste.io',
      name: 'Rafael Landim',
      posts: {
        create: {
          title: 'Título do post do Rafael',
          content: 'Esse é o conteúdo do post do Rafael',
          published: true,
        },
      },
    },
  });
  const marco = await prisma.user.upsert({
    where: { email: 'marco@prisma.io' },
    update: {},
    create: {
      email: 'marco@prisma.io',
      name: 'Marco',
      posts: {
        create: [
          {
            title: 'Título do post do Marco',
            content: 'Esse é o conteúdo do post do Marco',
            published: true,
          },
          {
            title: 'Título do post do Marco',
            content: 'Esse é o conteúdo do post do Marco 2',
            published: true,
          },
        ],
      },
    },
  });
  console.log({ bruno, rafael, marco });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });