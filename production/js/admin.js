class FrameworkAdmin{constructor(){objFrameworkDebug.debugMethod(this,"constructor"),this.pageCurrent=""}applyClass(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.updateVariable(),this.buildMenu(),this.buildMenuDifeneActive(),this.builTableTdWrapper()}updateVariable(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.$page=$("#admin"),this.$menuMain=this.$page.find('[data-id="menu_main"]'),this.$btPage=this.$page.find('[data-id="bt_page"]'),this.$btBlog=this.$page.find('[data-id="bt_blog"]'),this.$btLogout=this.$page.find('[data-id="bt_logout"]')}buildMenu(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.$menuMain.find(".bt").on("click",function(){let t=$(this).attr("data-id");e.buildMenuChangePage(t.substring(3))}),this.$btLogout.on("click",function(){e.buildLogout()})}buildMenuChangePage(e){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.buildMenuDifeneActive(e),"logout"!==e&&(window.location.href="admin/index.php?p="+e)}buildMenuDifeneActive(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=objFrameworkLayout.getUrlParameter("p");this.pageCurrent=e,this.$menuMain.find(".bt").parent().removeClass("menu-tab-active"),this.$menuMain.find('[data-id="bt_'+e+'"]').parent().addClass("menu-tab-active")}buildLogout(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),$.ajax({url:"../php/controller.php",data:"&c=FrameworkLogin&m=doLogout",success:function(e){switch(e){case"1":window.location="admin/index.php"}}})}builTableTdWrapper(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),$(".td-wrapper").unbind().on("click",function(){$(this).toggleClass("td-wrapper-auto")})}}class FrameworkAdminBlog{constructor(){objFrameworkDebug.debugMethod(this,"constructor"),this.isEdit=!1,this.editId=0}applyClass(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.updateVariable(),this.buildMenu(),this.buildMenuTable(),this.watchTitle()}updateVariable(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.$table=objFrameworkAdmin.$page.find(".table"),this.$tableActive=objFrameworkAdmin.$page.find('[data-id="table_active"]'),this.$tableInactive=objFrameworkAdmin.$page.find('[data-id="table_inactive"]'),this.$btRegister=objFrameworkAdmin.$page.find('[data-id="bt_register"]'),this.$formRegister=objFrameworkAdmin.$page.find('[data-id="form_register"]'),this.$formFieldTitle=objFrameworkAdmin.$page.find('[data-id="field_title"]'),this.$formFieldUrl=objFrameworkAdmin.$page.find('[data-id="field_url"]'),this.$formFieldContent=objFrameworkAdmin.$page.find('[data-id="field_content"]'),this.$formFieldTag=objFrameworkAdmin.$page.find('[data-id="field_tag"]')}buildMenu(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.$btRegister.on("click",function(){e.isEdit?e.editSave():e.registerContent()})}buildMenuTable(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.$table.find(".bt").unbind(),this.$tableActive.find('[data-action="inactivate"]').on("click",function(){objFrameworkModal.buildModal("confirmation","Deseja realmente desativar este conteúdo?"),objFrameworkModal.buildContentConfirmationAction("objFrameworkAdminBlog.modify("+$(this).attr("data-id")+', "inactivate")')}),this.$tableInactive.find('[data-action="activate"]').on("click",function(){e.modify($(this).attr("data-id"),"activate")}),this.$table.find('[data-action="edit"]').on("click",function(){e.editId=$(this).attr("data-id"),e.editLoadData(e.editId)}),this.$table.find('[data-action="delete"]').on("click",function(){objFrameworkModal.buildModal("confirmation","Deseja realmente desativar este conteúdo?"),objFrameworkModal.buildContentConfirmationAction("objFrameworkAdminBlog.delete("+$(this).attr("data-id")+")")})}editSave(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.validateForm()&&$.ajax({url:"../php/controller.php",data:"&c=FrameworkAdminBlog&m=doUpdate&title="+this.$formFieldTitle.val()+"&url="+this.$formFieldUrl.val()+"&content="+this.$formFieldContent.val()+"&tag="+this.$formFieldTag.val()+"&id="+e.editId,type:"POST",success:function(t){e.showResponse(t)}})}editLoadData(e){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let t=this;$.ajax({url:"../php/controller.php",data:"&c=FrameworkAdminBlog&m=editLoadData&id="+e,type:"POST",success:function(e){let o=$.parseJSON(e);objTheme.doSlide(t.$formRegister),t.isEdit=!0,t.editFillField(o)}})}editFillField(e){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.$formFieldTitle.val(e.title),this.$formFieldUrl.val(e.url),this.$formFieldContent.val(e.content),this.$formFieldTag.val(e.tag),this.editId=e.id}modify(e,t){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let o=this;$.ajax({url:"../php/controller.php",data:"&c=FrameworkAdminBlog&m=doModify&s="+t+"&id="+Number(e),type:"POST",success:function(e){o.showResponse(e)}})}delete(e){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let t=this;$.ajax({url:"../php/controller.php",data:"&c=FrameworkAdminBlog&m=doDelete&id="+Number(e),type:"POST",success:function(e){t.showResponse(e)}})}validateForm(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=[this.$formFieldTitle,this.$formFieldUrl,this.$formFieldContent,this.$formFieldTag];return objFrameworkForm.validateEmpty(e)}registerContent(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.validateForm()&&$.ajax({url:"../php/controller.php",data:"&c=FrameworkAdminBlog&m=doRegister&title="+this.$formFieldTitle.val()+"&url="+this.$formFieldUrl.val()+"&content="+this.$formFieldContent.val()+"&tag="+this.$formFieldTag.val(),type:"POST",success:function(t){e.showResponse(t)}})}showResponse(e){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let t="",o="";switch(e){case"1":location.reload();break;default:t="red",o="Acorreu um erro. Contate o administrador."}objFrameworkNotification.addNotification(o,t)}watchTitle(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.$formFieldTitle.on("focusout",function(){let t=objFrameworkGeneric.buildURL(e.$formFieldTitle.val());e.$formFieldUrl.val(t)})}}class FrameworkAdminPage{constructor(){objFrameworkDebug.debugMethod(this,"constructor")}applyClass(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),this.updateVariable()}updateVariable(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName())}}class FrameworkLogin{constructor(){objFrameworkDebug.debugMethod(this,"constructor"),this.isSignUp=!1,this.$page=$("#page_login"),this.$buttonLogin=$("#page_login_bt"),this.$fielEmail=$("#page_login_user"),this.$fieldPassword=$("#page_login_password")}buildMenu(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;this.$buttonLogin.on("click",function(){e.buildLogin()})}buildLoginPageLogin(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName()),""===this.$fielEmail.val()&&this.$fielEmail.focus()}buildLogin(){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let e=this;return""===this.$fielEmail.val()?(this.$fielEmail.focus(),this.buildLoginResponse("empty_email"),!1):""===this.$fieldPassword.val()?(this.buildLoginResponse("empty_password"),this.$fieldPassword.focus(),!1):(this.$buttonLogin.prop("disabled",!0),void $.ajax({url:"../php/controller.php",data:"&c=FrameworkLogin&m=doLogin&email="+this.$fielEmail.val()+"&password="+this.$fieldPassword.val(),type:"POST",success:function(t){e.$buttonLogin.prop("disabled",!1),e.buildLoginResponse(t)}}))}buildLoginResponse(e){objFrameworkDebug.debugMethod(this,objFrameworkDebug.getMethodName());let t="";switch(e){case"inactive":t=objFrameworkTranslation.translation.template.login_inactive;break;case"wrong_email":t=objFrameworkTranslation.translation.template.login_wrong_email,this.$fielEmail.focus();break;case"wrong_password":t=objFrameworkTranslation.translation.template.login_wrong_password,this.$fieldPassword.focus();break;case"empty_email":t=objFrameworkTranslation.translation.template.login_empty,this.$fielEmail.focus();break;case"empty_password":t=objFrameworkTranslation.translation.template.login_empty,this.$fieldPassword.focus();break;case"0":case"1":case"2":case"3":window.location="admin/index.php?p=page"}objFrameworkNotification.addNotification(t,"red",this.$page.find(".form-field:last"))}}