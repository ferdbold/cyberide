(function() {
	'use strict';

	var Cyberide = function() {
		this.onLoad();
	};

	/** STATIC PROPERTIES */

	Cyberide.prototype.name = 'Cybéride';

	/** METHODS */

	Cyberide.prototype.onLoad = function() {
		alert('Welcome to ' + this.name);
	};

	/** INITIALIZATION */

	var app = new Cyberide();
})();
