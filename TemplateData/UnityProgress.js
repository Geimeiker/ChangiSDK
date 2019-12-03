/*
 * Custom Progress Bar
 * https://ocias.com/blog/unity-webgl-custom-progress-bar/
 */

function init() {}

function UnityProgress (dom) {
	this.progress = 0.0;
	this.message = "";
	this.dom = dom;

	createjs.CSSPlugin.install(createjs.Tween);
	createjs.Ticker.setFPS(60);
	
	var parent = dom.parentNode;

	this.SetProgress = function (progress) {
		if (this.progress != progress)
			this.progress = progress;

		if (progress == 1) {		
		  document.getElementById("bgBar").style.display = "none";
		  document.getElementById("progressBar").style.display = "none";
		} 
		this.Update();
	}
	
	this.SetMessage = function (message) {

		this.Update();
	}
	
	this.Clear = function() {
		document.getElementById("loadingBox").style.display = "none";
	}
	
	this.Update = function() {
		var length = 200 * Math.min(this.progress, 1);
		bar = document.getElementById("progressBar")
	
		bar.style.width = length + "px";
		document.getElementById("loadingInfo").innerHTML = "loading...(" + this.progress * 100 + "%)";

	}
	
	this.Update ();
}