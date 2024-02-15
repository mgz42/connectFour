//// CANVAS ////

const ctx = document.querySelector("canvas").getContext("2d");

const init = () => {
    window.requestAnimationFrame(draw);
}

let grid = [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],]
  
const draw = () => {
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 1200, 900);
    ctx.fillStyle = "rgb(0 0 0 / 10%)";
    ctx.fillRect(0, 0, 1200, 900)

    // les rows
    for(let i = 0; i < 6; i += 1) {
        // les tiles
        for(let n = 0; n < 7; n += 1) {
            const x = ((n * 100 / 7) * 12) + ((100 / 7) * 12)/ 2;
            const y = ((i * 100 / 6) * 8.8) + ((100 / 6) * 9.2)/ 2;
            ctx.beginPath();
            if (grid[i][n] === 1) {
                ctx.fillStyle = "#f19d69";
                ctx.strokeStyle = "#f19d69";
                
            } else if (grid[i][n] === 2) {
                ctx.fillStyle = "#6babff";
                ctx.strokeStyle = "#6babff";
            } else {
                ctx.fillStyle = "transparent";
                ctx.strokeStyle = "#373737";
            }
            ctx.arc(x, y, 60, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.fill();
        }
    }
  
    window.requestAnimationFrame(draw);
  }

init();

// CANVAS //


