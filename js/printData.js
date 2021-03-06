var invoice = new Array();	
	
var printers;
var invoicePage ;


var btPrint = document.getElementById("btPrint");
document.getElementById("printerList").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";
function getList()
{
	//alert("beforeGetList");
	BTPrinter.list(function(data){
		//alert(JSON.stringify(data));
		printers = (data);
		var selectString = "<select id=\"device\" name=\"device\" style=\"width : 100%\" onchange=\"connectToPrinter();\">";
		for ( i = 0; i < data.length; i++ )
		{
			selectString += "<option value=" + data[i] + ">" + data[i] + "</option>";
		}
		selectString += "</select>";
		document.getElementById("printerList").innerHTML = selectString;
		btPrint.disabled = false;
	},function(err){
		alert("Pastikan Bluetooth sudah hidup dan terkoneksi dengan printer");
		window.open("bluetoothPrinter.html","_blank");
		console.log(err);
	})
}

function connectToPrinter()
{
	document.getElementById("imgLoading").innerHTML = "<div class=\"loading\">Loading&#8230;</div>";
	var selector = document.getElementById("device");
	var val = selector.selectedIndex;
	//alert(printers[val]);
	BTPrinter.connect(function(data){
		document.getElementById("imgLoading").innerHTML = "";
	},function(err){
		alert(err);
		window.open("bluetoothPrinter.html","_blank");
	}, printers[val]);
}

function disconnetPrinter()
{
	BTPrinter.disconnect(function(data){
		console.log("Success");
		console.log(data)
	},function(err){
		console.log("Error");
		console.log(err)
	})
}



function printData()
{
//	populateInvoice();
	//alert(invoicePage);
	
	//print Logo / image
	BTPrinter.printText(function(data){
		alert("Success");
		//setTimeout(disconnetPrinter, 2000);
		reOpen();
	},function(err){
		alert("Error");
		console.log(err)
	}, invoicePage)
	
}

function printQrCode()
{
	BTPrinter.printQrCode(function(data){
		console.log("Success");
		console.log(data)
	},function(err){
		console.log("Error");
		console.log(err)
	}, "https://youtube.com/Ferdianarief")
}

function printGambar()
{
	BTPrinter.print(function(data){
		console.log("Success");
		console.log(data)
	},function(err){
		console.log("Error");
		console.log(err)
	}, "data:image/png;base64,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")
	
}

function populateInvoice()
{
		
	var trims = "Terima Kasih\n";
	var separator  = "--------------------------------\n";
	var title = "                  LFC\n     Latihan Fried Chicken\n\n"
	var tanggal = "Tanggal        : 03-12-2020\n";
	var noInvoice = "No Invoice   : IV20200001 \n";
	var customer = "Nama           : Ferdian Arief\n";
	var header = "    Item              Biaya\n";
	var item = "   #101          Rp. 9.000,-\n\n"
	var total = "     Total         Rp. 9.000,-\n\n\n";
	invoicePage =  title + tanggal + noInvoice + customer + separator + header + separator + item + separator + total + trims;
	//alert(invoicePage);
}

function execInvoice()
{
	//getList();
	populateInvoice();
}

setTimeout(execInvoice,200);

