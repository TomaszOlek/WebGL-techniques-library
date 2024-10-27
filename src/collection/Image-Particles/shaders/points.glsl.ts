import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { GLSL } from 'gl-react'
import { useControls } from 'leva'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

// Vertex shader
export const vertexShader = GLSL/* glsl */ `
uniform float u_pointSize;
uniform vec2 u_mousePosition;
uniform sampler2D u_displacement;
uniform float u_aspectRation;

uniform float u_numberLines;
uniform float u_numberColumns;

varying vec2 vUv;
varying vec4 displacement;

void main() {
    #include <begin_vertex>

    vUv = position.xy;

    vec2 displacementUv = uv;

		displacementUv.y *= -1.;

		displacementUv /= vec2(u_numberColumns, u_numberLines);

    float texOffsetU = vUv.x / u_numberColumns + 0.5;
		float texOffsetV = vUv.y / u_numberLines + 0.5;

		displacementUv += vec2(texOffsetU, texOffsetV) ;
    
    vec4 displacement = texture2D(u_displacement, displacementUv);
    
    transformed = position;
    transformed.z += displacement.r * 10.0; 

    #include <project_vertex>
    gl_PointSize = u_pointSize;
}
`
// Fragment shader
export const fragmentShader = GLSL/* glsl */ `
uniform sampler2D u_texture;
uniform float u_numberLines;
uniform float u_numberColumns;
uniform float u_aspectRation;
uniform vec2 u_scale;

varying vec2 vUv;

float circle(vec2 uv, float border) {
    float radius = 0.5;
    float dist = radius - distance(uv, vec2(0.5));
    return smoothstep(0.0, border, dist);
}

void main() {
    // Get the texture coordinates of the fragment
    vec2 uv = gl_PointCoord;

    // Invert the y-coordinate of the texture
    uv.y *= -1.0;

    // Scale down the texture coordinates based on the number of rows and columns
    uv /= vec2(u_numberColumns, u_numberLines);

    // Calculate texture offsets based on UV coordinates and grid layout
    float texOffsetU = vUv.x / u_numberColumns + 0.5;
    float texOffsetV = vUv.y / u_numberLines + 0.5;

    // Adjust the UV coordinates by the calculated offsets
    uv += vec2(texOffsetU, texOffsetV);

    // Apply the scaling factor to the UV coordinates
    uv *= u_scale;

    // Sample the texture at the calculated UV coordinates
    vec4 texColor = texture2D(u_texture, uv);

    // Output the final color for this fragment
    gl_FragColor = texColor;
}

`

type PointsSetupProps = {
  displacementTexture?: THREE.Texture
}

export const usePointsSetup = ({ displacementTexture }: PointsSetupProps) => {
  const { viewport, invalidate } = useThree((state) => ({
    viewport: state.viewport,
    invalidate: state.invalidate,
  }))

  const image = useTexture('/image-particles/image.jpg')
  const spacing = 1

  const uniforms = useMemo(() => {
    const columns = Math.floor(viewport.width / spacing)
    const rows = Math.floor(viewport.height / spacing)
    const viewportAspectRatio = viewport.width / viewport.height
    const textureAspectRatio = image.image.width / image.image.height

    // Calculate scale to preserve aspect ratio and cover viewport
    const scale = new THREE.Vector2(1, 1)
    if (textureAspectRatio > viewportAspectRatio) {
      scale.x = viewportAspectRatio / textureAspectRatio
    } else {
      scale.y = textureAspectRatio / viewportAspectRatio
    }

    return {
      u_pointSize: { value: 6 },
      u_texture: { value: image },
      u_displacement: { value: displacementTexture },
      u_numberLines: { value: rows },
      u_numberColumns: { value: columns },
      u_mousePosition: { value: new THREE.Vector2(0, 0) },
      u_aspectRatio: { value: viewportAspectRatio },
      u_scale: { value: scale },
    }
  }, [displacementTexture, viewport.width, viewport.height, image])

  useEffect(() => {
    const handleResize = () => invalidate()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [invalidate])

  return { uniforms }
}
