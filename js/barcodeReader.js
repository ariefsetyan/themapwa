var dataCustomer = new Array();
var dataCustomerStatus = false;


function loadForm()
{
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			getData(result.text);
			checkStatus();
			
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}

function getData(noKtp)
{
	var xmlhttp = new XMLHttpRequest();
	var url = mainUrl + "getData.php?par=cariDataCustomer&noKtp=" + noKtp;

	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			myFunction(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
	
	
	function myFunction(response) {
		var tempData = JSON.parse(response);
		for ( i = 0; i < tempData.length; i++ )
		{
			dataCustomer.push(tempData[i]);
		}
		dataCustomerStatus = true;
	}
}

function checkStatus()
{
	if ( dataCustomerStatus == false )
	{
		setTimeout(checkStatus,500);
	}else
	{
		document.getElementById("imgLoading").innerHTML = "";
		showData();
	}
}

function showData()
{
	document.getElementById("noKtp").value = dataCustomer[0].ktp;
	document.getElementById("nama").value = dataCustomer[0].nama;
	document.getElementById("alamat").value = dataCustomer[0].alamat;
}