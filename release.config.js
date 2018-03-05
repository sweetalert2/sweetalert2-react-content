/* eslint-disable no-template-curly-in-string */
/* eslint-env node */

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
  publish: ['@semantic-release/npm'],
}
