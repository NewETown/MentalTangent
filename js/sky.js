// Today we want to create SVG-based parallax clouds which we, eventually, will want to be all kinds of an awesome background
// These clouds will be in their own canvas pinned to the top of the page

$(document).ready(function() {
	var documentWidth = $('#slider').width();
	var skyHeight = $(window).height() * .3;

	// console.log("The viewport width is: " + documentWidth); - Checked! This gives us the correct value

	// Now we use the viewport width to create a Raphael canvas that we can populate with cool clouds
	// It's important to get the viewport width so that our canvas is always responsive and work on any kind of device viewing the page

	var skyPaper = Raphael('sky', documentWidth, skyHeight);

	function drawCloud() {
		// We want to dynamically draw clouds because that's awesome

		// Each cloud will be a collection of 5-7 ellipses
		var cloudSize = Math.floor(Math.random()*5)+3;
		var xPos, yPos, xRad, yRad;
		var yOffset = Math.floor((Math.random() * cloudSize) * 7) + 30; // Minimum height of 50 because 25 is the radius
		var xOffset = Math.floor((Math.random() * cloudSize) * 20) + yOffset + 15; // This ensures the clouds are always wider than they are tall

		// We need to make a set to contain the ellipses
		var cloud = skyPaper.set();

		// Each ellipse needs to overlap the other ellipses in the set
		// Raphael ellipse function needs X and Y position for the center of the ellipse and an X and Y radius
		// Each cloud will start at the right of the screen and drift left
		xPos = documentWidth + xOffset;
		yPos = Math.floor(Math.random() * (skyHeight - (yOffset * cloudSize))) + yOffset + 5; // We don't want the cloud being taller than the viewport
		// Now we loop and create each ellipse
		for(var i = 0; i < cloudSize; i++) {
			// Push each ellipse into the set as we draw them
			cloud.push(
				skyPaper.ellipse(xPos - 2, yPos + 3, xOffset, yOffset)
						.attr({
							fill: 'gray',
							'stroke-width': 0
						}),
				skyPaper.ellipse(xPos, yPos, xOffset, yOffset)
						.attr({
							fill: '#fff',
							'stroke-width': 0
						})
			);

			// Now we update the X and Y positions for the next ellipse
			if(i%2 == 0) {
				xPos -= xOffset * .75; // Math.floor(Math.random() * xOffset) + (xOffset * .35);
				yPos += yOffset * .8; // Math.floor(Math.random() * yOffset) + (yOffset * .75) * -1;
			} else {
				xPos += xOffset * 1.5; // Math.floor(Math.random() * xOffset) + (xOffset * .35);
				yPos += yOffset * .2;
			}

			console.log("X at " + i + " is " + xPos);

			// Then change the size of the next ellipse
			yOffset = Math.max(yOffset * (Math.random() + .1), yOffset * .75);
			xOffset = Math.max(xOffset * (Math.random() + .2), xOffset * .85);
		}

		var xTravel = documentWidth + (xOffset * cloudSize);

		// Size and speed are related to each other to give the impression that the clouds are drifting by
		cloud.animate({'transform': 'T-'+xTravel+',0,0,0'}, cloudSize * 5000, removeElement);

		// This function will return a Raphael set() object of the cloud
	}

	// Make sure we clean up the elements off the screen
	function removeElement() {
		this.remove();
	}

	function drawClouds() {
		var numCalls = Math.floor(Math.random() * 3) + 1;
		for(var i = 0; i <  numCalls; i++) {
			setTimeout(drawCloud, i * 1200);
		}
	}

	setInterval(drawClouds, 8500);

});