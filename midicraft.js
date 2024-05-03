function init() {
	local.values.removeContainer("tempo");
	local.values.removeContainer("mtc");
}

function colorMax(arr) {
	max = 0;
	for (i = 0; i < arr.length - 1; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}

function color2midi(color) {
	red = color[0];
	green = color[1];
	blue = color[2];

	max = colorMax(color);

	if (red < 0.2 && green < 0.2 && blue < 0.2) {
		return 0; //black
	}
	//scale colors
	red = red / max;
	green = green / max;
	blue = blue / max;
	if (red == 1 && green < 0.3 && blue < 0.3) {
		return 1; //red
	} else if (red < 0.3 && green == 1 && blue < 0.3) {
		return 2; //green
	} else if (red >= 0.3 && green >= 0.3 && blue < 0.3) {
		return 3; //yellow
	} else if (red < 0.3 && green < 0.3 && blue == 1) {
		return 4; //blue
	} else if (red >= 0.3 && green < 0.3 && blue >= 0.3) {
		return 5; //magenta
	} else if (red < 0.3 && green >= 0.3 && blue >= 0.3) {
		return 6; //Cyan
	} else if (red >= 0.3 && green >= 0.3 && blue >= 0.3) {
		return 7; //white
	}
}

function set_led(channel, note, animation, color) {
	if (animation == 0) {
		//turn led off
		local.sendNoteOn(channel, note, 0);
		return;
	}
	if (color == 100) {
		//use color defined in controller -> different set of feedback
		if (animation == 1) {
			local.sendNoteOn(channel, note, 126); //velocity 126 for static dark in color defined in controller
			return;
		} else if (animation == 17) {
			local.sendNoteOn(channel, note, 127); //velocity 127 for static bright in color defined in controller
			return;
		} else if (animation == 33) {
			local.sendNoteOn(channel, note, 124); //velocity 127 for static complementary color
			return;
		} else if (animation == 49) {
			local.sendNoteOn(channel, note, 125); //velocity 124 for flashing bright/dark in color defined in controller
			return;
		} else if (animation == 65) {
			local.sendNoteOn(channel, note, 123); //velocity 123 for feedback and color as defined in controller
			return;
		}
	} else {
		//compute velocity for all feedbacks where we want to control the color
		local.sendNoteOn(channel, note, animation + color);
	}
}
