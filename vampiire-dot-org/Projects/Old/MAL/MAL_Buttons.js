// function to generate a list element per click
function makeAList(){
    var uList = document.createElement("ul");
    uList.id = "List";
    var list = document.createElement("li");
        uList.appendChild(list);
    var listOutput = document.getElementById("listOutput");
        listOutput.appendChild(uList);
    }      


// function to populate the generated list element by element
function popAList() {
  var list = document.getElementsByTagName("li");
  var insertText = function(i) {
    var input = prompt("Place list text below", "");
    // console.log(i);
    list[i].append(input);
  }
  
  for (var i = 0; i < list.length; i++)
  {
    setTimeout(insertText.bind(null, i), 1000);
  }
}

// function to edit the desired list item with user input text

function editAList(){
    var list = document.getElementsByTagName("li");
    var uList = document.getElementById("List");
    var listLength = list.length;
    var listNum = parseInt(prompt("Enter the list number you would like to edit. Any number from 1 to "+listLength))-1;
    var edit = document.createTextNode(prompt("Enter the new list text"));
    list[listNum].innerHTML="";
    list[listNum].appendChild(edit);   
}

