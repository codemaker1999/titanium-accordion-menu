function Controller() {
    function treeSearch(root) {
        if (!root) return [];
        var children = root.getChildren();
        if (children) {
            var result = [];
            for (var i = 0; children.length > i; i++) {
                child = children[i];
                if ("true" == child.accordion) {
                    result = result.concat([ child ]);
                    result = result.concat(treeSearch());
                } else result = result.concat(treeSearch());
            }
            return result;
        }
        var child = children;
        return "true" == child.accordion ? [ child ] : [];
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
            }
            par._cb(par);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "misc/accrdn";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.setup = function(root, cb) {
        foldables = treeSearch(root, cb);
        for (var i = 0; foldables.length > i; i++) {
            foldee = foldables[i];
            foldee._cb = cb;
            foldee.addEventListener("click", fold);
            foldee.setLayout("vertical");
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;