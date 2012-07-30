/*
    dom.js - 
        a. $(document).ready(functionName);
        b. Selectors 
            1) ID - $('#id')
            2) Class - $('.class')
            3) Tag Name(s) - $('div') or $('div,a,pre,span...')
        c. CSS 
            1) css('attributeName'), returns the value of the given css style attribute
        d. HTML
            1) attr('attributeName'), returns the value of the given html tag attribute
*/          
var $ = function(param) {
    return $.fn.init(param);
};
$.fn = {
    htmlElementsList: null,
    validHtmlTags: ['button', 'input', 'form', 'label', 'article', 'p', 'div', 'header', 'nav', 'ul', 
                'li', 'a', 'span', 'section', 'body', 'html', 'head', 'h2', 'h1', 'h3', 'h4', 'h5', 
                'dd', 'dl', 'table', 'pre', 'hr'],
    selector: function(param) {
        var self = this;
        var id, className, isValidTag;
        //run css selector engine
        if (param.charAt(0) === '#') { //Looking for an id, eg: $('#container')
            id = param.substr(1, param.length);
            this.htmlElementsList = document.getElementById(id);
        } else if (param.charAt(0) === '.') { //Looking for class, eg: $('.current')
            className = param.substr(1, param.length);
            this.htmlElementsList = document.getElementsByClassName(className);
        } else { //Looking for tag, or tags, eg: $('div') or $('a,span,p')
            isValidTag = false;
            var tempList = [];
            var paramTags = param.split(',');

            paramTags.forEach(function (v, i, a) { //Loop through parameter tags
                self.validHtmlTags.forEach(function (value, index, array) { //loop through list of valid tags
                    if(value === v) { //&& i > 0) {
                        var el = document.getElementsByTagName(v);
                        if(el.length > 0) {
                            for(var n = 0; n < el.length; n++) {  //Loop through dom elements of ith parameter tag, add to tempList
                                tempList[tempList.length] = el[n];
                            }
                        }
                    } else {
                        return;
                    }
                });                
            });
            
            this.htmlElementsList = tempList;
        }
        
        return this.ret();
    },
    init: function(param) {        
        if (typeof (param) === 'string') {
            return this.selector(param);
        } else if (param === document) { //Looking for DOM object
            var documentReady = false;
            document.ready = function (callback) {
                if(document.readyState === "complete") {
                      console.log('already complete');
                      documentReady = true;
                      console.log(typeof(callback));
                      console.log(callback);
                      callback();
                } else {
                  console.log('else');
                  //window.addEventListener("onload",callback, false); //IE
                  document.addEventListener("DOMContentLoaded", callback, false); //firefox, chrome
                }
            };
            document.htmlElementsList = [];
            return document;
        }
    },
    show: function () {
		var i = 0;
		for (i; i < this.htmlElementsList.length; i++) {
			this.htmlElementsList[i].style.display = 'block';
		}
		return this.ret();
	},
    hide: function () {
		var i = 0;
		for (i; i < this.htmlElementsList.length; i++) {
			this.htmlElementsList[i].style.display = 'none';
		}
		return this.ret();
	},
    attr: function (attribute, value) {
		if (value === undefined) {
			return this.htmlElementsList[0].getAttribute(attribute);
		}
		return this.ret();
	},
	css: function (attribute, value) {
		if (value === undefined) {
			return this.htmlElementsList[0].style[attribute];
		}
		return this.ret();
	},
    ret: function() {
        this.htmlElementsList.htmlElementsList = this.htmlElementsList;
        this.htmlElementsList.hide = this.hide;
		this.htmlElementsList.attr = this.attr;
		this.htmlElementsList.css = this.css;
		this.htmlElementsList.ret = this.ret;
		this.htmlElementsList.show = this.show;
        return this.htmlElementsList;
    }
};


