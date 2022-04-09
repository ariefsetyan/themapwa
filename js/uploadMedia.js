
document.location.href = '#imgLoading';
document.getElementById("imgLoading").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";

var dataCustomer = new Array();
var dataCustomerStatus = false;
var dataBaru = true;

var globalImage = [1];
var ctImage = 0;
var urlParams;
var smallImage = [1];
var smallImageAction = [1];
var cancelUpload = new Array();
var idx;
var uploadCounter = 0;

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
	prepareDiv();
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
	var tbDataCustomer = "<table class=\"centerLabel\" width=\"100%\"><tr class=\"header\"><td width=\"25%\">KTP</td><td width=\"25%\">Nama</td><td width=\"30%\">Alamat</td><td width\"20%\">Photo</td></tr>";
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
				foto += "<img style=\"height: 50px\" src=\"" + mainUrl + "" + dataCustomer[i].foto + "\" onclick=\"viewImage(" + dataCustomer[i].foto + ")\">"
			}
			
			if ( i % 2 == 0 )
			{
				tbDataCustomer += "<tr class=\"oddCell garisBawah\"><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td style=\"text-align : center; vertical-align : middle\">" + foto + "</td></tr>";
			}else
			{
				tbDataCustomer += "<tr class=\"evenCell garisBawah\"><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td style=\"background-color : white; text-align : center; vertical-align : middle\">" + foto + "</td></tr>";
			}
		}
	}else
	{
		tbDataCustomer += "<tr><td colspan=4>Data Tidak Ditemukan</td></tr>";
	}
	tbDataCustomer += "</table>";
	
	document.getElementById("dataCustomer").innerHTML = tbDataCustomer;
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
						dataBaru = true;
						uploadPhoto();
						
					}else
					{
						alert("Data tidak tersimpan")
					}
				}
		});
	}else
	{
	}
}

function prepareDiv()
{

	var imgCon = "";
	for ( z = 0; z < 50; z++ )
	{
		 //imgCon += "<tr><td><img style=\"display:none;width:250px;height:250px;\" id=\"smallImage" + z + "\" src=\"\" /></td><td><img style=\"display:none;\" id=\"smallImageAction" + z + "\" src=\"\" onClick=\"deletePhoto(" + z + ")\"/></td></tr>";
		 imgCon += "<div class=\"leftTable\"><img style=\"display:none;width:250px;height:250px;\" id=\"smallImage" + z + "\" src=\"\" /></div><div class=\"rightTable\"><img style=\"display:none;\" id=\"smallImageAction" + z + "\" src=\"\" onClick=\"deletePhoto(" + z + ")\"/></div>";
	}
	//imgCon += "</table>";
	
	document.getElementById("imageContainer").innerHTML = imgCon;
}

function getImage(parameter) {
	var source;
	if ( parameter == 1 )
	{
		source = navigator.camera.PictureSourceType.CAMERA;
	}else
	{
		source = navigator.camera.PictureSourceType.PHOTOLIBRARY
	}
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		//quality: 50, allowEdit: false, targetWidth: 1600, targetHeight: 900, correctOrientation: true, 
		quality: 30, allowEdit: false, targetWidth: 1600, targetHeight: 900, 
		destinationType: navigator.camera.DestinationType.FILE_URI,
		sourceType: source
	});

}

function onFail(message) 
{
    alert('Failed because: ' + message);
}

function onPhotoDataSuccess(imageData) {
	
	globalImage[ctImage] = imageData;
	smallImage[ctImage] = document.getElementById('smallImage'+ctImage);
	smallImage[ctImage].style.display = 'block';
	smallImage[ctImage].src = imageData;
	
	smallImageAction[ctImage] = document.getElementById('smallImageAction'+ctImage);
	smallImageAction[ctImage].style.display = 'block';
	//smallImageAction[ctImage].src = "img/deletePhoto.png";
	
	//ctImage++;
}



function uploadPhoto() {
	
	document.location.href = '#imgLoading';
	document.getElementById("imgLoading").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";
	
	var imageURI = globalImage[0];
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";
	console.log(options.fileName);
	var params = new Object();
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;
	options.chunkedMode = false;
	
	var ft = new FileTransfer();
	//var url = mainUrl + "upload.php?nomerKamar=" + urlParams["nomerKamar"]+"&fasilitas=" + fasilitas + "&keterangan=" + keterangan;
	//var url = mainUrl + "uploadPersonMedia.php?noKtp=" + noKtp;
	var url = mainUrl + "uploadCustomerMedia.php";
	ft.upload(imageURI, url, function(result){
		console.log(JSON.stringify(result));
		setTimeout(backToHome,5000);
	}, function(error){
		console.log(JSON.stringify(error));
	}, options);
}

function backToHome()
{
	window.open("uploadMedia.html","_blank");
}