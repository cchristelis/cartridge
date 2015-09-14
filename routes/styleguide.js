var WebsiteController = function (website) {
	// Public functions
	var website = website;
	this.get = function(request, response) {
		if (!request.body) return response.sendStatus(400);
		var url = parseUrl(request.params.loc);
		
		response.render(url, createModel());
	};

	function createModel(params){
		var model = {
			layout: false
		}

		return model;
	}

	function parseUrl(url){
		if(url === '/' || url === '' || url === undefined || url === 'favicon.ico'){
			// change to index or homepage when ready to work on site pages
			url = 'styleguide'
		}
		return url;
	}

};

module.exports = function(website) {
	var controller = new WebsiteController(website);
	website.get(['/','/:loc'], controller.get);

};