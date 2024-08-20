console.log('start');

const tasks: Array<() => Promise<any>> = [
  () => Promise.resolve(42),
  () => new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, 1000)
  }),
]

async function runSequentially(tasks: Array<() => Promise<any>>): Promise<any[]>{
  const results = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

runSequentially(tasks).then(results => {
  console.log(results);
})
