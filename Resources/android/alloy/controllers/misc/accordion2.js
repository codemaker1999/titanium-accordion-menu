function Controller() {
    function addRows(section, rows) {
        for (var i = 0; rows.length > i; i++) {
            var items = rows[i];
            var row = Titanium.UI.createTableViewRow(rowStyle);
            rid = counter;
            counter++;
            for (var j = 0; items.length > j; j++) {
                items[j]._rid = rid;
                items[j]._ishidden = true;
                row.add(items[j]);
            }
            row._rid = rid;
            row._ishidden = true;
            rowList.push({
                rid: rid,
                row: row,
                items: items
            });
            section.add(row);
        }
    }
    function changeRowHeight(id, h) {
        for (var i = 0; rowList.length > i; i++) rowList[i].rid == id && rowList[i].row.setHeight(h);
    }
    function showView(bool, id) {
        for (var i = 0; rowList.length > i; i++) {
            rowObj = rowList[i];
            if (rowObj.rid == id) {
                rowObj.row._ishidden = !bool;
                for (var j = 0; rowObj.items.length > j; j++) rowObj.items[j]._ishidden = !bool;
            }
            rowList[i] = rowObj;
        }
    }
    function mergeJSON(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) obj3[attrname] = obj1[attrname];
        for (var attrname in obj2) obj3[attrname] = obj2[attrname];
        return obj3;
    }
    function getHeights() {
        for (var i = 0; rowList.length > i; i++) {
            var firstRect = rowList[0].items[0].rect;
            var minHeight = firstRect.height;
            var minY = firstRect.y;
            var maxHeight = 0;
            var someNonZero = false;
            for (var j = 0; rowList[i].items.length > j; j++) {
                var rect = rowList[i].items[j].rect;
                var thisMaxHeight = rect.y + rect.height;
                var thisY = rect.y;
                var thisH = rect.height;
                maxHeight = thisMaxHeight > maxHeight ? thisMaxHeight : maxHeight;
                if (minY > thisY) {
                    minY = thisY;
                    minHeight = thisH;
                }
                someNonZero || (someNonZero = 0 == thisY ? false : true);
            }
            someNonZero && 0 != minHeight && 0 != maxHeight && (layoutListen = false);
            rowList[i].row.setHeight(minHeight);
            rowList[i].row._expandedHeight = maxHeight;
            rowList[i].row._collapsedHeight = minHeight;
            for (var j = 0; rowList[i].items.length > j; j++) {
                rowList[i].items[j]._expandedHeight = maxHeight;
                rowList[i].items[j]._collapsedHeight = minHeight;
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "misc/accordion2";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var tableData = args.data || {};
    var rowStyle = args.rowStyle || {
        backgroundColor: "transparent"
    };
    var sectionLabelStyle = args.secStyle || {
        font: {
            fontSize: 16
        },
        color: "#fff",
        backgroundColor: "#012",
        height: 20,
        top: 2,
        left: 2,
        bottom: 2,
        right: 2
    };
    var tableStyle = args.tableStyle || {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
    };
    var par = $.tableContainer;
    var table = Titanium.UI.createTableView(tableStyle);
    par.add(table);
    var rowList = [];
    var counter = 1;
    table.setVisible(false);
    var sections = [];
    for (var i = 0; tableData.length > i; i++) {
        var tvi = tableData[i];
        var secName = tvi.shift();
        var secStyle = mergeJSON(sectionLabelStyle, {
            text: secName
        });
        var secLabel = Titanium.UI.createLabel(secStyle);
        var sec = Titanium.UI.createTableViewSection({
            headerView: secLabel
        });
        sections.push(sec);
        addRows(sec, tvi);
    }
    table.setData(sections);
    var layoutListen = true;
    table.addEventListener("postlayout", function() {
        if (layoutListen) {
            getHeights();
            table.removeEventListener("postlayout", getHeights);
            table.setVisible(true);
        }
    });
    table.addEventListener("click", function(e) {
        var src = e.source;
        if (src._ishidden) {
            height = src._expandedHeight;
            showView(true, src._rid);
        } else {
            height = src._collapsedHeight;
            showView(false, src._rid);
        }
        changeRowHeight(src._rid, height);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;