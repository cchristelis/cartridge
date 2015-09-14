module.exports = function(){
	
		var config = require('./project.json');
		var srcStyles = config.src + '/' + config.dirs.styles;

		return [
			srcStyles + '/_settings/*.scss', 
			srcStyles + '/_tools/_tools.mixins.scss', 
			srcStyles + '/_tools/_tools.functions.scss', 
			srcStyles + '/_tools/*.scss', 
			srcStyles + '/_scope/*.scss', 
			srcStyles + '/_generic/*.scss', 
			srcStyles + '/_elements/*.scss', 
			srcStyles + '/_objects/*.scss', 
			'views/_partials/**/*.scss', 
			srcStyles + '/_trumps/*.scss'
		];
	
};