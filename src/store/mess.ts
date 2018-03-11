import db from './db'

const MESS_KEY: keyof ApplicationGlobalState = 'mess'

/**
 * @desc Pushes a mess object to the array
 */
export const createMess = (messObj: Mess) => {
  console.log('creating a mess')

  db
    .get(MESS_KEY)
    .push(messObj)
    .write()
}

/**
 * @desc Gets the whole mess
 */
export const getMess = (): Mess[] => db.get(MESS_KEY).value()

export const updateMess = (
  id: Mess['id'],
  propName: keyof Mess,
  value: any
) => {
  console.log('mess updated')

  db
    .get(MESS_KEY)
    .find({ id })
    .set(propName, value)
    .write()
}

/**
 * @desc Removes mess obj based on criteria
 */
export const removeMess = (criteria: any) => {
  console.log('remove mess object/all objects')
  db
    .get(MESS_KEY)
    .remove(criteria)
    .write()
}
