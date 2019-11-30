const testModules = [
  './StringSet.test.js',
  './State.test.js',
  './Item.test.js',
  './Items.test.js',
  './Player.test.js',
  './Game.test.js',
];

/* eslint-disable no-console */
(async () => {
  try {
    for (const testModule of testModules) {
      const { default: test } = await import(testModule);
      await test;
      console.log('OK', testModule);
    }
    console.log('\x1b[32mPassed!');
    process.exit(0);
  } catch (error) {
    if (error.code === 'ERR_ASSERTION') {
      console.table(error);
      console.log(error.stack);
    } else {
      console.error(error);
    }
    console.log('\x1b[31mFailed!');
    process.exit(1);
  }
})();
