yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
echo "Moved yesterday's puzzle to $yesterday"
mv today "archive/$yesterday" -f
#------------------------------------#
echo "Downloading today's puzzle"
wget "https://raw.githubusercontent.com/Peiprjs/DailyTuring/refs/heads/main/today"
echo "Today has been downloaded successfully"
