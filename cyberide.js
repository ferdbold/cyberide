
var Cyberide = function() {
	this.posts = [];
	this.images = [];
};

/** STATIC PROPERTIES */

Cyberide.prototype.name = 'Cybéride';

/** METHODS */

Cyberide.prototype.init = function() {
	FB.getLoginStatus(this.onStatusChange.bind(this));
};

Cyberide.prototype.onStatusChange = function(response) {
	if (response.status === 'connected') {
		console.log('Connected');
		this.loadContent();
	} else if (response.status === 'not_authorized') {
		FB.login(this.onLogin, {scope: 'user_posts, user_photos'});
	} else {
		console.error('Not logged in');
	}
};

Cyberide.prototype.onLogin = function(response) {
	if (response.authResponse) {
		console.log('Connected');
		this.loadContent();
	} else {
		console.error('Failed to connect, try again.');
	}
};

Cyberide.prototype.loadContent = function() {
	FB.api('/me/photos', 'get', {fields: 'source'}, function(response) {
		for (var i = 0; i < response.data.length; i++) {
			this.images.push($('<img class="fb-image fb-content" src="' + response.data[i].source +'">'));
			$('#painting').append(this.images[i]);
		}
	}.bind(this));

	FB.api('/me/posts', 'get', {}, function(response) {
		for (var i = 0; i < response.data.length; i++) {
			if (!response.data[i].message) continue;
			this.posts.push($('<div class="fb-post fb-content">' + response.data[i].message + '</div>'));
			$('#painting').append(this.posts[i]);
		}
		console.log(this.posts);
	}.bind(this));
};

/** INITIALIZATION */

window.app = new Cyberide();
