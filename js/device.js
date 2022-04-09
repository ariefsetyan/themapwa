document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.getElementById("model").value = device.model;
    document.getElementById("platform").value = device.platform;
    document.getElementById("uuid").value = device.uuid;
    document.getElementById("version").value = device.version;
    document.getElementById("manufacture").value = device.manufacturer;
    document.getElementById("virtual").value = device.isVirtual;
    document.getElementById("serial").value = device.serial;
}