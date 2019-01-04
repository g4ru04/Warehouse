:: @echo off
:: set nowHr=%time:~0,2%
:: if %nowHr% LSS 10 set nowHr=0%nowHr:~1,1%
:: echo %time:~0,2%

git add .
git commit -m "%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%"
git push
pause
