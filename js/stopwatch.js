$(function()
{
	//App mode
	var mode = false;
	//time counter
	var timeCounter = 0;
	//lap counter
	var lapCounter = 0;
	//variable for setInterval
	var increment;
	//number of laps
	var lapNum = 0;
	//minutes, seconds and cseconds for time, lap
	var timeMin, timeSec, timeCsec, lapMin, lapSec, lapCsec;
	
	//On App load show only start and lap buttons
	hideshowButtons("#startbutton", "#lapbutton");
	
	//click start button
	$("#startbutton").click(function()
	{
		mode = true;
		//show the stop and lap buttons
		hideshowButtons("#stopbutton", "#lapbutton");

		//start counter
		startWatch();
	});

	//click stop button
	$("#stopbutton").click(function()
	{
		//show the resume and reset buttons
		hideshowButtons("#resumebutton", "#resetbutton");

		//stop counter
	});

	//click resume button
	$("#resumebutton").click(function()
	{
		//show the stop and lap buttons
		hideshowButtons("#stopbutton", "#lapbutton");

		//start counter again
	});

	//click on reset button
	$("#resetbutton").click(function()
	{
		//reload page
		location.reload();
	});

	//click on lap button
		//if counter already started
			//reset lap and show the lap details

	//shows current required two buttons
	function hideshowButtons(x, y)
	{
		$(".controls").hide();
		$(x).show();
		$(y).show();
	}

	//starts the counter(time)
	function startWatch()
	{
		increment = setInterval(function()
			{
				timeCounter++;
				lapCounter++;
				updateTime();
			}, 10);
	}

	//convert the counter to mm:ss:cscs
	function updateTime()
	{
		//min = 60*100 csec, sec = 100 csec
		timeMin = Math.floor(timeCounter / 6000);
		timeSec = Math.floor((timeCounter % 6000) / 100);
		timeCsec = (timeCounter % 6000) % 100;

		$("#timemin").html(format(timeMin));
		$("#timesec").html(format(timeSec));
		$("#timecsec").html(format(timeCsec));

		lapMin = Math.floor(lapCounter / 6000);
		lapSec = Math.floor((lapCounter % 6000) / 100);
		lapCsec = (lapCounter % 6000) % 100;

		$("#lapmin").html(format(lapMin));
		$("#lapsec").html(format(lapSec));
		$("#lapcsec").html(format(lapCsec));
	}

	//format display time to mm:ss:csec
	function format(number)
	{
		if(number < 10)
		{
			return '0' + number;
		}
		else
		{
			return number;
		}
	}
});