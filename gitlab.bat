@echo off
git add .
set /p comment=Enter Comment
git commit -m comment
git push origin master
pause