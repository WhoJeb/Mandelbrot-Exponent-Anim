#version 330 core

in vec3 vColor;
in vec3 pos;

out vec4 FragColor;

uniform vec2 res;
uniform float uTime;

const float MAX_ITER = 1000.0;

vec3 palette(float t) {
  vec3 a = vec3(0.000, 0.500, 0.500);
  vec3 b = vec3(0.000, 0.500, 0.500);
  vec3 c = vec3(0.000, 0.500, 0.333);
  vec3 d = vec3(0.000, 0.500, 4.667);

  return a + b * cos(6.28318*(c*t+d));
}

float iterateMandelbrotSet(vec2 coord) {
  float x = 0.0;
  float y = 0.0;

  for (float i = 0.0; i < MAX_ITER; i++) {
    if (x * x + y * y > 4.0) {
      return i/MAX_ITER;
    }

    float xtemp = x * x - y * y + coord.x;
    y = 2.0 * x * y + coord.y;
    x = xtemp;
  }
  return 1.0;
}

float iterateMandelbrotSet2(vec2 c, float exponent) {
  float x = 0.0;
  float y = 0.0;

  for (float i = 0.0; i < MAX_ITER; i++) {

    float r  = sqrt(x*x + y*y);
    float th = atan(y, x);

    // z = z^exponent
    float r_p  = pow(r, exponent);
    float th_p = th * exponent;

    // convert back to cartesian + add c
    x = r_p * cos(th_p) + c.x;
    y = r_p * sin(th_p) + c.y;

    if (r > 2.0)
      return i / MAX_ITER; // smooth-ish
  }
}


void main() {
  // Convert from clip space (-1..1) to 0..1 UV
  vec2 uv = (pos.xy * 0.5) + 0.5;

  // makes 1,1,1 the center 
  // (idk why this works but just importing the value normally doesn't cuz we are techincally undoing the first op on uv)
  uv = uv - 0.5;
  uv = uv * 2.0;

  // fix stretch issue
  uv.x *= res.x / res.y;

  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  float exponent = 3.0 + sin(uTime * 0.3);

  float m = iterateMandelbrotSet2(uv, exponent);

    // only color inside or near boundary
    if (m == 1.0) {
        // vec3 col = palette(exponent * 0.3 + uTime * 0.5);
        vec3 col = palette(exponent * 0.3);
        FragColor = vec4(col, 1.0);
    } else {
        FragColor = vec4(0.0);
    }
}
