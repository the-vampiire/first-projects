function h1Create(){
   var h1 = document.createElement("h1");
     h1.style.color = "blue";
    var h1Input = prompt("Insert header text here","");
    var h1Node = document.createTextNode(h1Input);
    h1.appendChild(h1Node);
   var divH1 = document.getElementById("divH1");
    divH1.appendChild(h1);    
}

function h1Edit(){
    var h1 = document.getElementsByTagName("h1"); 
    var h1Length = h1.length;
    var headNum = parseInt(prompt("enter the header you would like to edit from 1 to "+h1Length))-1;
    var h1New = document.createTextNode(prompt("Enter new header text here"));
    h1[headNum].innerHTML = ""; 
    h1[headNum].appendChild(h1New);  
}

function setColor(){
    var h1 = document.getElementsByTagName("h1");
    var h1Length = h1.length;
    var headNum = parseInt(prompt("enter the header you would like to edit from 1 to "+h1Length))-1;
    var newColor = prompt("enter new color here");
    h1[headNum].style.color = ""+newColor;
}

function setAlign(){
    var h1 = document.getElementsByTagName("h1");
    var h1Length = h1.length;
    var headNum = parseInt(prompt("enter the header you would like to edit from 1 to "+h1Length))-1;
    var align = prompt("type alignment (right, center, left)");
    h1[headNum].style.textAlign = ""+align;
}