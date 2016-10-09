var flexboxManager = io.connect('/flexbox');

window.onload = function() {
  var div = document.createElement("DIV");
  var button = document.createElement("BUTTON");
  var text = document.createTextNode("Add iFrame to 1st Level Container");
  button.appendChild(text);
  button.addEventListener("click", function() {
    flexboxManager.emit("1stContainer","new") 
  });
  div.appendChild(button);
  button = document.createElement("BUTTON");
  text = document.createTextNode("Add iFrame to 2nd Level Container");
  button.appendChild(text);
  button.addEventListener("click", function() {
    flexboxManager.emit("2ndContainer","new") 
  });
  div.appendChild(button);
  document.body.appendChild(div);
  
  div = document.createElement("DIV");
  button = document.createElement("BUTTON");
  text = document.createTextNode("Delete last iFrame from 1st Level Container");
  button.appendChild(text);
  button.addEventListener("click", function() {
    flexboxManager.emit("1stContainer","delete") 
  });
  div.appendChild(button);
  button = document.createElement("BUTTON");
  text = document.createTextNode("Delete last iFrame from 2nd Level Container");
  button.appendChild(text);
  button.addEventListener("click", function() {
    flexboxManager.emit("2ndContainer","delete") 
  });
  div.appendChild(button);
  document.body.appendChild(div);
  
};

