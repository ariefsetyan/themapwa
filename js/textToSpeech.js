
function speech() 
{
    var kataku = document.getElementById("kataku").value;
	//alert(kataku);
	TTS
        .speak({
            text: kataku,
            locale: 'id-ID',
            rate: 0.75
        }).then(function () {
            alert('success');
        }, function (reason) {
            alert(reason);
        });

 
}