var fileSystem = require('fs');

module.exports = function(website){
	fileSystem.readdirSync(__dirname + '/routes').forEach(function(file){
		if (file[0] === '.' || file.match(/^(Roco|environment|routes|autoload)\.(js|coffee|json|yml|yaml)$/)) {
    	return;
    }
    var filePath = './routes/' + file;
		require(filePath)(website);
	});
};
