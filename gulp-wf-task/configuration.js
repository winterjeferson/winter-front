const allFile = '*.*';

module.exports = {
    src: `src/`,
    dist: `docs/`,
    theme: 'theme',
    plugin: 'plugin',
    index: 'index',
    allFile: allFile,
    allFolderFile: `**/${allFile}`,
    assets: 'assets/2-0-1/',
    prefix: 'wf-',
    ip: '127.0.0.1',
    port: '3015',
}