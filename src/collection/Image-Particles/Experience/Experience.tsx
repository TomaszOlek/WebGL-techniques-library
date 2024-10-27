import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { MouseRipplesRef, MouseRipplesScene } from './Scenes/Mouse-Ripples'
import { ParticleImageScene } from './Scenes/Particle-Image'

export const Experience = () => {
  const mouseRipplesRef = useRef<MouseRipplesRef>(null)
  const [displacementTexture, setDisplacementTexture] = useState<
    THREE.Texture | undefined
  >(undefined)

  useEffect(() => {
    if (mouseRipplesRef.current) {
      setDisplacementTexture(mouseRipplesRef.current.texture)
    }
  }, [mouseRipplesRef.current])

  return (
    <>
      <color args={['#000000']} attach="background" />

      <ParticleImageScene displacementTexture={displacementTexture} />

      <MouseRipplesScene ref={mouseRipplesRef} />
    </>
  )
}
