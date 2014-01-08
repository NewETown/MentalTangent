var o = {
	init: function(elemId, name) {
		this.diagram(elemId, name);
	},

	random: function(l, u) {
		return Math.floor((Math.random()*(u - l + 1))+l);
	},

	diagram: function(elemId, name) {

		var speed = 250;

		var r = Raphael(elemId, 500, 300),
			rad = 60;

		r.circle(250, 150, 60).attr({ stroke: 'none', fill: '#193340' });

		var title = r.text(250, 150, name).attr({
			font: '20px Arial',
			fill: '#fff'
		}).toFront();

		r.customAttributes.arc = function(value, color, rad) {
			var v = 3.6 * value,
				alpha = v == 360 ? 359.99 : v,
				random = 90, //o.random(91, 240),
				a = (random - alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 250 + rad * Math.cos(b),
				sy = 150 - rad * Math.sin(b),
				x = 250 + rad * Math.cos(a),
				y = 150 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}

		$('#'+elemId+'Skills').find('.arc').each(function(i) {
			var t = $(this),
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();
			rad += 10;

			var z = r.path().attr({arc: [value, color, rad], 'stroke-width': 10 });

			z.mouseover(function() {
				this.animate({'stroke-width': 20, opacity: .75 }, 1000, 'elastic');
				title.animate({opacity: 0}, speed, '>', function() {
					this.attr({text: text + '\n' + value + '%' }).animate({opacity: 1}, speed, '<');
				});
			}).mouseout(function() {
				this.stop().animate({'stroke-width': 12, opacity: 1 }, 1000, 'elastic');
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