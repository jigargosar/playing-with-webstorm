import * as nanoid from "nanoid";

export function Task({id=`task/${nanoid()}`, title, done, dueAt, createdAt}={}) {
  return {id,title,done,dueAt,createdAt}
}