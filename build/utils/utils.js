/** @param {String} argv */
const TARGET_ARGV = argv => {
  return JSON.parse(process.env.npm_config_argv).original.includes(argv)
}

/** @desc returns the working directory path */
const ROOT_DIR = process.cwd()

module.exports = {
  TARGET_ARGV,
  ROOT_DIR
}
