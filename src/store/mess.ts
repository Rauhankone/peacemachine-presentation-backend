import db from './db'

const MESS_KEY = 'mess'

export const createMess = (messObj: Mess) => {
  console.log('creating a mess')

  db
    .get(MESS_KEY)
    .push(messObj)
    .write()
}

export const appendToMess = (discussionObj: any) => {
  let tempArr = getMess()
  if (!tempArr) {
    console.log('Mess not found in database!')
    return
  }
  tempArr.push(discussionObj)
  db
    .get(MESS_KEY)
    .set('messObjArr', tempArr)
    .write()
}

export const getMess = (): any[] => db.get(MESS_KEY).value()
