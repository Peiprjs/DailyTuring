yesterday="$(($(date +'%d')-1))-$(date +'%m-%Y')"
mv today "archive/$yesterday" -f
echo "Moved yesterday's puzzle to $yesterday"
#-------------------------------------#
echo "Getting Criteria"
node criteria.js> today/criteria
echo "Criteria run successfully"
echo "Getting Solution"
node solution.js> today/solution
echo "Solution run successfully"
echo "Getting Verifiers"
node verifiers.js> today/verifiers
echo "Verifiers run successfully"