yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
mv today "archive/$yesterday" -f
echo "Moved yesterday's puzzle to $yesterday"
#-------------------------------------#
echo "Getting Criteria"
node scrapers/criteria.js> today/criteria
echo "Criteria run successfully"
echo "Getting Solution"
node scrapers/solution.js> today/solution
echo "Solution run successfully"
echo "Getting Verifiers"
node scrapers/verifiers.js> today/verifiers
echo "Verifiers run successfully"
