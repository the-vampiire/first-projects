function buildCard(){
    var table = document.getElementById("cardTable");
    var row = document.createElement("tr");
    var column = document.createElement("td");
    var card = document.createElement("div");
    var cardTop = document.createElement("div");
    var cardBottom = document.createElement("div");
card.setAttribute("id","card");
    cardTop.setAttribute("id","cardTop");
    cardBottom.setAttribute("id","cardBottom");
        card.appendChild(cardTop);
        card.appendChild(cardBottom);
row.appendChild(card);
table.appendChild(row);
}

function insImage(){
    var cardTop = document.getElementById("cardTop");
    var input = prompt("paste image link here");
    var image = document.createElement("IMG");
    image.setAttribute("src",""+input);
    cardTop.appendChild(image);
}

function insName(){
    var cardBottom = document.getElementById("cardBottom");
    var input = prompt("insert name here");
    cardBottom.innerHTML = input;
}

