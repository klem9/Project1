	const matches = [];

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); 
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
				console.log(game)
				renderGame(game)
			})
			betSizing()
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

		console.log(predictions)
		console.log(drawChance)
		console.log(twoPlusDraw)
		console.log(teamOneWin)
		console.log(teamTwoWin)
		console.log(onePlusDraw)



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
		compNameTable.textContent = compName
		predictionsTable.textContent = predictions
		drawChanceTable.textContent = drawChance
		twoPlusDrawTable.textContent = twoPlusDraw
		teamOneWin.textContent = teamOneWin
		teamTwoWin.textContent = teamTwoWin
		onePlusDraw.textContent = onePlusDraw

		// row 1
		row1 = document.createElement("tr")
		row1.append(homeTeamTable,teamOneWinTable,onePlusDrawTable)

		table.append(row1)
	}

	function betSizing(){
		sizingForm = document.getElementById("betting_aid")
		sizingInput = document.getElementById("field_1")
		oddsInput = document.getElementById("field_2")

		sizingForm.addEventListener("submit",(e)=>{
			e.preventDefault()
			bankroll = parseInt(sizingInput.value)
			odds = parseFloat(oddsInput.value)

			console.log(bankroll)
			console.log(odds)

			if (odds <= 2){
				betSize = bankroll * 0.05
			} else {
				betSize = bankroll * 0.025
			}

			result = document.createElement("p")
			result.textContent = betSize
			sizingForm.appendChild(result)
			e.target.reset()
		})
	}

	function clickSubmit(){

	}