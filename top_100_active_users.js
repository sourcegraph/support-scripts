/*
 * Instructions:
 * =============
 * mkdir update_repos
 * cd update_repos
 * npm init -y
 * npm i node-fetch
 * 
 * <create a file called users.js and paste the contents of this gist in that file>
 * <modify line 62 to replace values with your SG domain name and a valid GraphQL token: https://sourcegraph.example.com/user/settings/tokens
 *
 * <run: node ./users.js>
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const FETCH_ALL_EVENTS = `
query {
    users(activePeriod: ALL_TIME) {
      nodes {
        username
        eventLogs {
          totalCount
        }
      }
    }
  }`;
async function make_request(sg_host, sg_token, query) {
    return await node_fetch_1.default(`${sg_host}/.api/graphql`, {
        method: 'post',
        headers: {
            Authorization: `token ${sg_token}`
        },
        body: JSON.stringify({
            query
        })
    });
}
async function get_users_event_count(sg_host, sg_token) {
    const events = await fetch_all_events(sg_host, sg_token);
    const users = events.data.users.nodes;
    var result = [];
    users.map(u => result.push([u.username, u.eventLogs.totalCount]))
    return result.sort((a, b) => b[1] - a[1]).slice(0, 99);
    
}
async function fetch_all_events(sg_host, sg_token) {
    try {
        const r = await make_request(sg_host, sg_token, FETCH_ALL_EVENTS);
        return await r.json();
    } catch(error) {
        console.log(error)
    }
}


get_users_event_count('https://<YOUR-SOURCEGRAPH-URL>', '<YOUR-SOURCEGRAPH-TOKEN>').then(r => {
    console.log(JSON.stringify(r));
});
