var projectAdress = 'E:/development/site/';
var projectVersion = '';
var projectName = 'framework/winter-front/';

module.exports = {
    projectAdress: projectAdress,
    projectVersion: projectVersion,
    projectName: projectName,
    development: projectAdress + 'branches/' + projectName + projectVersion + 'development/',
    homologation: projectAdress + 'branches/' + projectName + projectVersion + 'homologation/',
    production: projectAdress + 'branches/' + projectName + projectVersion + 'production/',
}