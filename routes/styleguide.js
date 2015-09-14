var WebsiteController = function (website) {
	// Public functions
	var website = website;
	this.get = function(request, response) {
		response.render('styleguide', createModel());
	};

	function createModel(params){
		var model = {
			layout: false
		}

		return model;
	}
};

module.exports = function(website) {
	var controller = new WebsiteController(website);
	website.get('/styleguide', controller.get);
};