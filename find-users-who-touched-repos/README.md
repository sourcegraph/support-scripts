# EventLogs Script

- A sample JavaScript program that calls into the API and pulls out the list of emails of any user who has had ANY interaction with the listed repos. 
- Author: Christy

## Steps
To set-up and run the program please do the following (will require NodeJS):
1. Create a new folder.
2. In that folder run: `npm init`
3. Accept all default values
4. Then run: `npm i node-fetch`
5. Then create a new file (called `audit.js`) and paste the contents of the script in it
6. Replace the values required on line 46 with your sourcegraph URL, an access token for the GraphQL API from your Sourcegraph instance, which can be generated at: https://sourcegraph.example.com/user/settings/tokens, and also the list of the name of repos to check for.
7. Run `node ./audit.js`
