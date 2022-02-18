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
		//TODO: know what element to create
		homeTeam = document.createElement("")
		awayTeam = document.createElement("")
		compName = document.createElement("")
		predictions = document.createElement("")
		drawChance = document.createElement("")
		twoPlusDraw = document.createElement("")
		teamOneWin = document.createElement("")
		teamTwoWin = document.createElement("")
		onePlusDraw = document.createElement("")

		homeTeam.innerText = games.home_team
		awayTeam.innerText = games.away_team
		compName.innerText = games.competition_name
		predictions.innerText = games.prediction
		drawChance.innerText = games.odds.X
		twoPlusDraw.innerText = games.odds.X2
		teamOneWin.innerText = games.odds[1]
		teamTwoWin.innerText = games.odds[2]
		onePlusDraw.innerText = games.odds['1X']

		//append to table 


		// console.log(predictions)
		// console.log(drawChance)
		// console.log(twoPlusDraw)
		// console.log(teamOneWin)
		// console.log(teamTwoWin)
		// console.log(onePlusDraw)

		homeTeamTable = document.createElement("td")
		awayTeamTable = document.createElement("td")
		compNameTable = document.createElement("td")
		predictionsTable = document.createElement("td")
		drawChanceTable = document.createElement("td")
		teamOneWinTable = document.createElement("td")
		teamTwoWinTable = document.createElement("td")
		onePlusDrawTable = document.createElement("td")
		twoPlusDrawTable = document.createElement("td")

		homeTeamTable.textContent = homeTeam
		awayTeamTable.textContent = awayTeam
		compNameTable.textContent = compName
		predictionsTable.textContent = predictions
		drawChanceTable.textContent = drawChance
		twoPlusDrawTable.textContent = twoPlusDraw
		teamOneWinTable.textContent = teamOneWin
		teamTwoWinTable.textContent = teamTwoWin
		onePlusDrawTable.textContent = onePlusDraw

		// row 1
		row1 = document.createElement("tr")
		row1.append(homeTeamTable,teamOneWinTable,onePlusDrawTable)

		//row2

		row2=document.createElement("tr")
		row2.append(awayTeamTable,teamTwoWinTable,twoPlusDrawTable,drawChanceTable)

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

		console.log(homeTeam)
		table.append(spacing,row1,row2)

	}

	function betSizing(){
		sizingForm = document.getElementById("bet-form")
		sizingInput = document.getElementById("sizing-input")
		oddsInput = document.getElementById("odds-input")

		bankroll = parseInt(sizingInput.value)
		odds = parseInt(oddsInput.value)

			if (odds <= 2){
				betSize = bankroll * 0.05
			} else {
				betSize = bankroll * 0.025
			}

			result = document.createElement("p")
			result.textContent = `$${betSize}`
			sizingForm.appendChild(result)
			e.target.reset()
		}