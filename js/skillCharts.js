var o = {
	init: function(elemId, name) {
		this.diagram(elemId, name);
	},

	random: function(l, u) {
		return Math.floor((Math.random()*(u - l + 1))+l);
	},

	diagram: function(elemId, name) {

		// Figure out the size to display the charts at
		// Each chart needs to scale with viewport size
		var win_height = $(window).height();
		var win_width = $(window).width();
		// Set x and y base to be half of the containing div
		var x_base = 250; // Original base was 250
		var y_base = 170; // Original base was 170

		var rad = 55;
		var speed = 250; // Represents the speed of the animations in ms

		if (win_width <= 360)
			return; // We won't render the charts so there's no use in drawing them
		else if (win_height <= 980) {
			x_base = $('#web').width() / 2;
			y_base = $('#web').height() / 2;
			rad = 15;
		}

		var r = Raphael(elemId, 500, 350),
			rad;

		// The circle gets an x and y center point
		r.circle(x_base, y_base, rad).attr({ stroke: 'none', fill: '#193340' });

		var title = r.text(x_base, y_base, name).attr({
			font: '20px Arial',
			fill: '#fff'
		}).toFront();

		r.customAttributes.arc = function(value, color, rad) {
			var v = 3.6 * value,
				alpha = v == 360 ? 359.99 : v,
				random = 180, //o.random(91, 240),
				a = (random - alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = x_base + rad * Math.cos(b),
				sy = y_base - rad * Math.sin(b),
				x = x_base + rad * Math.cos(a),
				y = y_base - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}

		$('#'+elemId+'Skills').find('.arc').each(function(i) {
			var t = $(this),
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();
			rad += 15;

			var z = r.path().attr({arc: [value, color, rad], 'stroke-width': 20 });

			z.mouseover(function() {
				this.animate({'stroke-width': 25, opacity: .75 }, 1000, 'elastic');
				title.animate({opacity: 0}, speed, '>', function() {
					this.attr({text: text + '\n' + value + '%' }).animate({opacity: 1}, speed, '<');
				});
			}).mouseout(function() {
				this.stop().animate({'stroke-width': 20, opacity: 1 }, 1000, 'elastic');
				title.stop().animate({opacity: 0}, speed, '>', function() {
					title.attr({ text: name}).animate({opacity: 1}, speed, '<');
				});
			});

		});
	}
}

$(function() { 
	o.init('web', 'Web');
	o.init('prog', 'Programming');
	o.init('devEnv', 'Dev Env.');
	o.init('other', 'Other');
});