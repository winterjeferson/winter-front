@RD /S /Q "E:\gulp\task"
IF not exist E:\gulp\task (mkdir E:\gulp\task)
COPY E:\development\site\branches\framework\winter-front\gulp\gulpfile.js  E:\gulp\
COPY E:\development\site\branches\framework\winter-front\gulp\package.json  E:\gulp\
XCOPY E:\development\site\branches\framework\winter-front\gulp\task  E:\gulp\task 
CD E:\gulp\
START /MAX cmd.exe /K gulp
START /MAX /WAIT "" "E:\gulp"
START /MAX /WAIT "" "E:\development\site\branches\framework\winter-front\"
START /MAX /WAIT "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --auto-open-devtools-for-tabs "http://localhost/e/development/site/branches/framework/winter-front/public"
START "" "C:\Users\jeferson.winter\AppData\Local\Programs\Microsoft VS Code\Code.exe"