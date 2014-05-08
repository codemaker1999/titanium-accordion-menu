function Controller() {
    function makeLab(text, size, col) {
        return Titanium.UI.createLabel({
            width: "70%",
            height: Ti.UI.SIZE,
            text: text,
            font: {
                fontSize: size
            },
            color: col
        });
    }
    function btn() {
        alert("You clickied me!");
    }
    function foldCallback(view) {
        var child = view.getChildren()[0];
        var tx = child.text;
        "v" == tx[0] ? tx = "^" + tx.slice(1) : "^" == tx[0] && (tx = "v" + tx.slice(1));
        child.text = tx;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "green",
        layout: "vertical",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#000",
        backgroundColor: "red",
        text: "Accordion View Demo",
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.lorem = Ti.UI.createScrollView({
        height: Ti.UI.SIZE,
        width: "90%",
        layout: "vertical",
        backgroundColor: "blue",
        id: "lorem"
    });
    $.__views.win.add($.__views.lorem);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: 10,
        width: 1,
        id: "__alloyId1"
    });
    $.__views.lorem.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#000",
        backgroundColor: "red",
        text: "Manual XML markup Example",
        id: "__alloyId2"
    });
    $.__views.lorem.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: 10,
        width: 1,
        id: "__alloyId3"
    });
    $.__views.lorem.add($.__views.__alloyId3);
    $.__views.manual = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: "80%",
        borderWidth: 2,
        borderColor: "yellow",
        id: "manual",
        accordion: "true"
    });
    $.__views.lorem.add($.__views.manual);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#120",
        backgroundColor: "purple",
        text: "^ Click here to toggle",
        id: "__alloyId4"
    });
    $.__views.manual.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#000",
        backgroundColor: "red",
        text: "We will test some random views here",
        id: "__alloyId5"
    });
    $.__views.manual.add($.__views.__alloyId5);
    $.__views.img = Ti.UI.createImageView({
        width: "80%",
        id: "img"
    });
    $.__views.manual.add($.__views.img);
    $.__views.textarea = Ti.UI.createTextArea({
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        hintText: "Enter info...",
        width: "75%",
        height: "70",
        id: "textarea"
    });
    $.__views.manual.add($.__views.textarea);
    $.__views.nested = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: "75%",
        backgroundColor: "#fafcfe",
        borderWidth: 1,
        borderColor: "yellow",
        id: "nested",
        accordion: "true"
    });
    $.__views.manual.add($.__views.nested);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#120",
        backgroundColor: "purple",
        text: "^ NESTED HEADING",
        id: "__alloyId6"
    });
    $.__views.nested.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#000",
        backgroundColor: "red",
        text: "NESTED BODY VIEW",
        id: "__alloyId7"
    });
    $.__views.nested.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Clicky",
        id: "__alloyId8"
    });
    $.__views.manual.add($.__views.__alloyId8);
    btn ? $.__views.__alloyId8.addEventListener("click", btn) : __defers["$.__views.__alloyId8!click!btn"] = true;
    $.__views.__alloyId9 = Ti.UI.createView({
        height: 10,
        width: 1,
        id: "__alloyId9"
    });
    $.__views.lorem.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: "75%",
        height: Ti.UI.SIZE,
        color: "#000",
        backgroundColor: "red",
        text: "Lorem Ipsum (lipsum.com)",
        id: "__alloyId10"
    });
    $.__views.lorem.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: 10,
        width: 1,
        id: "__alloyId11"
    });
    $.__views.lorem.add($.__views.__alloyId11);
    exports.destroy = function() {};
    _.extend($, $.__views);
    msgs = [ [ "^ What is it?", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." ], [ "^ Why do we use it?", "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." ], [ "^ Where does it come from?", 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.' ], [ "^ Where can I get some?", "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making lipsum.com the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." ], [ "^ The standard Lorem Ipsum passage", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ] ];
    for (var i = 0; msgs.length > i; i++) {
        var title = msgs[i][0];
        var text = msgs[i][1];
        var header = makeLab(title, 16, "#111");
        var body = makeLab(text, 12, "#222");
        var par = Titanium.UI.createView({
            width: "80%",
            height: Ti.UI.SIZE,
            layout: "vertical",
            borderWidth: 2,
            borderColor: "yellow",
            accordion: "true"
        });
        par.accordion = "true";
        par.add(header);
        par.add(body);
        var spacer = Titanium.UI.createView({
            height: 10,
            width: 1
        });
        $.lorem.add(par);
        $.lorem.add(spacer);
    }
    $.img.image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "images/seinfeld.png");
    $.win.open();
    var accordion = require("accordion");
    var depth = -1;
    var startCollapsed = true;
    accordion.setup($.lorem, depth, startCollapsed, foldCallback);
    __defers["$.__views.__alloyId8!click!btn"] && $.__views.__alloyId8.addEventListener("click", btn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;