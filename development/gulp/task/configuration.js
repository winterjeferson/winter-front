var projectAdress = 'E:/development/site/';
var projectVersion = '';
var projectName = 'framework/winter-front/';

module.exports = {
    projectAdress: projectAdress,
    projectVersion: projectVersion,
    projectName: projectName,
    branches: projectAdress + 'branches/' + projectName + projectVersion + 'development/',
    tags: projectAdress + 'branches/' + projectName + projectVersion + 'homologation/',
    trunk: projectAdress + 'branches/' + projectName + projectVersion + 'production/',
}