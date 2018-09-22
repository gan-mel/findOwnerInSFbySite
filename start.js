const express = require('express');
const app = express();
const port = 3000;



app.get('/getCalendar/:site', function(req, res) {
    console.log("getEslCalender");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let query;
    let siteId = req.params.site;

    query = "SELECT User.email FROM AccountTeamMember " + "WHERE " + "Account.LPSiteID1__c = " + "'" + siteId + "'" + " AND TeamMemberRole = 'TAM' ";

    querySFDC(query, function(err, results) {
        if (err) {
            console.log('Error Connecting to SFDC');
            res.status(500).send(err);

        } else if (results[0]) {

            res.status(200).send(getUserName(results[0].User.Email))

        } else res.status(400).send("No ESL user for this account");

    });

})


function getUserName(email) {
    let userName;
    let clandlyUrl
    try {
        userName = email.split('@')[0];
        clandlyUrl = "https://calendly.com/" + userName + "/30min/?utm_campaign=calendly-chat"
    } catch (e) {
        console.error("no email")
    }
    return clandlyUrl;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
