function toggleSection(event){
	event.preventDefault();

	var dataSet = event.target.dataset;
	var status = dataSet.open;
	var masterElement = document.getElementById(event.srcElement.id);
	var slaveElement = document.getElementById(dataSet.slaveelementid);
	
	if (status === "false") {
		slaveElement.hidden = false;
		masterElement.innerText = "[close]";
		masterElement.dataset.open = "true";
	} else {
		slaveElement.hidden = true;
		masterElement.innerText = "[open]";
		masterElement.dataset.open = "false";
	}
	console.log(status);
}