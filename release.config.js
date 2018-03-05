/* eslint-disable no-template-curly-in-string */
/* eslint-env node */

const tarballDir = require('path').join(__dirname, 'tarball')

module.exports = {
  debug: true,
  prepare: [
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      assets: 'package.json',
      message: 'chore(release): ${nextRelease.version} [skip ci]',
    },
  ],
  publish: [
    {
      path: '@semantic-release/npm',
      tarballDir,
    },
    '@semantic-release/github',
  ],
}
