yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
mv daily "archive/$(date +'%F')"
npm i puppeteer
node script/main.js> daily