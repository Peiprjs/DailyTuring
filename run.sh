yesterday="$(date +'%Y-%m')-$(($(date +'%d')-1)))"
echo "Moved yesterday's puzzle to $yesterday"
mv today "archive/$yesterday" -f
mkdir today
#------------------------------------#
echo "Downloading today's criteria"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/criteria" -P "today"
echo "Today's criteria has been downloaded successfully"
echo "Downloading today's verifiers"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/verifiers" -P "today"
echo "Today's verifiers has been downloaded successfully"
echo "Downloading today's solution"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/solution" -P "today"
echo "Today's solution has been downloaded successfully"
