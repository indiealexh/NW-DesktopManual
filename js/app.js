var gui = require('nw.gui');
var win = gui.Window.get();
var fs = require('fs');
var path = require('path');
var PagesList = GetPagesList();
var curPage = "Tutorial";

SetPage("Tutorial");

//Get list of help pages and their titles base on file name
function GetPagesList() {
	var list = new Array();// Initialise array
	var files = fs.readdirSync("pages");// Node JS sync List files in folder.
	for (var i=0; i<files.length; i++) {
		list[i] = new Array();// Initialise array item into 2D Array
		list[i][0]=files[i];//filename
		list[i][1]=files[i].slice(0, -4);//pagename
	}
	return list;
}
function RenderMenu() {
	var menu="";
	menu += '<div class="show-for-small">';
	menu += '<form><label>Choose an article:<select id="micromenu">';
	for (var i=0; i<PagesList.length; i++) {
		if (PagesList[i][1] == curPage) {
			menu+='<option value="'+PagesList[i][1]+'" selected>';
		} else {
			menu+='<option value="'+PagesList[i][1]+'">';
		}
		menu+=PagesList[i][1];
		menu+='</option>';
	}
	menu += '</select></label>';
	menu += '</form></div>';
	menu += '<ul class="side-nav hide-for-small">';
	for (var i=0; i<PagesList.length; i++) {
		if (PagesList[i][1] == curPage) {
			menu+='<li class="active">';
		} else {
			menu+='<li>';
		}
		menu+='<a onClick="SetPage(\''+PagesList[i][1]+'\')">';
		menu+=PagesList[i][1];
		menu+='</a>';
		menu+='</li>';
	}
	menu += '</ul>';
	return menu;
}
// ############# \\
// File Contents \\
// ############# \\
var content;
// Get file contents
function LoadPage(fpath) {
	fs.readFile(fpath, 'utf8', function(err, data) {
		if (err) throw "Error Page Missing";
		content=data;
		RenderPage();
	});
}
//Callbackfunction RenderLoadPage
function RenderPage() {
	$('<div id="content">'+content+"</div>").replaceAll("#content");
	$('<div id="menu">'+RenderMenu()+"</div>").replaceAll("#menu");
	//
	$(document).foundation();
}
//SetPage
function SetPage (pagename) {
	for (var i=0; i<PagesList.length; i++) {
		if (PagesList[i][1] == pagename) {
			LoadPage("./pages/"+PagesList[i][0]);
			curPage = PagesList[i][1];
		}
	}
}
//
// Compleate load up.
//
onload = function() {
	win.show();
}
//
$(document).ready(function() {
	$("#menuparent").on("change", "#micromenu", function(){
    	SetPage(this.value );
	});
});