
document.location.href = '#imgLoading';
document.getElementById("imgLoading").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";

var dataCustomer = new Array();
var dataCustomerStatus = false;
var imageOptions = {
    share: true, // default is false
    closeButton: false, // default is true
    copyToReference: true, // default is false
    headers: '',  // If this is not provided, an exception will be triggered
    piccasoOptions: { } // If this is not provided, an exception will be triggered
};


function viewImage(url)
{
	PhotoViewer.show(url, 'JAGOANDROID', imageOptions);
}

function streamingVideo(url)
{
	window.plugins.streamingMedia.playVideo(url);
}

function streamingSuara(url)
{
	window.plugins.streamingMedia.playAudio(url);
}

function getData()
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
	var video = "<img style=\"height: 60px\" src=\"http://mykiakids.com/download/youtube.png\" onclick=\"streamingVideo('http://mykiakids.com/download/video.mp4')\">";
	var suara = "<img style=\"height: 60px\" src=\"http://mykiakids.com/download/suara.png\" onclick=\"streamingSuara('http://mykiakids.com/download/uploadmediaSuara.mp3')\">";
	var tbDataCustomer = "<table class=\"centerLabel paginated\" width=\"100%\"><tr class=\"header\"><td width=\"25%\">KTP</td><td width=\"25%\">Nama</td><td width=\"30%\">Alamat</td><td width\"20%\">Photo</td></tr>";
	if ( dataCustomer.length != 0 )
	{
		for ( i = 0; i < dataCustomer.length; i++ )
		{
			var foto = "";
			if ( dataCustomer[i].foto == null )
			{
				foto += "<img style=\"height: 60px\" src=\"img/unavaibale.png\">"
			}else
			{
				foto += "<img style=\"height: 50px\" src=\"" + mainUrl + "" + dataCustomer[i].foto + "\" onclick=\"viewImage('" + mainUrl + "" + dataCustomer[i].foto + "')\">"
			}
			
			if ( i % 2 == 0 )
			{
				tbDataCustomer += "<tr class=\"oddCell garisBawah\"><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td style=\"text-align : center; vertical-align : middle\">" + foto + "</td></tr>";
			}else
			{
				tbDataCustomer += "<tr class=\"evenCell garisBawah\"><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td style=\"background-color : white; text-align : center; vertical-align : middle\">" + foto + "</td></tr>";
			}
			
			
		}
		if ( dataCustomer.length % 2 == 0 )
		{
			tbDataCustomer += "<tr class=\"oddCell garisBawah\"><td>xxx</td><td>Test Video</td><td>Kosong</td><td style=\"text-align : center; vertical-align : middle\">" + video + "</td></tr>";
			tbDataCustomer += "<tr class=\"oddCell garisBawah\"><td>xxx</td><td>Test Suara</td><td>Kosong</td><td style=\"text-align : center; vertical-align : middle\">" + suara + "</td></tr>";
		}else
		{
			tbDataCustomer += "<tr class=\"oddCell garisBawah\"><td>xxx</td><td>Test Video</td><td>Kosong</td><td style=\"text-align : center; vertical-align : middle\">" + video + "</td></tr>";
			tbDataCustomer += "<tr class=\"oddCell garisBawah\"><td>xxx</td><td>Test Suara</td><td>Kosong</td><td style=\"text-align : center; vertical-align : middle\">" + suara + "</td></tr>";
		}
	}else
	{
		tbDataCustomer += "<tr><td colspan=4>Data Tidak Ditemukan</td></tr>";
	}
	tbDataCustomer += "</table>";
	
	document.getElementById("dataCustomer").innerHTML = tbDataCustomer;
	setTimeout(paginating,200)
}
