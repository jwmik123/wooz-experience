uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform vec2 uMouse;

varying vec2 vUv;

// Rotating on 2D plane
vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main() {

    vec3 newPosition = position;

    // Rotation
    float perlinTwist = texture(
        uPerlinTexture,
        vec2(.5, uv.y * .2 - uTime * .005)
    ).r;
    float angle = perlinTwist * 10.;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(.25, uTime * 0.01)).r -.5,
        texture(uPerlinTexture, vec2(.75, uTime * 0.01)).r -.5
    );

    windOffset *= pow(uv.y, 1.) * 2.;
    newPosition.xz += windOffset;


    // Final Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
}
