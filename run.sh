yesterday="$(date +'%Y-%m')-$(($(date +'%d')-1))"
echo "Moved yesterday's puzzle to $yesterday"
mv today "archive/$yesterday" -f
mkdir today
#------------------------------------#
echo "Downloading today's criteria"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/criteria" -nv -P "today"
echo "Today's criteria has been downloaded successfully"
#------------------------------------#
echo "Downloading today's verifiers"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/verifiers" -nv -P "today"
echo "Today's verifiers has been downloaded successfully"
#------------------------------------#
echo "Downloading today's solution"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/solution" -nv -P "today"
echo "Today's solution has been downloaded successfully"
#------------------------------------#
echo "Downloading today's hash"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/hash" -nv -P "today"
echo "Today's hash has been downloaded successfully"
#------------------------------------#
echo "Downloading today's score"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today/score" -nv -P "today"
echo "Today's score has been downloaded successfully"