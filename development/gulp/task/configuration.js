// var projectAdress = 'E:/development/site/branches/';
var projectAdress = 'D:/development/project/';
var projectVersion = '';
// var projectName = 'framework/winter-front/';
var projectName = 'winter-front/';

module.exports = {
    projectAdress: projectAdress,
    projectVersion: projectVersion,
    projectName: projectName,
    development: projectAdress + projectName + projectVersion + 'development/',
    homologation: projectAdress + projectName + projectVersion + 'homologation/',
    production: projectAdress + projectName + projectVersion + 'production/',
}