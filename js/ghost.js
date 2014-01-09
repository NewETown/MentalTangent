$(document).ready(function() {
	
	var	prevX = 0, newX = 0;

	var ghostPaper = Raphael('ghost', 200, 200);
	var ghost = ghostPaper.set();
	var eyes = ghostPaper.set();

	var lEye = ghostPaper.ellipse(50, 50, 15, 13)
			 .attr({
			 	fill: '#fff',
			 	'stroke-width': 0
			 });
	var rEye = ghostPaper.ellipse(110, 50, 15, 13)
		 .attr({
		 	fill: '#fff',
		 	'stroke-width': 0
		 });
	var mouth = ghostPaper.path("M50,90 C50,95 110,95 110,90") // "M<origin point> C<control for origin point> <control for close point> <close point>"
		.attr({
			stroke: '#fff',
			'stroke-width': 4
		});

	ghost.push(
		lEye, rEye, mouth	
	);

	eyes.push(
		lEye, rEye
	);

	// Directional looking set of animations
	function lookRight() {
		eyes.animate({'transform': 'T10,0'}, 300, center); 				// Animates the eyes
		mouth.animate({'path': 'M55,90 C50,95 110,95 110,90'}, 300); 	// Animates the mouth
	}

	function lookLeft() {
		eyes.animate({'transform': 'T-10, 0'}, 300, center); 			// Animates the eyes
		mouth.animate({'path': 'M50,90 C50,95 110,95 105,90'}, 300); 	// Animates the mouth
	}

	function center() {
		eyes.animate({'transform': 'T0,0'}, 300);
		mouth.animate({'path': 'M50,90 C50,95 110,95 110,90'}, 300);
	}

	// This is where we call the animations based on the actions of the user
	$("#main").mousewheel(function(event) {

    	newX = this.scrollLeft;

		if (newX > prevX)
			lookRight();
		else if (newX < prevX)
			lookLeft();

		prevX = newX;

	});

});

// var p = new Raphael(0, 0, 400, 400);
// p.rect(0, 0, 400, 400);

// var redRect = p.rect(20, 20, 50, 50)
// 	.attr({
// 		fill: "red",
// 		stroke: "none",
// 		cursor: "pointer"
// 	}).click(function() {
// 		this.attr({fill: "blue"});
// 	}).hover(function() {
// 		this.attr({fill: "green"});
// 	}, function() {
// 		this.attr({fill: "red"});
// 	});

// p.circle(100, 100, 30)
// 	.attr({
// 		"stroke-width": 10,
// 		fill: "45-#f00-#000"
// 	}).animate({
// 		cx: 300,
// 		transform: "s2"
// 	}, 1000, "elastic")
// 	.click(function () {
// 		redRect.animate({y: 200}, 1000);
// 	});

// p.rect(200, 300, 50, 50)
// 	.attr({
// 		fill: "orange"
// 	}).animate({
// 		transform: "r180",
// 		fill: "blue"
// 	}, 1000);

// p.text(50, 250, "Hello there")
// 	.attr({
// 		"font-family": "Georgia",
// 		"font-size": 20
// 	}).animate({
// 		y: 350
// 	}, 500, "elastic");

// var amount = 100;
// var loc = 100;
// var radius = 30;


// var archtype = Raphael("canvas", 200, 200);
// archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
//     var alpha = 360 / total * value,
//         a = (90 - alpha) * Math.PI / 180,
//         x = xloc + R * Math.cos(a),
//         y = yloc - R * Math.sin(a),
//         path;
//     if (total == value) {
//         path = [
//             ["M", xloc, yloc - R],
//             ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
//         ];
//     } else {
//         path = [
//             ["M", xloc, yloc - R],
//             ["A", R, R, 0, +(alpha > 180), 1, x, y]
//         ];
//     }
//     return {
//         path: path
//     };
// };



// archtype.circle(loc, loc, radius) // 59px radius makes room for 2px stroke
//                 .attr({
//                     stroke: '#e4e4e4',
//                     'stroke-width': 5
//                 });

// archtype.path().attr({
//    "stroke": "#f00",
//    "stroke-width": 2,
//    arc: [loc, loc, 0, 100, radius]
//    }).animate({
//        arc: [loc, loc, amount, 100, radius]
//    }, 1500, "easeOut")
//    ;

//    var circlePing = archtype.circle(loc, loc, radius)
//                 .attr({
//                 	fill: "white",
//                 	'fill-opacity': 0,
//                     stroke: 'green',
//                     'stroke-width': 2,
//                     'stroke-opacity': 0
//                 })
//                 .hover(
//                 function () {
//                 	circlePing.animate({r: radius * 1.5, 
// 			                 stroke: 'green',
// 			                 'stroke-opacity': 1},
// 			                1500,
// 			                'bounce');  
// 			    }, function () {
// 			        circlePing.animate({r: radius, 
// 			                 stroke: 'blue',
// 			                 'stroke-opacity': 0},
// 			                1500,
// 			                'linear');
// 			    });