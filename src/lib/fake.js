import faker from 'faker'
import {Chance} from 'chance'

let seed = Math.random();

export const chance = Chance(seed)
faker.seed(seed)

export function randomWords() {
  return faker.random.word()
}
