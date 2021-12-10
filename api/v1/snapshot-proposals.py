#Library Imports

import requests
import json
import pandas as pd
import time

# Environment variables
load_dotenv()

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.end_headers()
    query = urlparse(self.path).query
    space_alias = parse_qs(query)["snapshotId"][0]

    #First 10 closed proposal

    query_proposal_closed = """query Proposals {
    proposals (
        first: 10,
        skip: 0,
        where: {
        space_in:"space_name",
        state: "closed"
        },
        orderBy: "created",
        orderDirection: desc
    ) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        space {
        id
        name
        }
    }
    } """.replace("space_name",space_alias)

    url = 'https://hub.snapshot.org/graphql?'
    r1 = requests.post(url, json={'query': query_proposal_closed})

    base_json = r1.json()['data']['proposals']

    # List of Proposals title
    list_proposal_closed_title = [base_json[i]['title'] for i in range(len(base_json))]

    #List of proposal date
    list_proposal_closed_end = [time.strftime("%d %b %Y", time.localtime(base_json[i]['end'])) for i in range(len(base_json))]

    #List of Proposal URL
    base_url = "https://snapshot.org/#/"
    url_list = [base_url + base_json[i]['space']['id'] + "/proposal/" + base_json[i]['id'] for i in range(len(base_json))]

    #List of the different choices for all the proposals
    choices_category = [base_json[i]['choices'] for i in range(len(base_json))]

    #Proposal Voting details

    proposal_id_list = [base_json[i]['id'] for i in range(len(base_json))]

    choices = []
    choices_value = []
    proposal_id_list = [base_json[i]['id'] for i in range(len(base_json))]

    for i in proposal_id_list:
        query = """query Votes {
        votes (
            first: 1000
            skip: 0
            where: {
            proposal: "proposal_id"
            }
            orderBy: "created",
            orderDirection: desc
        ) {
            id
            voter
            created
            proposal {
            id
            }
            choice
            space {
            id
            }
        }
        } """.replace("proposal_id",i)

        url = 'https://hub.snapshot.org/graphql?operationName=Votes'
        r = requests.post(url, json={'query': query})
        base_votes_json = r.json()['data']['votes']
        l1 = [base_votes_json[i]['choice'] for i in range(len(base_votes_json))]
        c = {}
        for j in set(l1):
            c[j]=0
        for j in l1:
            c[j] += 1 
        #choices.append(c.keys())
        choices_value.append(c.values())
        table_data = [list_proposal_closed_title, list_proposal_closed_end, url_list, choices_value, choices_category]

        self.wfile.write(json.dumps({"table_data": table_data}).encode())
        return
