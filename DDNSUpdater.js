const http = require('http');
const EventEmitter = require('events').EventEmitter
const inherits = require('util').inherits


function DDNSUpdater() {
	
	self = this
	
	EventEmitter.call(this)
}

inherits(DDNSUpdater, EventEmitter);

DDNSUpdater.prototype.update = function(_domain) {
	
	var domain = _domain
	var data = localStorage.getItem(domain)
	if (data) {
		var structure = JSON.parse(data);
		
		url = 'http://' + domain + ':' + structure.password + '@members.ddns.com.br/nic/update?hostname=' + domain;

		http.get(url, (res) => {
			statusCode = res.statusCode;
			const contentType = res.headers['content-type']

			let received = '';
			res.on('data', (chunk) => received += chunk);
			res.on('end', () => {
				response = received.split(" ");
				structure.last_status = response[0]
				if (response[0] == 'good') {
					structure.last_ip = response[1]
					structure.last_update = new Date();
					console.log('Dominio ' + domain + ' atualizado. IP:' + structure.last_ip);
					self.emit('subdomain_updated', domain);
				}
				
				localStorage.setItem(domain, JSON.stringify(structure));
			});
		});
		
	}
	
	return true;
	
}

DDNSUpdater.prototype.updateDomains = function() {
	
	for (i=0; i < localStorage.length; i++) {
		self.update(localStorage.key(i))
	}
	
	return true;
}

DDNSUpdater.prototype.startScheduler = function() {
	
	setImmediate(self.updateDomains);
	
	setInterval(self.updateDomains, 300000);
}

module.exports = DDNSUpdater;
