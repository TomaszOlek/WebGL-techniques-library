import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import * as THREE from 'three'

const planeGeometry = new THREE.PlaneGeometry(30, 30, 10, 10)

const MAX_RIPPLES = 200
const RIPPLES_MOUSE_THRESHOLD = 6
const OPACITY_DECAY = 0.02
const RIPPLE_ROTATION_SPEED = 0.02

export type MouseRipplesRef = {
  texture: THREE.Texture
}

export const MouseRipplesScene = forwardRef<MouseRipplesRef>((props, ref) => {
  const viewport = useThree((state) => state.viewport)
  const ripples = useRef<(THREE.Mesh | null)[]>([])
  const renderTarget = useRef(new THREE.WebGLRenderTarget(512, 512))

  /**
   * Ripple
   */
  const mousePos = new THREE.Vector2()
  const prevMousePos = new THREE.Vector2()
  let currentWave = 0

  const brush = useTexture('/image-particles/brush.png')

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mousePos.x =
        (event.clientX / window.innerWidth) * viewport.width -
        viewport.width / 2
      mousePos.y =
        -(event.clientY / window.innerHeight) * viewport.height +
        viewport.height / 2

      if (
        Math.abs(mousePos.x - prevMousePos.x) > RIPPLES_MOUSE_THRESHOLD ||
        Math.abs(mousePos.y - prevMousePos.y) > RIPPLES_MOUSE_THRESHOLD
      ) {
        currentWave = (currentWave + 1) % MAX_RIPPLES
        const ripple = ripples.current[currentWave]

        if (ripple) {
          ripple.visible = true
          ripple.position.set(mousePos.x, mousePos.y, 0)
          ripple.material = new THREE.MeshBasicMaterial({
            map: brush,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            depthWrite: false,
          })
          ripple.scale.set(1, 1, 0)
        }

        prevMousePos.copy(mousePos)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [viewport.width, viewport.height])

  /**
   * Render loop
   */
  useFrame((state) => {
    ripples.current.forEach((ripple) => {
      if (ripple && ripple.visible) {
        ripple.rotation.z += RIPPLE_ROTATION_SPEED
        ripple.scale.x = ripple.scale.y = 0.98 * ripple.scale.x + 0.06

        const material = ripple.material as THREE.MeshBasicMaterial
        material.opacity -= OPACITY_DECAY

        if (material.opacity <= 0) ripple.visible = false
      }
    })

    state.gl.setRenderTarget(renderTarget.current)
    state.gl.clear()
    state.gl.render(state.scene, state.camera)
    state.gl.setRenderTarget(null)
    state.gl.clear()
  })

  useImperativeHandle(
    ref,
    () => ({
      texture: renderTarget.current.texture,
    }),
    []
  )

  return (
    <scene>
      {[...Array(MAX_RIPPLES)].map((_, index) => (
        <mesh
          key={index}
          ref={(element) => (ripples.current[index] = element)}
          geometry={planeGeometry}
          material={
            new THREE.MeshBasicMaterial({
              map: brush,
              transparent: true,
              opacity: 0,
              blending: THREE.AdditiveBlending,
              depthTest: false,
              depthWrite: false,
            })
          }
        />
      ))}
    </scene>
  )

  return null
})
