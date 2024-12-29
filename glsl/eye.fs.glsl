in vec3 modelPos;

void main() {
	// TODO: Add some conditions to color the pupil
	// The eye is facing +z so that when it is initially positioned on the fox,
	// it should be facing backward.
	if (modelPos.z > 0.93) {
		//pupil
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	} else if (modelPos.z > 0.75){
		//iris
		gl_FragColor = vec4(0.75, 0.0, 0.75, 1.0);
	} else {
		// The following color is Eye whites (the fox is tired, so the eye whites are pinkish).
		gl_FragColor = vec4(1.0, 0.9, 0.9, 1.0);
	}

	


}
