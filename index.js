

const  Install  = require('./install.cjs')
const  Clean  = require('./clean.cjs').Clean
const  PreNew  = require('./preNew.cjs')
const  DeleteEmpty  = require('./deleteEmpty.cjs')
const  Zip  = require('./zip.cjs')

exports.Install = Install
exports.Clean = Clean
exports.PreNew = PreNew
exports.DeleteEmpty = DeleteEmpty
exports.Zip = Zip