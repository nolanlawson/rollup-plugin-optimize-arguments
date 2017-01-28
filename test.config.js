import config from './src/index.js'

export default {
  entry: process.argv[process.argv.length - 1],
  plugins: [config()]
}

