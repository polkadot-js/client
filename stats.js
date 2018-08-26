const fs = require('fs');

const ROOT = '/Users/jacogreeff/.polkadot-js/chains/krummelanke-0x609ac0341c7cdee38e4ec08bc12b64cd83881a42929ede606fdb26cf16fd3f5a';

function calcDir (path, report) {
  const sizes = fs.readdirSync(path).map((name) => {
    const entry = `${path}/${name}`;
    const stats = fs.lstatSync(entry);

    return stats.isDirectory()
      ? calcDir(entry, false)
      : [1, stats.size];
  });

  return sizes.reduce(([count, total], size) => {
    return [count + size[0], total + size[1]];
  }, [0, 0]);
}

console.error(calcDir(`${ROOT}/block`, true));
console.error(calcDir(`${ROOT}/state`, true));

// [   614,554,   141,847,268 ]
// [ 6,602,481, 2,448,052,422 ]
