window.onload = function() {
	var p = new Raphael(0, 0, 400, 400);
	p.rect(0, 0, 400, 400);

	var redRect = p.rect(20, 20, 50, 50)
		.attr({
			fill: "red",
			stroke: "none",
			cursor: "pointer"
		}).click(function() {
			this.attr({fill: "blue"});
		}).hover(function() {
			this.attr({fill: "green"});
		}, function() {
			this.attr({fill: "red"});
		});

	p.circle(100, 100, 30)
		.attr({
			"stroke-width": 10,
			fill: "45-#f00-#000"
		}).animate({
			cx: 300,
			transform: "s2"
		}, 1000, "elastic")
		.click(function () {
			redRect.animate({y: 200}, 1000);
		});

	p.rect(200, 300, 50, 50)
		.attr({
			fill: "orange"
		}).animate({
			transform: "r180",
			fill: "blue"
		}, 1000);

	p.text(50, 250, "Hello there")
		.attr({
			"font-family": "Georgia",
			"font-size": 20
		}).animate({
			y: 350
		}, 500, "elastic");
};