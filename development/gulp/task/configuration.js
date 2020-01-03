var projectAdress = 'E:/development/site/';
var projectVersion = '';
var projectName = 'framework/winter-front/';

module.exports = {
    projectAdress: projectAdress,
    projectVersion: projectVersion,
    projectName: projectName,
    branches: projectAdress + 'branches/' + projectName + projectVersion,
    branchesPublic: projectAdress + 'branches/' + projectName + projectVersion + 'public/',
    tags: projectAdress + 'tags/' + projectName + projectVersion,
    trunk: projectAdress + 'trunk/' + projectName + projectVersion,
}