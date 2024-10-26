import { Canvas } from '@react-three/fiber'
import { Experience } from 'collection/Image-Particles/Experience'
import React from 'react'
import styled from 'styled-components'

import { Layout } from 'views/Layout'

const Wrapper = styled.div`
  width: 100%;
  height: 100svh;
`

const ImageParticles = () => {
  return (
    <Layout>
      <Wrapper>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 10000,
            position: [0, 0, 250],
          }}
        >
          <Experience />
        </Canvas>
      </Wrapper>
    </Layout>
  )
}

export default ImageParticles
