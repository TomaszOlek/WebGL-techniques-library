import { Center, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import {
  fragmentShader,
  usePointsSetup,
  vertexShader,
} from 'collection/Image-Particles/shaders/points.glsl'
import { gsap } from 'gsap'
import React, { useMemo } from 'react'
import * as THREE from 'three'
import { randFloat } from 'three/src/math/MathUtils.js'

export const Experience = () => {
  const viewport = useThree((state) => state.viewport)
  const { uniforms } = usePointsSetup()

  gsap.fromTo(
    uniforms.u_progress,
    { value: 1 },
    {
      value: 0,
      duration: 2,
      ease: 'power2.inOut',
    }
  )

  /**
   * Create a grid of particles
   */
  const multiplier = 18
  const columns = 16 * multiplier
  const rows = 9 * multiplier

  const [particlePositions, initPosition] = useMemo(() => {
    const positions = new Float32Array(columns * rows * 3)
    const initZPosition = new Float32Array(columns * rows * 3)

    for (let i = 0; i < columns; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const x = i
        const y = j
        const z = 0

        const index = (i * rows + j) * 3
        positions[index] = x
        positions[index + 1] = y
        positions[index + 2] = z

        initZPosition[index] = x
        initZPosition[index + 1] = y
        initZPosition[index + 2] = randFloat(10, 50)
      }
    }
    return [positions, initZPosition]
  }, [columns, rows])

  // Create geometry and material for points
  const pointGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    )
    geometry.setAttribute(
      'initPosition',
      new THREE.BufferAttribute(initPosition, 3)
    )

    return geometry
  }, [particlePositions])

  const pointMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    []
  )

  // Animate shader uniforms
  useFrame(({ clock, mouse }) => {
    const aspectRatio = viewport.width / viewport.height

    const mousePos = new THREE.Vector2(
      ((mouse.x + 1) / 2) * aspectRatio,
      (mouse.y + 1) / 2
    )

    uniforms.u_time.value = clock.getElapsedTime()
    uniforms.u_mousePosition.value = mousePos
  })

  return (
    <>
      <color args={['#000000']} attach="background" />

      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls makeDefault />

      <Center>
        <points geometry={pointGeometry} material={pointMaterial} />
      </Center>
    </>
  )
}
