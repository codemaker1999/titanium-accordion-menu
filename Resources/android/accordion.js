function treeSearch(root, depth) {
    if (!root) return [];
    if (0 == depth) return [];
    var children = root.getChildren();
    if (children) {
        var result = [];
        for (var i = 0; children.length > i; i++) {
            child = children[i];
            depth = depth > 0 ? depth - 1 : depth;
            if ("true" == child.accordion) {
                result = result.concat([ child ]);
                result = result.concat(treeSearch(child, depth));
            } else result = result.concat(treeSearch(child, depth));
        }
        return result;
    }
    var child = children;
    return "true" == child.accordion ? [ child ] : [];
}

function getHeight(elems) {
    var maxHeight = 0;
    for (var j = 0; elems.length > j; j++) {
        var rect = elems[j].rect;
        var thisMaxHeight = rect.y + rect.height;
        if (!thisMaxHeight) return false;
        rect.y;
        rect.height;
        maxHeight = thisMaxHeight > maxHeight ? thisMaxHeight : maxHeight;
    }
    return maxHeight;
}

function setup(root, depth, collapse, cb) {
    foldables = treeSearch(root, depth);
    for (var i = 0; foldables.length > i; i++) {
        foldee = foldables[i];
        foldee._cb = cb;
        foldee._collapse = collapse;
        foldee.addEventListener("postlayout", setAttributes);
        foldee.setLayout("vertical");
    }
}

function setAttributes(e) {
    var foldee = e.source;
    var children = foldee.getChildren();
    var firstChild = children[0];
    var firstRect = firstChild.rect;
    var colHeight = firstRect.y + firstRect.height;
    if (0 == colHeight) return;
    var expHeight = getHeight(children);
    if (0 == expHeight) return;
    foldee.colHeight = colHeight;
    foldee.expHeight = expHeight;
    foldee.removeEventListener("postlayout", setAttributes);
    firstChild.addEventListener("click", fold);
    foldee._collapse && firstChild.fireEvent("click", {});
}

function fold(e) {
    top = e.source;
    par = top.parent;
    if (par && "true" == par.accordion && top == par.getChildren()[0]) {
        chil = par.getChildren();
        body = chil.slice(1);
        for (var i = 0; body.length > i; i++) {
            var child = body[i];
            var isVisible = child.getVisible();
            child.setVisible(!isVisible);
            isVisible ? par.setHeight(par.colHeight) : par.setHeight(par.expHeight);
        }
        par._cb(par);
    }
}

exports.setup = setup;