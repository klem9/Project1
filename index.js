	const matches = [];

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	document.addEventListener("DOMContentLoaded", init())
	
	
	function init () {
		
		fetch(`https://football-prediction-api.p.rapidapi.com/api/v2/predictions?market=classic&iso_date=${today}&federation=UEFA`,{
		"method": "GET", 
		"headers": {
			"x-rapidapi-host": "football-prediction-api.p.rapidapi.com",
			"x-rapidapi-key": "8ddd62d75dmshd960cc6a985507ep15c490jsn88d06d6139b4"
		}
		})
		.then(response => response.json())
		.then(data => {
			data.data.forEach(game => {
				renderGame(game)
			})
		})
		.catch(err => {
			console.error(err);
		});
	}

	function renderGame(games){
		//TODO: make a little slot for each game 
		//include: home_team, away_team, competition_name, prediction, odds (win, loss, draw, ), start date
		// console.log(games.home_team)
		homeTeam = games.home_team
		awayTeam = games.away_team
		compName = games.competition_name
		predictions = games.prediction
		drawChance = games.odds.X
		twoPlusDraw = games.odds.X2
		teamOneWin = games.odds[1]
		teamTwoWin = games.odds[2]
		onePlusDraw = games.odds['1X']

	}

	function betSizing(){
		sizingForm = document.getElementById("bet-form")
		sizingInput = document.getElementById("sizing-input")
		oddsInput = document.getElementById("odds-input")

		bankroll = parseInt(sizingInput.value)
		odds = parseInt(oddsInput.value)

		if (odds <= 2){
			betSize = bankroll * 0.02
		} else {
			betSize = bankroll * 0.015
		}
	
	}

	// competition name , start date
	//home team 
	//away team 
	//prediction 