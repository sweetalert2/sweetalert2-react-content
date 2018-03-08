const asyncIt = (desc, fn) => {
  it(desc, done => fn().then(done, done.fail))
}

export { asyncIt as it }
