import { useTexture } from '@react-three/drei'
import { GLSL } from 'gl-react'
import { useControls } from 'leva'
import { useMemo } from 'react'
import * as THREE from 'three'

// Vertex shader
export const vertexShader = GLSL/* glsl */ `
uniform float u_pointSize;
uniform float u_progress;
uniform vec2 u_mousePosition;

varying vec2 vUv;

attribute vec3 initPosition;

void main() {
    #include <begin_vertex>

    // Calculate the distance from the current vertex to the mouse position
    float distanceToMouse = distance(u_mousePosition, vec2(position.x, position.y));

    // Check if the distance is within the specified radius of 0.2
    if (distanceToMouse < 0.2) {
        transformed = vec3(position.x, position.y, 0.0); // Set z to 0 if within radius
    } else {
        transformed = vec3(position.x, position.y, (position.z - initPosition.z) * -u_progress);
    }

    #include <project_vertex>
    gl_PointSize = u_pointSize;

    vUv = position.xy;
}
`

// Fragment shader
export const fragmentShader = GLSL/* glsl */ `
	uniform sampler2D u_texture;
	uniform float u_numberLines;
	uniform float u_numberColumns;
	
	varying vec2 vUv;

	float circle(vec2 uv, float border) {
		float radius = 0.5;
		float dist = radius - distance(uv, vec2(0.5));
		return smoothstep(0.0, border, dist);
	}

	void main() {
		vec2 uv = gl_PointCoord;

		uv.y *= -1.;

		uv /= vec2(u_numberColumns, u_numberLines);

		float texOffsetU = vUv.x / u_numberColumns;
		float texOffsetV = vUv.y / u_numberLines;

		uv += vec2(texOffsetU, texOffsetV);


		vec4 texColor = texture2D(u_texture, uv); 

		gl_FragColor = texColor;

		// Discard pixels with low alpha
		if (gl_FragColor.r < 0.1) {
			discard;
		}

		gl_FragColor.a = circle(gl_PointCoord, 0.2);
	}
`

export const usePointsSetup = () => {
  const image = useTexture('/image-particles/image.jpg')

  const multiplier = 18

  const shaderSettings = {
    u_time: 0,
    u_pointSize: 2.8,
    u_texture: image,
    u_numberLines: 16 * multiplier,
    u_numberColumns: 9 * multiplier,
    u_progress: 1,
    u_mousePosition: new THREE.Vector2(0, 0),
  }

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_pointSize: { value: 1 },
      u_texture: { value: image },
      u_numberLines: { value: 9 * multiplier },
      u_numberColumns: { value: 16 * multiplier },
      u_progress: { value: 1 },
      u_mousePosition: { value: new THREE.Vector2(0, 0) },
    }),
    []
  )

  useControls(
    'shaderMaterial',
    {
      scale: {
        value: shaderSettings.u_pointSize,
        step: 0.01,
        min: 0,
        max: 20,
        onChange: (value: number) => {
          uniforms.u_pointSize.value = value
        },
      },
      progress: {
        value: shaderSettings.u_progress,
        step: 0.01,
        min: 0,
        max: 1,
        onChange: (value: number) => {
          uniforms.u_progress.value = value
        },
      },
    },

    { collapsed: true }
  )

  return { uniforms }
}
