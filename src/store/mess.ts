import db from './db'

const MESS_KEY: keyof ApplicationGlobalState = 'mess'

export const createMess = (messObj: Mess) => {
  console.log('creating a mess')

  db
    .get(MESS_KEY)
    .push(messObj)
    .write()
}

export const getMess = (): any[] => db.get(MESS_KEY).value()

export const removeMess = (criteria: any) => {
  console.log('remove mess object/all objects')
  db
    .get(MESS_KEY)
    .remove(criteria)
    .write()
}
