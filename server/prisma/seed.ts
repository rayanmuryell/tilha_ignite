import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/rayanmuryell.png',
        }
    })

    const pool = await prisma.pool.create({

        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }

    })

    await prisma.game.create({

        data: {
            date: '2023-08-05T19:40:00.744Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }

    })

    await prisma.game.create({
        data: {
            date: '2023-08-05T20:40:00.744Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }

                }
            }

        },
    })
}


main ()


