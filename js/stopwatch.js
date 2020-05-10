$(function()
{
	//App mode
	var mode = false;
	//time counter
	var timeCounter = 0;
	//lap counter
	var lapCounter = 0;
	//variable for setInterval
	var x;
	//number of laps
	var lapNum = 0;
	//minutes, seconds and cseconds for time, lap
	var timeMin, timeSec, timeCsec, lapMin, lapSec, lapCsec;
	
	//On App load show only start and lap buttons
	hideshowButtons("#startbutton", "#lapbutton");
	//click start button
		//show the stop and lap buttons
		//start counter

	//click stop button
		//show resume and reset buttons
		//stop counter

	//click resume button
		//show stop and lap buttons
		//start counter again

	//click on reset button
		//reload the page

	//click on lap button
		//if counter already started
			//reset lap and show the lap details

	function hideshowButtons(x, y)
	{
		$(".controls").hide();
		$(x).show();
		$(y).show();
	}
});