const execa = require('execa');
const express = require('express');
const router = express.Router();
const os = require('os');
const fs = require('fs');
const path = require('path');
const jssearch = require('js-search');

const REPO_PATH = 'tmp';

let allBuildpacks = [];
let index = buildSearchIndex(allBuildpacks);

// Poll the repo every 60 seconds
(async () => {
  while (true) {
    console.log('trying to update registry-index repo');
    const success = await createUpdateRepo(REPO_PATH);
    if (success) {
      allBuildpacks = getNormalisedRegistry(REPO_PATH);
      index = buildSearchIndex(allBuildpacks);
    }
    await sleep(60000);
  }
})();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* GET buildpacks. */
router.get('/', function(req, res, next) {
  (async () => {
    const matches = req.query.matches;
    if (matches) {
      res.send(index.search(matches));
    } else {
      res.send(allBuildpacks);
    }
  })();
});

function getNormalisedRegistry(registryPath) {
  const files = fs.readdirSync(registryPath);

  // Pre-filter all hidden files/dirs and files at the root level
  let dirsBuffer = files.filter(file => {
    return file[0] !== '.' && fs.statSync(path.join(registryPath, file)).isDirectory();
  }).map(filename => path.join(registryPath, filename));

  let registry = [];
  while(dirsBuffer.length > 0) {
    let tempBuffer = [];

    dirsBuffer.forEach(file => {
      if (fs.statSync(file).isDirectory()) {
        const childrenFiles = fs.readdirSync(file);
        childrenFiles.forEach(childFile => {
          tempBuffer.push(path.join(file, childFile));
        });
      } else {
        const registryFile = fs.readFileSync(file, 'UTF-8');
        registry = registry.concat(registryFile.split(os.EOL).map(line => {
          try {
            return Object.assign(JSON.parse(line), {
              description: '',
              license: ''
            });
          } catch (error) {
            // Do nothing
          }
        }).filter(element => !!element));
      }

      dirsBuffer = tempBuffer;
    });
  }

  return registry;
}

function buildSearchIndex(buildpacks) {
  const searchIndex = new jssearch.Search('addr');
  searchIndex.addIndex('ns');
  searchIndex.addIndex('name');
  searchIndex.addDocuments(buildpacks);

  return searchIndex;
}

async function createUpdateRepo(repoPath) {
  try {
    if (fs.existsSync(repoPath)) {
      try {
        await execa('git', ['-C', `${repoPath}`, 'pull']);
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      fs.mkdirSync(repoPath);
      await execa('git', ['clone', 'https://github.com/buildpacks/registry-index.git', `${repoPath}`]);
    }
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
}

module.exports = router;
