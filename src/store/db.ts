import * as low from 'lowdb'
// tslint:disable:no-submodule-imports
import * as FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db.json')

export default low(adapter)
