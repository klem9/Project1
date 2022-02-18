	const matches = [];

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;
	console.log(today)

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
				console.log(game)
				renderGame(game)
			})
		})
		.catch(err => {
			console.error(err);
		});
	}

	function renderGame(games){
		table = document.getElementById('result-table')

		homeTeam = games.home_team
		awayTeam = games.away_team
		compName = games.competition_name
		predictions = games.prediction
		drawChance = games.odds.X
		twoPlusDraw = games.odds.X2
		teamOneWin = games.odds[1]
		teamTwoWin = games.odds[2]
		onePlusDraw = games.odds['1X']

		homeTeamTable = document.createElement("td")
		awayTeamTable = document.createElement("td")
		compNameTable = document.createElement("td")
		predictionsTable = document.createElement("td")
		drawChanceTable = document.createElement("td")
		twoPlusDrawTable = document.createElement("td")
		teamOneWinTable = document.createElement("td")
		teamTwoWinTable = document.createElement("td")
		onePlusDrawTable = document.createElement("td")

		homeTeamTable.textContent = homeTeam
		awayTeamTable.textContent = awayTeam
		compNameTable.textContent = `League: ${compName}`
		predictionsTable.textContent = `Prediction: ${predictions}`
		drawChanceTable.textContent = drawChance
		twoPlusDrawTable.textContent = twoPlusDraw
		teamOneWinTable.textContent = teamOneWin
		teamTwoWinTable.textContent = teamTwoWin
		onePlusDrawTable.textContent = onePlusDraw


		// row 1
		row1 = document.createElement("tr")
		row1.append(homeTeamTable,teamOneWinTable,onePlusDrawTable)

		//row2

		row2 = document.createElement("tr")
		row2.append(awayTeamTable,teamTwoWinTable,twoPlusDrawTable,drawChanceTable)

		//row 3
		row3 = document.createElement("tr")
		row3.append(compNameTable,predictionsTable)


		spacing = document.createElement("thead")
		spacingTr = document.createElement("tr")
		spacing.appendChild(spacingTr)
		spacingTh1 = document.createElement("th")
		spacingTh1.innerText = "Teams"
		spacingTh2 = document.createElement("th")
		spacingTh2.innerText = "Win"
		spacingTh3 = document.createElement("th")
		spacingTh3.innerText = "Win+Draw"
		spacingTh4 = document.createElement("th")
		spacingTh4.innerText = "Draw"

		spacingTr.append(spacingTh1,spacingTh2,spacingTh3,spacingTh4)

		table.append(spacing,row1,row2,row3)

	}

	function betSizing(){
		sizingForm = document.getElementById("bet-form")
		sizingInput = document.getElementById("sizing-input")
		oddsInput = document.getElementById("odds-input")

		bankroll = parseInt(sizingInput.value)
		odds = parseFloat(oddsInput.value)
		sizingForm.addEventListener("submit",(e)=>{
			
			if (odds <= 2){
				betSize = bankroll * 0.05
			} else {
				betSize = bankroll * 0.025
			}

			result = document.createElement("p")
			result.textContent = `$${betSize}`
			sizingForm.appendChild(result)
			e.target.reset()
		})
	}