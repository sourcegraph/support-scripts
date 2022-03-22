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
      emails  {
        email
      }
      username
      eventLogs {
        nodes{
          name
         url
        }
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
async function find_users_who_accessed_pci(sg_host, sg_token, pci_repos) {
    const events = await fetch_all_events(sg_host, sg_token);
    const users = events.data.users.nodes.filter(u => u.eventLogs.nodes.find(e => pci_repos.find(repo => e.url.toLowerCase().indexOf(repo.toLowerCase()) != -1)));
    return users ? users.map(u => u.emails.map(e => e.email)) : [];
}
async function fetch_all_events(sg_host, sg_token) {
    const r = await make_request(sg_host, sg_token, FETCH_ALL_EVENTS);
    return await r.json();
}


find_users_who_accessed_pci('https://<$SOURCEGRAPH_URL>', '<$SOURCEGRAPH_APIKEY>', ['<$REPO_NAME_1>', '<$REPO_NAME_2>']).then(r => {
    console.log(JSON.stringify(r));
});
