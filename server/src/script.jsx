//dummy program to create Prisma client

/* this code has been deemed to be surplus to requirements,
considering i decided not to use prisma.
*/

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    const newFav = await prisma.favourites.create({
        data: {
            name: 'Rick Sanchez',
            url: 'https://rickandmortyapi.com/api/character/1',
        }
    })
  const allFavs = await prisma.favourites.findMany()
  console.log(allFavs)
}

main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })