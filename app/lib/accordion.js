/////////////////////////////////
// Functions

// recursive function to grab all elements that have the
// "accordion='true'" attribute enabled
function treeSearch(root, depth) {
  // a card is a collapsable view
  // base cases
  if (!root) {
    // if root is empty
    return [];
  } else if (depth == 0) {
    return [];
  }
  // get children
  var children = root.getChildren();
  if (!children) {
    // we must be at a leaf.
    // check attribute
    var child = children;
    if (child.accordion == "true") {
      return [child];
    } else {
      return [];
    };
  } else {
    // else there are children afoot.
    var result = [];
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      depth = depth > 0 ? depth - 1 : depth;
      if (child.accordion == "true") {
        // add this child and search rest of tree
        result = result.concat([child]);
        result = result.concat(treeSearch(child, depth));
      } else {
        result = result.concat(treeSearch(child, depth));
      };
    };
    return result;
  };
}

// get height that elements occupy in a "layout=vertical" view
function getHeight(elems) {
  var maxHeight = 0;
  // loop through items
  for (var j = 0; j < elems.length; j++) {
    // convenienece vars
    var rect = elems[j].rect;
    var thisMaxHeight = rect.y + rect.height;
    // check that this element has been rendered
    if (thisMaxHeight) {
      var thisY = rect.y;
      var thisH = rect.height;
      maxHeight = thisMaxHeight > maxHeight ? thisMaxHeight : maxHeight;
    } else {
      // assume not all elements have been rendered yet
      return false;
    };
  };
  return maxHeight;
};

// initiate the module
function setup(root, cb, depth, collapse) {
  // root is the root of Alloy tags to check for accordian="true"
  // cb is a callback to run when click events are fired on the menu
  // depth is the depth of the view tree to search
  // startCollapsed indicated whether to auto collapse the menus or not
  // foldables are Alloy tags which have accordion="true"
  foldables = treeSearch(root, depth);
  // attach event listener for postlayout and custom callback
  for (var i = 0; i < foldables.length; i++) {
    foldee = foldables[i];
    foldee._cb = cb;
    foldee._collapse = collapse;
    foldee.addEventListener('postlayout', setAttributes);
    foldee.setLayout("vertical");
  };
}

/////////////////////////////////
// Events

// handle layout update
function setAttributes(e) {
  var foldee   = e.source;
  var children = foldee.getChildren();
  
  // get first child of this element
  var firstChild = children[0];
  var firstRect  = firstChild.rect;
  var colHeight  = firstRect.y + firstRect.height; // collapsed height
  // make sure first child has been rendered
  if (colHeight == 0) {
    return ;
  };
  
  // get height of children elements
  var expHeight = getHeight(children); // expanded height
  // make sure they have been rendered
  if (expHeight == 0) {
    return ;
  };

  // set properties for later
  foldee.colHeight = colHeight; // collapsed height
  foldee.expHeight = expHeight; // expanded height

  // remove this listener and add click listener
  foldee.removeEventListener('postlayout', setAttributes);
  firstChild.addEventListener('click',fold);
  if (foldee._collapse) {
    firstChild.fireEvent('click',{});
  };
}

// handle click event
function fold(e) {
  top = e.source;
  par = top.parent;
  // check if top is first child of tag that has accordion="true"
  if (par && par.accordion == "true" && top == par.getChildren()[0]) {
    chil = par.getChildren();
    // slice the first child
    body = chil.slice(1);
    for (var i = 0; i < body.length; i++) {
      var child = body[i];
      var isVisible = child.getVisible();
      child.setVisible(!isVisible);
      // this next step is needed only in android.
      if (isVisible) {
        // free up blank space after collapsing view
        par.setHeight(par.colHeight);
      } else {
        // expand height to show contents
        par.setHeight(par.expHeight);
      };
    };
    // fire the user's custom event
    par._cb(par);
  };
}

/////////////////////////////////
// Exports

// export the setup function
exports.setup = setup;