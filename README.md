# Welcome to the Daily Turing service
This service can be used to obtain in a machine-readable format the daily challenge for the board game Turing Machine. It will return both the criteria needed, (and in the future) the verifiers, as well as the solution.\
**NOTE**: Most browsers won't display the data, you need to curl or wget it instead.\
It runs daily at 03:00±00:05 UTC on a GitHub Runner.

## How to use it
### Get today's challenge
Simply head on to [daily-turing.peiphy.xyz/today/END](http://daily-turing.peiphy.xyz/today)\
There's three endpoints: criteria, verifiers, solution. Each one gives the information that their name implies, and can be accessed by replacing END in the URL: [daily-turing.peiphy.xyz/today/criteria](http://daily-turing.peiphy.xyz/today/criteria)

### Get a previous day's challenge
Simply head on to [daily-turing.peiphy.xyz/archive/YYYY-MM-DD/END](http://daily-turing.peiphy.xyz/archive/2024-11-03).
The three endpoints are the same as today's challenge.
