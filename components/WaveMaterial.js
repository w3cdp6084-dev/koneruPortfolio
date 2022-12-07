import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const WaveMaterial = shaderMaterial(
  {
    time: 0.1,
    colorStart: new THREE.Color('#F7F8F9'),
    colorEnd: new THREE.Color('black')
  },
  glsl`
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
  glsl`
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
      uniform float time;
      uniform vec3 colorStart;
      uniform vec3 colorEnd;
      varying vec2 vUv;
      void main() {
        vec2 displacedUv = vUv + cnoise3(vec3(vUv * 1.0, time * 0.1));
        float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.8));
        float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 1.1;
        strength += outerGlow;
        strength += step(-0.1, strength) * 2.6;
        strength = clamp(strength, 0.0, 9.0);
        vec3 color = mix(colorStart, colorEnd, strength);
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <encodings_fragment>
      }`
)

extend({ WaveMaterial })

export { WaveMaterial }
