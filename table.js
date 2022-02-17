"use strict";

// ** data from back-end **
const BET_SPORTS = [
    { 
        id: Math.random().toString(), 
        sport_name: "Football", 

        sport_bettings: [
            {
                bet_id: Math.random().toString(),
                bet_members: [
                    {
                        user_id: Math.random().toString(),
                        user_name: "Homeboyz",
                        event_amount: 0,
                    },
                    {
                        user_id: Math.random().toString(),
                        user_name: "Sdoos",
                        event_amount: 0,
                    },
                ],
                bet_time: "19:30",
                bet_win_1: "-",
                bet_draw: "-",
                bet_win_2: "-",
                bet_more: "0",
            },
            {
                bet_id: Math.random().toString(),
                bet_members: [
                    {
                        user_id: Math.random().toString(),
                        user_name: "Cercle Brugge",
                        event_amount: 2,
                    },
                    {
                        user_id: Math.random().toString(),
                        user_name: "Oud-Heverlee Leuven",
                        event_amount: 0,
                    },
                ],
                bet_time: "20:30",
                bet_win_1: "-",
                bet_draw: "-",
                bet_win_2: "-",
                bet_more: "+18",
            },
            {
                bet_id: Math.random().toString(),
                bet_members: [
                    {
                        user_id: Math.random().toString(),
                        user_name: "Union Saint-Gilloise",
                        event_amount: 0,
                    },
                    {
                        user_id: Math.random().toString(),
                        user_name: "Club Brugge",
                        event_amount: 1,
                    },
                ],
                bet_time: "15:30",
                bet_win_1: "1.00",
                bet_draw: "2.00",
                bet_win_2: "3.00",
                bet_more: "+3",
            },
          {
                bet_id: Math.random().toString(),
                bet_members: [
                    {
                        user_id: Math.random().toString(),
                        user_name: "Homeboyz",
                        event_amount: 0,
                    },
                    {
                        user_id: Math.random().toString(),
                        user_name: "Sdoos",
                        event_amount: 0,
                    },
                ],
                bet_time: "19:30",
                bet_win_1: "-",
                bet_draw: "-",
                bet_win_2: "-",
                bet_more: "0",
            },
            {
                bet_id: Math.random().toString(),
                bet_members: [
                    {
                        user_id: Math.random().toString(),
                        user_name: "Cercle Brugge",
                        event_amount: 2,
                    },
                    {
                        user_id: Math.random().toString(),
                        user_name: "Oud-Heverlee Leuven",
                        event_amount: 0,
                    },
                ],
                bet_time: "20:30",
                bet_win_1: "-",
                bet_draw: "-",
                bet_win_2: "-",
                bet_more: "+18",
            },
            {
                bet_id: Math.random().toString(),
                bet_members: [
                    {
                        user_id: Math.random().toString(),
                        user_name: "Union Saint-Gilloise",
                        event_amount: 0,
                    },
                    {
                        user_id: Math.random().toString(),
                        user_name: "Club Brugge",
                        event_amount: 1,
                    },
                ],
                bet_time: "15:30",
                bet_win_1: "1.00",
                bet_draw: "2.00",
                bet_win_2: "3.00",
                bet_more: "+3",
            },
        ],
        sport_icon: "https://cdn.picpng.com/football/small/icon-football-36206.png",
    },
];

// ** end **

// ** handle tabs and their content **
const showSelectedTabContent = (selected = 0) => {
    const selectedContentClassName = "active";

    const topBarTabs = document.getElementsByClassName("tab");
    const mainContents = document.getElementsByClassName("content");
    
    topBarTabs[selected].classList.add(selectedContentClassName);
    mainContents[selected].classList.add(selectedContentClassName);
    
    for (let i = 0; i < topBarTabs.length; i++) {
        topBarTabs[i].addEventListener("click", () => {
            for (let j = 0; j < topBarTabs.length; j++) {
                topBarTabs[j].classList.remove(selectedContentClassName);
                mainContents[j].classList.remove(selectedContentClassName);
            }

            topBarTabs[i].classList.add(selectedContentClassName);
            mainContents[i].classList.add(selectedContentClassName);
        });
    }

};

showSelectedTabContent(0);
// ** end **

// ** create table for each bet. sport
const createBetTable = (sportName = "", bettings = [], sportIconUrl = "") => {
    const nowContent = document.getElementById("now_cnt");

    const betTableAccordion = document.createElement("button");
    betTableAccordion.className = "accord";
    betTableAccordion.innerHTML = `
        <div>
          <i class="fas fa-chevron-up"></i>
          <span> ${sportName} (${bettings.length}) </span>
        </div>
        <div class="sport-icon">
            <img src=${sportIconUrl} />            
        </div>
    `;
    
    const betTableContainer = document.createElement("div");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `
        <tr>
            <th align="left" colspan="2"> Event </th>
            <th colspan="7"> Time </th>
            <th> Win </th>
            <th> Win + Draw </th>
            <th> Draw </th>
        </tr>
    `;

    tbody.innerHTML = bettings.map(betting => {
        return (
            `
                <tr>
                    <td  colspan="2">
                        ${betting.bet_members.map(member => {
                            return `<p> ${member.event_amount} ${member.user_name} </p>`;
                        }).join(" ")} 
                    </td>
                    <td colspan="7"> ${betting.bet_time} </td>
                    <td> <span class="minus"> ${betting.bet_win_1} </span> </td>
                    <td> <span class="minus"> ${betting.bet_draw} </span> </td>
                    <td> <span class="minus"> ${betting.bet_win_2} </span> </td>
                    <td> <span class="plus"> ${betting.bet_more} </span> </td>
                </tr>
            `
        );
    }).join(" ");

    table.appendChild(thead);
    table.appendChild(tbody);
    betTableContainer.appendChild(table);
  
    const betTableViewButn = document.createElement("button");

    betTableViewButn.className = "view-butn";
    betTableViewButn.innerHTML = `<div class="view-icon"> <i class="fas fa-chevron-down"></i> </div>`;
  
    nowContent.appendChild(betTableAccordion);
    nowContent.appendChild(betTableContainer);
    nowContent.appendChild(betTableViewButn);
};

BET_SPORTS.forEach(sport => createBetTable(sport.sport_name, sport.sport_bettings, sport.sport_icon));
// ** end **

// ** toggle accordions 
const accordions = document.getElementsByClassName("accord");

for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", (evt) => {

         evt.currentTarget.classList.toggle("active");
        
        const panel = evt.currentTarget.nextElementSibling;
        const viewButn = panel.nextElementSibling;
        
        if (panel.style.display === "none" && viewButn.style.display === "none") {
            panel.style.display = "block";
            viewButn.style.display = "flex";
        } else {
            panel.style.display = "none";
            viewButn.style.display = "none";
        }

    });
}
// ** end **

// ** show and hide table data handling
const viewMoreButns = document.getElementsByClassName("view-butn");

for(let i = 0; i < viewMoreButns.length; i++) {
    viewMoreButns[i].addEventListener("click", (evt) => {

        evt.currentTarget.classList.toggle("active");
        
        const table = evt.currentTarget.previousElementSibling;

        if (table.style.maxHeight === "100%") {
            table.style.maxHeight = "300px";
        } else {
            table.style.maxHeight = "100%";
        }

    });
}
// ** end **
