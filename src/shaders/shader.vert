#version 330 core

layout (location = 0) in vec3 aPos;

out vec3 vColor;
out vec3 pos;

uniform mat4 projection;
uniform mat4 view;
uniform vec3 aColor;

void main() {
    gl_Position = projection * view * vec4(aPos, 1.0);
    vColor = vec3(0.5, 0.5, 0.5);
    pos = aPos;
}

