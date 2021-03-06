'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Emotion = require('../server/db/models/emotion')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  const [cody] = users
  const emotion = await Emotion.create({
    angry: 0,
    disgusted: 0,
    fearful: 0,
    happy: 0,
    neutral: 0.8048780487804879,
    sad: 0.17073170731707318,
    surprised: 0.024390243902439025,
    transcript: 'HI IM CODY IM A DOG HIRE ME ILL DO A GOOD JOB WOOF'
  })
  await cody.addEmotion(emotion)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
