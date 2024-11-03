yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
mv daily "archive/$(date +'%F')"
echo "Running Main"
node main.js> daily
echo "Main run successfully"