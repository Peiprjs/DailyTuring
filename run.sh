yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
mv daily "archive/$(date +'%F')"
node main.js> daily