const startGame = () => {

    const saveScore = () => {
        const winner = currentPlayer === 1 ? document.querySelector("#cardleft .name").innerText 
        : document.querySelector("#cardright .name").innerText;

        if (localStorage.getItem(winner)) {
            const savedValue = String(Number(localStorage.getItem(winner)) + 1);
            console.log("saved", savedValue); // saving issue
            localStorage.setItem(winner, savedValue);
        } else {
            localStorage.setItem(winner, "1");
        }
    };

    const loadScore = () => {
        if (localStorage.getItem(document.querySelectorAll("#cardright h3")[0].innerText)) {
            document.querySelectorAll("#cardright h3")[1]
                .innerText = `${localStorage.getItem(document.querySelectorAll("#cardright h3")[0].innerText)} victory`;
        } else {
            document.querySelectorAll("#cardright h3")[1]
                .innerText = `0 victory`;
        }
        if (localStorage.getItem(document.querySelectorAll("#cardleft h3")[0].innerText)) {
            document.querySelectorAll("#cardleft h3")[1]
            .innerText = `${localStorage.getItem(document.querySelectorAll("#cardleft h3")[0].innerText)} victory`;
        } else {
            document.querySelectorAll("#cardleft h3")[1]
            .innerText = `0 victory`;
        }
    };

    const playerWon = () => {
        const winner = currentPlayer === 1 ? document.querySelector("#cardleft .name").innerText 
        : document.querySelector("#cardright .name").innerText;
        document.querySelector("#pop p").innerText = `${winner} has won !`;
        document.getElementById("pop-up").classList.remove("hidden");
    };

    const closePopUp = () => {
        document.getElementById("pop-up").classList.add("hidden");
    }

    const mainController = (e) => {
        if (e.key === "ArrowRight") {
            const active = document.querySelector(".active");
            Number(active.getAttribute("id")) > 6 ? document.getElementById("1").classList.add("active")
            : document.getElementById(String(Number(active.getAttribute("id")) + 1)).classList.add("active");
            active.classList.remove("active");
        } else if (e.key === "ArrowLeft") {
            const active = document.querySelector(".active");
            Number(active.getAttribute("id")) < 2 ? document.getElementById("7").classList.add("active")
            : document.getElementById(String(Number(active.getAttribute("id")) - 1)).classList.add("active");
            active.classList.remove("active");
        } else if (e.key === "Enter") {
            play(Number(document.querySelector(".active").getAttribute("id")));
        }
    };
    window.addEventListener("keydown", mainController);

    grid = [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],]
    let won = false;
    let currentPlayer = Math.floor(Math.random()*2) + 1;

    const loadplayer = () => {
        if (currentPlayer === 1) {
            document.getElementById("cardleft").classList.add("selectedPlayer");
            document.querySelector("#cardleft h4").classList.add("selectedTurn");
            document.getElementById("cardright").classList.remove("selectedPlayer");
            document.querySelector("#cardright h4").classList.remove("selectedTurn");
            document.querySelector(":root").style.setProperty('--current-player', '#f19d69');

        } else {
            document.getElementById("cardright").classList.add("selectedPlayer");
            document.querySelector("#cardright h4").classList.add("selectedTurn");
            document.getElementById("cardleft").classList.remove("selectedPlayer");
            document.querySelector("#cardleft h4").classList.remove("selectedTurn");
            document.querySelector(":root").style.setProperty('--current-player', '#6babff');
        }
    }

    loadplayer();
    loadScore();
    closePopUp();
    
    const hasWon = ([ver,hor]) => {
    
        // vertical
        let fours = 0;
        for(i = 0; i < 6; i += 1){
            if (grid[i][hor] === currentPlayer) {
                fours += 1;
                if (fours >= 4) { won = true; console.log("Vertical !")}
            } else {
                fours = 0;
            }
        }
    
        // horizontal
        fours = 0;
        for(i = 0; i < 7; i += 1){
            if (grid[ver][i] === currentPlayer) {
                fours += 1;
                if (fours >= 4) { won = true; console.log("Horizontal !")}
            } else {
                fours = 0;
            }
        }
    
        // left \ 
        let verStart = ver - hor;
        let horStart = 0;
        if (verStart < 0) {
            verStart = 0;
            horStart = Math.abs( ver - hor );
        }
        fours = 0;
        for(i = 0; i < 6; i += 1){
            if (grid[verStart + i] !== undefined) {
                if (grid[verStart + i][horStart + i] === currentPlayer) {
                    fours += 1;
                    if (fours >= 4) { won = true; console.log("Diagonal left !")}
                } else {
                    fours = 0;
                }
            }
        }
    
        // right /
        const correspondances = [[4,2],[5,1],[6,0]];
        if (hor !== 3) {
            correspondances.forEach((pair) => {
                if (hor === pair[0]) {
                    hor = pair[1];
                } else if (hor === pair[1]) {
                    hor = pair[0];
                }
            });
        }
        const reversedGrid = JSON.parse(JSON.stringify(grid));
        reversedGrid.map((line) => { line.reverse() });
        verStart = ver - hor;
        horStart = 0;
        if (verStart < 0) {
            verStart = 0;
            horStart = Math.abs( ver - hor );
        }
        fours = 0;
        for(i = 0; i < 6; i += 1){
            if (reversedGrid[verStart + i] !== undefined) {
                if (reversedGrid[verStart + i][horStart + i] === currentPlayer) {
                    fours += 1;
                    if (fours >= 4) { won = true; console.log("Diagonal right !")}
                } else {
                    fours = 0;
                }
            }
        }
    
        // Result
        return won;
    }

    const playerChange = () => {
        currentPlayer === 2 ? currentPlayer = 1 : currentPlayer = 2;
        loadplayer();
    }

    const play = (column) => {
        const horizontalPos = column;
        let verticalPos = 0;
        for(let i = 0; i < 5; i+= 1) {
            if(grid[verticalPos + 1][horizontalPos - 1] === 0){ verticalPos += 1 }
        }
        if (grid[verticalPos][horizontalPos - 1] === 0) { grid[verticalPos][horizontalPos - 1] = currentPlayer; }

        if (hasWon([verticalPos, horizontalPos - 1])) { 
            window.removeEventListener("keydown", mainController);
            // result
            playerWon();
            saveScore();
            } else {
                playerChange();
            }
        if (!grid[0].includes(0)) { 
            window.removeEventListener("keydown", mainController);
            startGame();
        }
    };

};

document.querySelector(".button").addEventListener("click", (e) => { startGame(); }, false);
document.querySelector(".reseter").addEventListener("click", (e) => { location.reload(); }, false);


// At Start 
const prepareMatch = (one, two) => {
    document.getElementById("landingPage").classList.add("hidden");
    document.querySelector(".un").style.backgroundImage = `url("${one.avatar_url}")`
    document.querySelectorAll("#cardleft h3")[0].innerText = one.login;
    document.querySelector(".deux").style.backgroundImage = `url("${two.avatar_url}")`
    document.querySelectorAll("#cardright h3")[0].innerText = two.login;
    startGame();
};

const action = () => {
    const urlOne = `https://api.github.com/users/${document.querySelector("#player1").value}`;
    const urlTwo = `https://api.github.com/users/${document.querySelector("#player2").value}`;
    fetch(urlOne)
        .then(response => response.json())
        .then((userOne) => {
            fetch(urlTwo)
                .then(response => response.json())
                .then((UserTwo) => {
                    prepareMatch(userOne, UserTwo);
                })
        })
}

document.querySelector("form").addEventListener("submit", (e) => {e.preventDefault(); action()}, false);
document.getElementById("eraseCache").addEventListener("click", (e) => {e.preventDefault(); localStorage.clear();})