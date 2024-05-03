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

	// 0 - white
	// 1 - rot
	// 2 - Orange
	// 3 - Gelb
	// 4 - Gelbgrün
	// 5 - Grün
	// 6 - Meergrün
	// 7 - Cyan
	// 8 - Lavendel
	// 9 - Blau
	// 10 - Lila
	// 11 - Magenta
	// 12 - Pink
	// 13 - CTO
	// 14 - CTB
	if (red == 1 && green < 0.3 && blue < 0.3) {
		return 1; //red
	} else if (red < 0.3 && green == 1 && blue < 0.3) {
		return 5; //green
	} else if (red < 0.3 && green < 0.3 && blue == 1) {
		return 9; //blue
	} else if (red > 0.7 && green > 0.7 && blue < 0.3) {
		return 3; //yellow
	} else if (red > 0.7 && green < 0.3 && blue > 0.7) {
		return 11; //magenta
	} else if (red < 0.3 && green > 0.7 && blue > 0.7) {
		return 7; //cyan
	} else if (red == 1 && green <= 0.7 && blue < 0.3) {
		return 2; //ornage
	} else if (red <= 0.7 && green == 1 && blue < 0.3) {
		return 4; //ferngreen
	} else if (red < 0.3 && green == 1 && blue <= 0.7) {
		return 6; //seagreen
	} else if (red < 0.3 && green <= 0.7 && blue == 1) {
		return 8; //lavender
	} else if (red <= 0.7 && green < 0.3 && blue == 1) {
		return 10; //violet
	} else if (red == 1 && green < 0.3 && blue <= 0.7) {
		return 12; //pink
	} else if (red > 0.85 && green > 0.85 && blue > 0.85) {
		return 0; //white
	} else if (red > 0.9 && green > 0.65 && blue > 0.35 && blue < green) {
		return 13; //CTO
	} else if (red > 0.35 && green > 0.65 && blue > 0.9 && red < green) {
		return 14; //CTB
	} else {
		return 100; //Default as set in controller
		script.log("coudn't match provided color, using color set in controller instead");
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

function set_LED_by_color(channel, note, animation, colorvalue) {
	color = color2midi(colorvalue);
	set_led(channel, note, animation, color);
}
