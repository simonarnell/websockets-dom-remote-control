var id = 0;
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      layoutContent(JSON.parse(xhr.responseText));
    }
};
xhr.open("GET", "/js/flexbox.json", true);
xhr.send();

var flexboxManager = io.connect('/flexbox');
flexboxManager.on("1stContainer", function(event) {
  if(event=="new")
    document.getElementById("0").appendChild(document.createElement("IFRAME"));
  else if(event=="delete") {
	removeElement(document.getElementById("0").lastElementChild);
  }
});
flexboxManager.on("2ndContainer", function(event) {
  if(event=="new") {
    	var parent = document.getElementById("0").firstElementChild
		addElement(parent)
  } else if(event=="delete") {
	removeElement(document.getElementById("0").firstElementChild);
  }
});

function addElement(element) {
	  if(element.tagName=="IFRAME") {
	    var div = document.createElement("DIV");
		div.id=id++;
		element.parentElement.replaceChild(div, element);
		div.appendChild(element);
        div.appendChild(document.createElement("IFRAME"));
	  } else if(element.tagName=="DIV") {
        var iframe = document.createElement("IFRAME")
		iframe.id=id++
		element.appendChild(iframe)
	  }
}

function removeElement(element) {
  if(element.tagName=="DIV") {
    if(element.childElementCount > 2)
      element.removeChild(element.lastElementChild)
	else if(element.childElementCount == 2)
	  element.parentElement.replaceChild(element.firstElementChild,element)
  } else if(element.tagName=="IFRAME") {
    element.parentElement.removeChild(element);
  }
}

function layoutContent(descriptor) {
	processItem(descriptor, document.body)
}

function processItem(descriptor, parentElement) {
	var element;
  	if(descriptor.type == "container") {
	  element = document.createElement("DIV")
	  element.id = id++;
	  element.style.flexDirection = descriptor.flexDirection;
      for (item in descriptor.items) {
	    processItem(descriptor.items[item],element)
	  }
	} else if(descriptor.type == "item") {
      element = document.createElement("IFRAME")
	  element.id = id++;
	  element.src = descriptor.src;
	}
	element.style.flex = descriptor.flex;
	parentElement.appendChild(element);
}
