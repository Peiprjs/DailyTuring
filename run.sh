yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
echo "Moved yesterday's puzzle to $yesterday"
mv daily "archive/$(date +'%F')"
echo "Running Main"
node main.js> daily
echo "Main run successfully"