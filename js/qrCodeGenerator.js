var codeValue;

function generate()
{
	codeValue = document.getElementById("codeValue").value;
	

	let options = {
		width: 256,
		height: 256,
		colorDark: "#000000",
		colorLight: "#ffffff",
	};

	cordova.plugins.qrcodejs.encode('TEXT_TYPE', codeValue, (base64EncodedQRImage) => {
		document.getElementById('yourQrCode')
			.setAttribute(
				'src', base64EncodedQRImage
			);
		}, (err) => {
		console.error('QRCodeJS error is ' + JSON.stringify(err));
	}, options);
}