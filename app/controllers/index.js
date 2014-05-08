//////////////////////////////////////////////////
// Build View

// You can build accordion views from controllers

function makeLab(text, size, col, cls){
  return Titanium.UI.createLabel({
    width:  "70%",
    height: Ti.UI.SIZE,
    text:   text,
    font:   { fontSize:size, },
    color:  col,
    // classes:  [cls],
  });
}

msgs = [
  ["^ What is it?","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."],
  ["^ Why do we use it?","It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."],
  ["^ Where does it come from?",'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'],
  ["^ Where can I get some?","There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making lipsum.com the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."],
  ["^ The standard Lorem Ipsum passage","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
];

for (var i=0; i<msgs.length; i++){
  ///////
  // Make accordion view

  var title = msgs[i][0];
  var text  = msgs[i][1];

  // First child of this will be the clickable item
  var header = makeLab(title, 16, "#111", "toggleLab");
  header.applyProperties({class:"toggleLab"})
  // rest of children are hidden on clicks
  var body   = makeLab(text,  12, "#222", "lab");
  body.applyProperties({class:"lab"})
  // make parent
  var par = Titanium.UI.createView({
    width:       "80%",
    height:      Ti.UI.SIZE,
    layout:      "vertical", // <-- this is force set by the module anyway
    borderWidth: 2,
    borderColor: "yellow",
    accordion:   "true" // <------------------ Notice
  });
  par.accordion = "true";
  par.add(header);
  par.add(body);
  
  //////
  // Make spacer

  var spacer = Titanium.UI.createView({
    height: 10,
    width:  1,
  })

  //////
  // add to UI
  $.lorem.add(par);
  $.lorem.add(spacer);
}

$.img.image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'images/seinfeld.png');

// You can also build accordion views directly in a view
// click callback function for view element
function btn(e){
  alert("You clickied me!");
}

//////////////////////////////////////////////////
// setup

// Open (render) the window before running accordion.setup
$.win.open();

// require module
var accordion = require("accordion");

//////////////////////////////////////////////////
// define input parameters and run

function foldCallback(view){
  // this runs whenever an accordion view element is clicked
  // the "view" argument is the tag that has accordion="true" attached
  // example: use this to toggle an icon indicating expanded/collapsed state
  var child = view.getChildren()[0];
  var tx = child.text;
  if (tx[0] == "v"){
    tx = '^'+tx.slice(1);
  } else if (tx[0] == "^"){
    tx = "v"+tx.slice(1);
  };
  child.text = tx;
}

// define recursion depth when searching through Alloy view XML tree
var depth = -1 // no max depth

// initial state of the elements in the accordion menu
var startCollapsed = true;

// automatically add all event handlers and sizing logic to the defined elements
accordion.setup($.lorem, foldCallback, depth, startCollapsed);