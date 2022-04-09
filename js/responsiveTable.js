
//document.location.href = '#imgLoading';
//document.getElementById("imgLoading").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";



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


function showData()
{
	var dataCustomer = JSON.parse(localStorage.getItem("dataCustomerLengkap"));
	var video = "<img style=\"height: 60px\" src=\"http://mykiakids.com/download/youtube.png\" onclick=\"streamingVideo('http://mykiakids.com/download/video.mp4')\">";
	var suara = "<img style=\"height: 60px\" src=\"http://mykiakids.com/download/suara.png\" onclick=\"streamingSuara('http://mykiakids.com/download/uploadmediaSuara.mp3')\">";
	var tbDataCustomer = "<div class=\"card-body\"><div class=\"table-responsive\"><table class=\"table table-bordered\" id=\"dataTable\" width=\"100%\" cellspacing=\"0\">" + 
			"<thead><tr><th>KTP</th><th>Nama</th><th>Alamat</th><th>Photo</th></tr></thead>" + 
			"<tfoot><tr><th>KTP</th><th>Nama</th><th>Alamat</th><th>Photo</th></tr></tfoot><tbody>";
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
			
			tbDataCustomer += "<tr><td>" + dataCustomer[i].ktp + "</td><td>" + dataCustomer[i].nama + "</td><td>" + dataCustomer[i].alamat + "</td><td style=\"text-align : center; vertical-align : middle\">" + foto + "</td></tr>";
			
		}
		
		tbDataCustomer += "<tr><td>xxx</td><td>Test Video</td><td>Kosong</td><td style=\"text-align : center; vertical-align : middle\">" + video + "</td></tr>";
		tbDataCustomer += "<tr><td>xxx</td><td>Test Suara</td><td>Kosong</td><td style=\"text-align : center; vertical-align : middle\">" + suara + "</td></tr>";
		
	}else
	{
		tbDataCustomer += "<tr><td colspan=4>Data Tidak Ditemukan</td></tr>";
	}
	tbDataCustomer += "</tbody></table></div></div>";
	
	document.getElementById("dataCustomer").innerHTML = tbDataCustomer;

}
