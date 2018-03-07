/* eslint-disable no-template-curly-in-string */
/* eslint-env node */

module.exports = {
  debug: true,
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]',
    },
  ],
  publish: ['@semantic-release/npm', '@semantic-release/github'],
}
