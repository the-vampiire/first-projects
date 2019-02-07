function create(){
    var type = prompt("enter the type of element you would like to create\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t[h1-6, p, li etc]");
    var element = document.createElement(type);
    console.log(element); 
    var div = document.getElementById("element");
    var content = document.createTextNode(prompt("enter the content here"));
    element.appendChild(content);
    div.appendChild(element);
}

function edit(){
    var type = prompt("enter the element you would like to edit\n[h1 / p / li etc]");
    var element = document.getElementsByTagName(type);    
    var elemLength = element.length;
    if (element.length > 1){
        var elemNum = parseInt(prompt("insert element number to edit from 1 to "+elemLength))-1;
        var content = document.createTextNode(prompt("enter the new content here"));
        element[elemNum].innerHTML = "";
        element[elemNum].appendChild(content);
    }
    else{
         var content = document.createTextNode(prompt("enter the new content here")); 
    element[0].innerHTML = "";
    element[0].appendChild(content);
    }
}

function editColor(){
   var type = prompt("enter the element you would like to edit\n[h1 / p / li etc]");
    var element = document.getElementsByTagName(type);    
    var elemLength = element.length;
    if (element.length > 1){
        var elemNum = parseInt(prompt("insert element number to edit from 1 to "+elemLength))-1;
        var color = prompt("enter the new color here");
        element[elemNum].style.color = ""+color;
    }
    else{
         var color = prompt("enter the new color here"); 
    element[0].style.color = ""+color; 
} 
}

function editAlign(){
   var type = prompt("enter the element you would like to edit\n[h1 / p / li etc]");
    var element = document.getElementsByTagName(type);    
    var elemLength = element.length;
    if (element.length > 1){
        var elemNum = parseInt(prompt("insert element number to edit from 1 to "+elemLength))-1;
        var align = prompt("enter alignment here\n [left, center, right]");
        element[elemNum].style.textAlign = ""+align;
    }
    else{
         var align = prompt("enter alignment here\n [left, center, right]"); 
    element[0].style.textAlign = ""+align; 
} 
}



function editSize(){
   var type = prompt("enter the element you would like to edit\n[h1 / p / li etc]");
    var element = document.getElementsByTagName(type);    
    var elemLength = element.length;
    if (element.length > 1){
        var elemNum = parseInt(prompt("insert element number to edit from 1 to "+elemLength))-1;
        var size = parseInt(prompt("enter text size here"));
        element[elemNum].style.fontSize = ""+size+px;
    }
    else{
       var size = parseInt(prompt("enter text size here"));
    element[0].font.fontSize = 50; 
    } 
}