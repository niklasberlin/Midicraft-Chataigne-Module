function init() {
	
}


function set_led(channel, note, animation, color){
	if (animation == 0){ //turn led off
		local.sendNoteOn(channel, note, 0);
		return;
	}
	if(color == 100){ //use color defined in controller -> different set of feedback
		if (animation==1){
			local.sendNoteOn(channel, note, 126); //velocity 126 for static dark in color defined in controller
			return;
		}else if (animation==17){
			local.sendNoteOn(channel, note, 127); //velocity 127 for static bright in color defined in controller
			return;
		}else if (animation==33){
			local.sendNoteOn(channel, note, 124); //velocity 127 for static complementary color
			return;
		}else if (animation==49){
			local.sendNoteOn(channel, note, 125); //velocity 124 for flashing bright/dark in color defined in controller
			return;
		}else if (animation==65){
			local.sendNoteOn(channel, note, 123); //velocity 123 for feedback and color as defined in controller
			return;
		}
	}else{ //compute velocity for all feedbacks where we want to control the color
		local.sendNoteOn(channel, note, (animation+color));
	}

}

