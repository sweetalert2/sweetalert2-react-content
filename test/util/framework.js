/* global describe, expect, it */

const asyncIt = (desc, fn) => {
  it(desc, done => fn().then(done, done.fail))
}

export { describe, expect, asyncIt as it }
