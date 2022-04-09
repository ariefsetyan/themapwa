setTimeout(checkLogStatus,3000);

document.location.href = '#imgLoading';
document.getElementById("imgLoading").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";

var dataCustomer = new Array();
var dataCustomerLengkap = new Array();
var dataNotifikasi = new Array();
var dataCustomerStatus = false;
var dataBaru = true;
function getImage(idx)
{
	alert("Segera Hadir, Ayo subscribe supaya dapat update ilmu dan source code GRATIS");
}

function getData()
{
	
	var xmlhttp = new XMLHttpRequest();
	var url = mainUrl + "getData.php?par=dataCustomer";

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

function loadForm()
{
	getData();
	checkStatus();
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
	var tbDataCustomer = "<table class=\"centerLabel\" width=\"100%\"><tr class=\"header\"><td width=\"25%\">KTP</td><td width=\"25%\">Nama</td><td width=\"30%\">Alamat</td><td width\"20%\">Menu</td></tr>";
	if ( dataCustomer.length != 0 )
	{
		for ( i = 0; i < dataCustomer.length; i++ )
		{
			if ( i % 2 == 0 )
			{
				tbDataCustomer += "<tr class=\"oddCell\"><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td><img style=\"height: 25px\" src=\"img/yesButton.PNG\" onclick=\"isiKolom(" + i + ");\">&nbsp;&nbsp;<img style=\"height: 25px\" src=\"img/noButton.PNG\" onclick=\"hapusData(" + dataCustomer[i].id + ")\"></td></tr>";
			}else
			{
				tbDataCustomer += "<tr class=\"evenCell\"><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td><img style=\"height: 25px\" src=\"img/yesButton.PNG\" onclick=\"isiKolom(" + i + ");\">&nbsp;&nbsp;<img style=\"height: 25px\" src=\"img/noButton.PNG\" onclick=\"hapusData(" + dataCustomer[i].id + ")\"></td></tr>";
			}
		}
	}else
	{
		tbDataCustomer += "<tr><td colspan=4>Data Tidak Ditemukan</td></tr>";
	}
	tbDataCustomer += "</table>";
	
	document.getElementById("dataCustomer").innerHTML = tbDataCustomer;
}

function isiKolom(idx)
{
	document.getElementById("noKtp").value = dataCustomer[idx].ktp;
	document.getElementById("nama").value = dataCustomer[idx].nama;
	document.getElementById("alamat").value = dataCustomer[idx].alamat;
	document.getElementById("idCustomer").value = dataCustomer[idx].id;
	dataBaru = false;
}

function simpan()
{
	var ktp = document.getElementById("noKtp").value;
	var nama = document.getElementById("nama").value;
	var alamat = document.getElementById("alamat").value;
	
	if ( dataBaru == true )
	{
		$.ajax({
			type: "GET",
			url: mainUrl + "submit.php",
			data:"par=simpanCustomer&noKtp=" + ktp + "&nama=" + nama + "&alamat=" + alamat,
				success: function(balik){
					if ( balik == 1 )
					{
						alert("Data tersimpan");
						dataBaru = true;
						window.open("index.html", "_self");
					}else
					{
						alert("Data tidak tersimpan")
					}
				}
		});
	}else
	{
		var idCustomer = document.getElementById("idCustomer").value;
		$.ajax({
			type: "GET",
			url: mainUrl + "update.php",
			data:"par=updateCustomer&noKtp=" + ktp + "&nama=" + nama + "&alamat=" + alamat + "&idCustomer=" + idCustomer,
				success: function(balik){
					if ( balik == 1 )
					{
						alert("Data tersimpan");
						dataBaru = true;
						window.open("index.html", "_self");
					}else
					{
						alert("Data tidak tersimpan")
					}
				}
		});
	}
}

function hapusData(idx)
{
	var r = confirm("Data Customer akan dihapus?");
	if ( r == true )
	{
		$.ajax({
			type: "GET",
			url: mainUrl + "delete.php",
			data:"par=deleteCustomer&id=" + idx,
				success: function(balik){
					if ( balik == 1 )
					{
						alert("Data terhapus");
						dataBaru = true;
						window.open("index.html", "_self");
					}else
					{
						alert("Data tidak terhapus")
					}
				}
		});
	}else
	{
		
	}
}

function getDataCustomerLenkap()
{
	
	var xmlhttp = new XMLHttpRequest();
	var url = mainUrl + "getData.php?par=lihatFotoCustomer&noKtp=";

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
			dataCustomerLengkap.push(tempData[i]);
		}
		var datae = JSON.stringify(dataCustomerLengkap);
		localStorage.setItem("dataCustomerLengkap", datae);
	}
}

//setTimeout(showNotif, 3000);

function showNotif()
{
	cordova.plugins.notification.local.schedule({
		title: 'My first notification',
		text: 'Thats pretty easy...',
		foreground: true
	});
}

function getNotifikasi()
{
	
	var xmlhttp = new XMLHttpRequest();
	var url = mainUrl + "getNotifikasi.php";

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
			dataNotifikasi.push(tempData[i]);
		}
	}
	
	setTimeout(showNotifikasi,3000);
}

//setTimeout(getNotifikasi,5000);

function showNotifikasi()
{
	cordova.plugins.notification.local.schedule({
		title: dataNotifikasi[0].judulNotifikasi,
		text: dataNotifikasi[0].teksNotifikasi,
		foreground: true
	});
	
	setTimeout(getNotifikasi, 5000);
}


getDataCustomerLenkap();