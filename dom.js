var $ = function(param) {
    return $.fn.init(param);
};
$.fn = {
    length: 0,
    validHtmlTags: ['button', 'input', 'form', 'label', 'article', 'p', 'div', 'header', 'nav', 'ul', 
                'li', 'a', 'span', 'section', 'body', 'html', 'head', 'h2', 'h1', 'h3', 'h4', 'h5', 
                'dd', 'dl', 'table', 'pre', 'hr'],
    copyArray: function(arr) {
        //console.log(arr);
        if(arr.length && arr.length > 0) {            
            for(var i = 0; i < arr.length; i++) {
                this[i] = arr[i];
            }
        } else {
            this[0] = arr;
        }
    },
    selector: function(param) {
        var self = this;
        var id, className, isValidTag;

        //run css selector engine
        if (param.charAt(0) === '#') { //Looking for an id, eg: $('#container')
            id = param.substr(1, param.length);
            this.copyArray(document.getElementById(id));
        } else if (param.charAt(0) === '.') { //Looking for class, eg: $('.current')
            className = param.substr(1, param.length);
            this.copyArray(document.getElementsByClassName(className));
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
            
            this.length = tempList.length;
            this.copyArray(tempList);
        }
        
        return this;
    },
    init: function(param) {        
        if (typeof (param) === 'string') {
            return this.selector(param);
        } else if (param === document) { //Looking for DOM object
            var documentReady = false;
            document.ready = function (callback) {
                if(document.readyState === "complete") {
                      documentReady = true;
                      callback();
                } else {
                  //window.addEventListener("onload",callback, false); //IE
                  document.addEventListener("DOMContentLoaded", callback, false); //firefox, chrome
                }
            };
            document.htmlElementsList = [];
            return document;
        }
    },
    show: function () {
		for (var i = 0; i < this.length; i++) {
			this[i].style.display = 'block';
		}
		return this;
	},
    hide: function () {
        console.log('len = ' + this.length);
		for (var i = 0; i < this.length; i++) {
            //console.log(i + ', ' + this[i]);
            //console.log('\n\n');
			this[i].style.display = 'none';
		}
		return this;
	},
    attr: function (attribute, value) {
		if (value === undefined) {
			return this[0].getAttribute(attribute);
		}
        return this;
	},
	css: function (attribute, value) {
		if (value === undefined) {
			return this[0].style[attribute];
		}
		return this;
	}
};

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
