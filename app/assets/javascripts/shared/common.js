
var ele = {};


var g = {};

var log = function(str){
	try {
		console.log(str);
	}
	catch(e){}
};

// -----------------------------------------------------------------------------------------------
// HTMLElement
// -----------------------------------------------------------------------------------------------
HTMLElement.prototype.move_to = function(x, y){
	if (!isNaN(x)) this.style.left = Math.floor(x) + "px";
	if (!isNaN(y)) this.style.top = Math.floor(y) + "px";
};
HTMLElement.prototype.x = function(){
	return this.offsetLeft;
};
HTMLElement.prototype.y = function(){
	return this.offsetTop;
};
HTMLElement.prototype.width = function(){
	return this.clientWidth;
};
HTMLElement.prototype.height = function(){
	return this.clientHeight;
};


Array.prototype.each = function(dofunc){
	for (var k = 0; k < this.length; ++k){
		dofunc(this[k]);
	}
};


