/*removeIf(production)*/
var objFrameworkDebug = new FrameworkDebug();
/*endRemoveIf(production)*/
var objFrameworkLayout = new FrameworkLayout();
var objFrameworkCarousel = new FrameworkCarousel();
var objFrameworkForm = new FrameworkForm();
var objFrameworkGeneric = new FrameworkGeneric();
var objFrameworkMenuDropDown = new FrameworkMenuDropDown();
var objFrameworkMenuTab = new FrameworkMenuTab();
var objFrameworkModal = new FrameworkModal();
var objFrameworkNotification = new FrameworkNotification();
var objFrameworkProgress = new FrameworkProgress();
var objFrameworkTag = new FrameworkTag();
var objFrameworkTable = new FrameworkTable();
var objFrameworkTooltip = new FrameworkTooltip();
var objFrameworkTranslation = new FrameworkTranslation();
var objFrameworkManagement = new FrameworkManagement();
var objTheme = new Theme();

if (objFrameworkLayout.verifyHasFodler('admin')) {
    var objFrameworkAdmin = new FrameworkAdmin();
    var objFrameworkAdminBlog = new FrameworkAdminBlog();
    var objFrameworkAdminPage = new FrameworkAdminPage();
    var objFrameworkLogin = new FrameworkLogin();
}

objFrameworkManagement.verifyLoad();