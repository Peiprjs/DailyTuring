yesterday="$(date +'%Y-%m')-$(($(date +'%d')-1))"
mv today "archive/$yesterday" -f
echo "Moved yesterday's puzzle to $yesterday"
mkdir today
#-------------------------------------#
echo "Getting Criteria"
node scrapers/criteria.js> today/criteria
echo "Criteria run successfully"
#-------------------------------------#
echo "Getting Solution"
node scrapers/solution.js> today/solution
echo "Solution run successfully"
#-------------------------------------#
echo "Getting Verifiers"
node scrapers/verifiers.js> today/verifiers
echo "Verifiers run successfully"
#-------------------------------------#
echo "Getting Hash"
node scrapers/hash.js> today/hash
echo "Hash run successfully"
#-------------------------------------#
echo "Getting Score"
node scrapers/score.js> today/score
echo "Score run successfully"