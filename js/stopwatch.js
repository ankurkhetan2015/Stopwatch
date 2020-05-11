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

	//last lap time to keep aggregate time
	var aggMin = 0;
	var aggSec = 0;
	var aggCsec = 0;
	var aggTotal = 0;	
	
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
		clearInterval(increment);
	});

	//click resume button
	$("#resumebutton").click(function()
	{
		//show the stop and lap buttons
		hideshowButtons("#stopbutton", "#lapbutton");

		//start counter again
		startWatch();
	});

	//click on reset button
	$("#resetbutton").click(function()
	{
		//reload page
		location.reload();
	});

	//click on lap button
	$("#lapbutton").click(function()
	{
		//if counter already started
		if(mode)
		{
			clearInterval(increment);
			//reset lap
			lapCounter = 0;

			//show the lap details
			addLap()

			//start the watch again
			startWatch();
		}
	});
	
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
				if(timeCounter == 100 * 60 * 100)
				{
					timeCounter = 0;
				}
				lapCounter++;
				if(lapCounter == 100 * 60 * 100)
				{
					lapCounter = 0;
				}
				updateTime();
			}, 10);
	}

	//convert the counter to mm:ss:cscs
	function updateTime()
	{
		//min = 60*100 csec, sec = 100 csec, csec = Counter
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

	//evaluates and display lap details
	function addLap()
	{
		lapNum++;

		aggMin += lapMin;
		aggSec += lapSec;
		aggCsec += lapCsec;

		aggTotal = aggCsec + aggSec * 100 + aggMin * 6000;

		aggMin = Math.floor(aggTotal / 6000);
		aggSec = Math.floor((aggTotal % 6000) / 100);
		aggCsec = (aggTotal % 6000) % 100;

		var lapDetails = 
		'<div class="lap">'+
			
			'<div class="lapTitle">' + 
				'Lap' + format(lapNum) +
			'</div>' +

			'<div class="lapIndividual">' + 
				'<span>' + format(lapMin) + '</span>' + ':<span>' + format(lapSec) + '</span>' + ':<span>' + format(lapCsec) + '</span>' +
			'</div>' +

			'<div class="lapAggregate">' +
			 	'<span>' + format(aggMin) + '</span>' + ':<span>' + format(aggSec) + '</span>' + ':<span>' + format(aggCsec) + '</span>' +
			'</div>' +

		'</div>';
		$(lapDetails).prependTo("#diffLaps");
	}
	
});