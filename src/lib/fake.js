import faker from 'faker'
import {Chance} from 'chance'

export const chance = Chance()

export function randomWords() {
  return faker.random.word()
}
