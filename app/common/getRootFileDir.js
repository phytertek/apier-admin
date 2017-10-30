const dirTree = __dirname.split('/');
const rootFileDir = dirTree.slice(0, dirTree.length - 3).join('/');
module.exports = { rootFileDir };
