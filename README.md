# Welcome to the Daily Turing service
This service can be used to obtain in a machine-readable format the daily challenge for the board game Turing Machine. It will return both the criteria needed, (and in the future) the verifiers, as well as the solution.\
**NOTE**: Most browsers won't display the data, you need to curl or wget it instead.\
It runs daily at 03:00±00:05 UTC on a GitHub Runner.

## How to use it
### Endpoints
There's 5 endpoints: 
- `criteria`: This returns a JSON array with the criteria used for the selected challenge
- `verifiers`: This returns a JSON array with the verifiers used for the selected challenge
- `solution`: This returns a JSON array with the solution for the selected challenge
- `hash`: This returns a string with the hash of today's challenge 
- `score`: This returns a JSON array with the machine's score for the selected challenge

### Time selector
#### Get today's challenge
Simply head on to [daily-turing.peiphy.xyz/today/END](http://daily-turing.peiphy.xyz/today)\
Replacing END with your desired endpoint 

#### Get a previous day's challenge
Simply head on to [daily-turing.peiphy.xyz/archive/YYYY-MM-DD/END](http://daily-turing.peiphy.xyz/archive/2024-11-03).
Replacing END with your desired endpoint 
