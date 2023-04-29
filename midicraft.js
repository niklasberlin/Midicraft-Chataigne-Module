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
		}else if (animation==15){
			local.sendNoteOn(channel, note, 127); //velocity 127 for static bright in color defined in controller
			return;
		}else if (animation==29){
			local.sendNoteOn(channel, note, 124); //velocity 124 for flashing bright/dark in color defined in controller
			return;
		}else if (animation==43){
			local.sendNoteOn(channel, note, 125); //velocity 125 for flashing dark/off in color defined in controller
			return;
		}
	}else{
		local.sendNoteOn(channel, note, (animation+color)); //velocity 125 for flashing dark/off in color defined in controller
	}

}

