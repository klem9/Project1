const moment = require("moment-timezone");
const axios = require("axios");

const API_TZ = "Europe/London";
const LOCAL_TZ = "Europe/Rome";

// read the current time in the API timezone
const now = moment.tz(API_TZ);
const tomorrow = now.add(1, "days");

const predictionEndpoint = "https://football-prediction-api.p.rapidapi.com/api/v2/predictions";
// setting our API key for auth
// this info should be kept out of public git or other versioning software
const authHeader = {
    "8ddd62d75dmshd960cc6a985507ep15c490jsn88d06d6139b4": process.env.RAPIDAPI_KEY
}
const params = {
    iso_date: tomorrow.format("YYYY-MM-DD"), // transforming to ISO format.
    federation: "UEFA",
    market: "classic"
}

const opts = {
    method: "GET",
    headers: authHeader,
    params: params
}

axios
    .get(predictionEndpoint, opts)
    .then(response => {
        const json = response.data;

        json.data.sort((a, b) => {
            // sort ascending by start_date
            if (a.start_date > b.start_date)
                return 1;
            if (a.start_date < b.start_date)
                return -1;
            return 0;
        });

        json.data.forEach(match => {
            const locStartDate = moment.tz(match.start_date, API_TZ).tz(LOCAL_TZ);
            let winOdds;

            if (match.odds && match.prediction in match.odds) {
                winOdds = (
                    match.odds[match.prediction] !== null ?
                        match.odds[match.prediction].toFixed(2)
                        : ""
                );
            } else {
                // Not able to see odds as the subscription plan does not support it.
                // or current match does not have the odds available for this prediction
                winOdds = "n/a";
            }
            console.log(`${locStartDate}\t${match.home_team} vs ${match.away_team}\t${match.prediction} @ ${winOdds}`)
        })
    })
    .catch(err => {
        console.log(err.message);
    });


// Handling Parlay / Straight

// function handleColor(value){
//     if (value === prio.options[0].value) {
//     } li.style.color = "red";
//     if (value === prio.options[1].value) {
//     li.style.color = "orange";
//     } if(value === prio.options[2].value) { 
//     li.style.color = "yellow"; }
// }
// }