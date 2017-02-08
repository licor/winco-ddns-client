	$('table[class=subdominios] > tbody > tr').not(':first').not(':last').remove();
	var html = ''
	var errorMessage = '';
	var dateFormat = require('dateformat');
	for (var key in localStorage) {
		domain = JSON.parse(localStorage[key]);
		if (domain.last_status == 'badauth')
			errorMessage = 'Usuário ou senha incorretos';
		if (typeof(domain.last_update) == 'string') {
			data = dateFormat(domain.last_update, 'dd/mm/yy HH:MM:ss')
		} else {
			data = errorMessage;
		}
		if (domain.last_ip == null)
			last_ip = '';
		else
			last_ip = domain.last_ip;
		html += '<tr><td><a href="new_domain.html?domain=' + key + '">' + key +'</a></td><td>' + last_ip + '</td><td>' + data + '</td><td></td>';
	}
	$('table[class=subdominios] > tbody > tr').first().after(html);	
