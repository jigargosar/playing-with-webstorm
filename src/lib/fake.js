import faker from 'faker'

// export const chance = Chance()
// const seed = Math.random()
// export const chance = Chance(seed)
// faker.seed(seed)

export function randomWords() {
  return faker.random.word()
}
export function randomBoolean() {
  return faker.random.boolean()
}
export function randomArrayElement(array) {
  return faker.random.arrayElement(array)
}
