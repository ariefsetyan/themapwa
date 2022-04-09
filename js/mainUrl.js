
var mainUrl = "http://192.168.0.74/latihanSS/";


var ctRefresh = 0;
var urlParams;
var db;

document.addEventListener('deviceready', 
	function() 
	{
		db = window.sqlitePlugin.openDatabase({
		name: 'my.db',
		location: 'default',
	});
	
	setTimeout(createTable,500)
	
});

function createTable()
{
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS logStatus (username text primary key, password text, status number)');
		tx.executeSql('INSERT INTO logStatus VALUES (?1, ?2, ?3)', [ 'ferdian', '123', '0']);
	}, function(error) {
			console.log('Transaction ERROR: ' + error.message);
	}, function() {
			console.log('Populate database OK');
	});
}

function checkLogStatus()
{
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM logStatus', [], function(tx, rs) {
			
			if ( rs.rows.item(0).status == "0" )
			{
				alert("Harap Login terlebih dahulu!!!" + rs.rows.item(0).password);
				window.open("login.html","_self");
			}
		
	}, function(tx, error) {
			console.log('SELECT error: ' + error.message);
		});
	});
}

(window.onpopstate = function () {
			var match,
				pl     = /\+/g,  // Regex for replacing addition symbol with a space
				search = /([^&=]+)=?([^&]*)/g,
				decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
				query  = window.location.search.substring(1);

			urlParams = {};
			while (match = search.exec(query))
			   urlParams[decode(match[1])] = decode(match[2]);
})();

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

function paginating()
{
	$('table.paginated').each(function() {
		var currentPage = 0;
		var numPerPage = 5;
		var $table = $(this);
		$table.bind('repaginate', function() {
			$table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
		});
		$table.trigger('repaginate');
		var numRows = $table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var $pager = $('<div class="pager"></div>');
		for (var page = 0; page < numPages; page++) {
			if ( page % 5 == 0 )
			{
				$("<hr style=\"height:3pt; visibility:hidden;\" /><span class=\"page-number\"></span>").text(page + 1).bind('click', {
					newPage: page
				}, function(event) {
					currentPage = event.data['newPage'];
					$table.trigger('repaginate');
					$(this).addClass('active').siblings().removeClass('active');
				}).appendTo($pager).addClass('clickable');
			}else
			{
				$('<span class="page-number"></span>').text(page + 1).bind('click', {
					newPage: page
				}, function(event) {
					currentPage = event.data['newPage'];
					$table.trigger('repaginate');
					$(this).addClass('active').siblings().removeClass('active');
				}).appendTo($pager).addClass('clickable');
			}
		}
		$pager.insertBefore($table).find('span.page-number:first').addClass('active');
	});
}

