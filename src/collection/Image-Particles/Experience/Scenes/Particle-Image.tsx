import { Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import {
  fragmentShader,
  usePointsSetup,
  vertexShader,
} from 'collection/Image-Particles/shaders/points.glsl'
import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'

type ParticleImageSceneProps = {
  displacementTexture?: THREE.Texture
}

export const ParticleImageScene: React.FC<ParticleImageSceneProps> = ({
  displacementTexture,
}) => {
  const viewport = useThree((state) => state.viewport)
  const { uniforms } = usePointsSetup({
    displacementTexture,
  })

  const spacing = 1
  const columns = Math.floor(viewport.width / spacing)
  const rows = Math.floor(viewport.height / spacing)

  const { pointGeometry, pointMaterial } = useMemo(() => {
    const positions = new Float32Array(columns * rows * 3)
    for (let i = 0; i < columns; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const x = i * spacing - (columns * spacing) / 2
        const y = j * spacing - (rows * spacing) / 2
        const z = 0
        const index = (i * rows + j) * 3
        positions[index] = x
        positions[index + 1] = y
        positions[index + 2] = z
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    return { pointGeometry: geometry, pointMaterial: material }
  }, [viewport.width, viewport.height])

  useEffect(() => {
    pointMaterial.uniforms.u_displacement.value = displacementTexture
  }, [displacementTexture])

  useFrame((state) => {
    const aspectRatio = viewport.width / viewport.height
    const mousePos = new THREE.Vector2(
      ((state.mouse.x + 1) / 2) * aspectRatio,
      (state.mouse.y + 1) / 2
    )
    uniforms.u_mousePosition.value = mousePos

    state.gl.render(state.scene, state.camera)
  })

  return (
    <scene>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Center>
        <points geometry={pointGeometry} material={pointMaterial} />
      </Center>
    </scene>
  )
}
