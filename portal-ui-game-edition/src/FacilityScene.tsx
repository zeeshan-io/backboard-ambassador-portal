import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { ThemeMode } from './spinoffData'

export type EntrancePhase = 'form' | 'transition' | 'arrived'

type FacilitySceneProps = {
  theme: ThemeMode
  emailReady: boolean
  phase: EntrancePhase
  reducedMotion: boolean
}

function createJerseyShape() {
  const shape = new THREE.Shape()
  shape.moveTo(-0.44, -0.68)
  shape.lineTo(-0.5, 0.34)
  shape.quadraticCurveTo(-0.7, 0.39, -0.92, 0.22)
  shape.lineTo(-1.13, 0.48)
  shape.quadraticCurveTo(-0.77, 0.83, -0.43, 0.79)
  shape.quadraticCurveTo(-0.24, 0.93, 0, 0.93)
  shape.quadraticCurveTo(0.24, 0.93, 0.43, 0.79)
  shape.quadraticCurveTo(0.77, 0.83, 1.13, 0.48)
  shape.lineTo(0.92, 0.22)
  shape.quadraticCurveTo(0.7, 0.39, 0.5, 0.34)
  shape.lineTo(0.44, -0.68)
  shape.quadraticCurveTo(0, -0.79, -0.44, -0.68)
  return shape
}

function useLabelTexture(
  heading: string,
  detail: string,
  theme: ThemeMode,
  accent = '#168bea',
) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 320
    const context = canvas.getContext('2d')

    if (!context) return null

    context.fillStyle = theme === 'arena' ? '#07111d' : '#eef3f6'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = accent
    context.fillRect(0, 0, 18, canvas.height)
    context.fillRect(50, 50, 70, 12)
    context.fillStyle = theme === 'arena' ? '#f6fbff' : '#081321'
    context.font = '700 64px Arial'
    context.fillText(heading, 52, 154)
    context.fillStyle = theme === 'arena' ? '#8da3b9' : '#4f6171'
    context.font = '500 26px Arial'
    context.fillText(detail, 52, 218)

    const nextTexture = new THREE.CanvasTexture(canvas)
    nextTexture.colorSpace = THREE.SRGBColorSpace
    nextTexture.anisotropy = 4
    return nextTexture
  }, [accent, detail, heading, theme])

  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}

function FacilitySign({ theme, emailReady }: { theme: ThemeMode; emailReady: boolean }) {
  const texture = useLabelTexture(
    'BACKBOARD PERFORMANCE CENTRE',
    emailReady ? 'ACCESS VERIFIED  /  TUNNEL READY' : 'OTTAWA  /  AMBASSADOR FACILITY 01',
    theme,
    emailReady ? '#43d7a4' : '#168bea',
  )

  if (!texture) return null

  return (
    <mesh position={[0, 3.75, -3.72]}>
      <planeGeometry args={[6.9, 2.15]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

function Jersey({
  color,
  number,
  position,
}: {
  color: string
  number: string
  position: [number, number, number]
}) {
  const texture = useLabelTexture(number, 'AMBASSADOR', 'arena', '#f6fbff')
  const jerseyShape = useMemo(() => createJerseyShape(), [])
  const extrusion = useMemo(
    () => ({
      depth: 0.09,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    }),
    [],
  )

  return (
    <group position={position}>
      <mesh position={[0, 1.45, 0]} castShadow>
        <extrudeGeometry args={[jerseyShape, extrusion]} />
        <meshStandardMaterial color={color} roughness={0.72} />
      </mesh>
      {texture && (
        <mesh position={[0, 1.51, 0.123]}>
          <planeGeometry args={[0.72, 0.65]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      )}
      <mesh position={[0, 2.43, -0.02]}>
        <torusGeometry args={[0.23, 0.025, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#93a4b4" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 2.65, -0.02]}>
        <cylinderGeometry args={[0.018, 0.018, 0.42, 8]} />
        <meshStandardMaterial color="#93a4b4" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  )
}

function Locker({
  x,
  theme,
  featured = false,
}: {
  x: number
  theme: ThemeMode
  featured?: boolean
}) {
  const shell = theme === 'arena' ? '#162231' : '#dce4e9'
  const inside = theme === 'arena' ? '#07111d' : '#b9c6ce'
  const trim = featured ? '#168bea' : theme === 'arena' ? '#405267' : '#8b9ca8'

  return (
    <group position={[x, 0, -3.25]}>
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.15, 3.5, 0.84]} />
        <meshStandardMaterial color={shell} roughness={0.6} metalness={0.25} />
      </mesh>
      <mesh position={[0, 1.72, 0.46]}>
        <boxGeometry args={[1.78, 2.9, 0.06]} />
        <meshStandardMaterial color={inside} roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.08, 0.52]}>
        <boxGeometry args={[1.8, 0.09, 0.08]} />
        <meshStandardMaterial color={trim} emissive={trim} emissiveIntensity={featured ? 1.2 : 0.08} />
      </mesh>
      <mesh position={[0, 0.56, 0.52]}>
        <boxGeometry args={[1.72, 0.08, 0.1]} />
        <meshStandardMaterial color={trim} />
      </mesh>
      {featured && <Jersey color="#147fd1" number="07" position={[0, 0.54, 0.55]} />}
    </group>
  )
}

function EquipmentBench({ theme }: { theme: ThemeMode }) {
  return (
    <group position={[0, 0, 1.5]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[4.6, 0.28, 1.15]} />
        <meshStandardMaterial color={theme === 'arena' ? '#6c4b32' : '#926744'} roughness={0.68} />
      </mesh>
      {[-1.9, 1.9].map((x) => (
        <mesh position={[x, 0.28, 0]} castShadow key={x}>
          <boxGeometry args={[0.16, 0.58, 0.82]} />
          <meshStandardMaterial color="#263342" metalness={0.62} roughness={0.32} />
        </mesh>
      ))}
      <mesh position={[-1.1, 0.84, 0]} rotation={[0, 0, -0.16]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.3, 12]} />
        <meshStandardMaterial color="#32261f" roughness={0.5} />
      </mesh>
      <mesh position={[-0.62, -0.17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.16, 0.76, 0.16]} />
        <meshStandardMaterial color="#32261f" roughness={0.5} />
      </mesh>
      <mesh position={[1.25, 0.86, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.12, 24]} />
        <meshStandardMaterial color="#050708" roughness={0.72} />
      </mesh>
      <group position={[0.45, 0.68, 0.12]} rotation={[0.08, -0.4, 0]}>
        <mesh position={[0, 0.43, 0]} castShadow>
          <sphereGeometry args={[0.38, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.67]} />
          <meshStandardMaterial color="#147dcc" roughness={0.34} metalness={0.16} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.35, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.29, 0.018, 10, 32, Math.PI]} />
          <meshStandardMaterial color="#c5d0d7" metalness={0.82} roughness={0.2} />
        </mesh>
        {[-0.17, 0, 0.17].map((x) => (
          <mesh position={[x, 0.26, 0.32]} rotation={[0.12, 0, x * 0.55]} key={x}>
            <cylinderGeometry args={[0.012, 0.012, 0.48, 8]} />
            <meshStandardMaterial color="#c5d0d7" metalness={0.82} roughness={0.2} />
          </mesh>
        ))}
      </group>
      <group position={[-1.6, 0.92, 0.25]} rotation={[0, 0.15, -0.2]}>
        <mesh position={[0, 0.31, 0]}>
          <capsuleGeometry args={[0.12, 0.42, 8, 16]} />
          <meshStandardMaterial color="#dce6eb" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <capsuleGeometry args={[0.15, 0.32, 8, 16]} />
          <meshStandardMaterial color="#202e3b" roughness={0.62} />
        </mesh>
      </group>
    </group>
  )
}

function TunnelDoors({
  emailReady,
  theme,
}: {
  emailReady: boolean
  theme: ThemeMode
}) {
  const leftDoor = useRef<THREE.Group>(null)
  const rightDoor = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const target = emailReady ? 2.15 : 0.72
    if (leftDoor.current) {
      leftDoor.current.position.x = THREE.MathUtils.damp(leftDoor.current.position.x, -target, 4.2, delta)
    }
    if (rightDoor.current) {
      rightDoor.current.position.x = THREE.MathUtils.damp(rightDoor.current.position.x, target, 4.2, delta)
    }
  })

  const door = theme === 'arena' ? '#1c2a39' : '#b7c2c9'
  const light = emailReady ? '#43d7a4' : '#168bea'

  return (
    <group position={[0, 0, -4.02]}>
      <group ref={leftDoor} position={[-0.72, 0, 0]}>
        <mesh position={[0, 1.78, 0.04]} castShadow>
          <boxGeometry args={[1.42, 3.55, 0.16]} />
          <meshStandardMaterial color={door} metalness={0.5} roughness={0.38} />
        </mesh>
        <mesh position={[0.52, 1.78, 0.15]}>
          <boxGeometry args={[0.05, 2.8, 0.03]} />
          <meshStandardMaterial color={light} emissive={light} emissiveIntensity={1.8} />
        </mesh>
      </group>
      <group ref={rightDoor} position={[0.72, 0, 0]}>
        <mesh position={[0, 1.78, 0.04]} castShadow>
          <boxGeometry args={[1.42, 3.55, 0.16]} />
          <meshStandardMaterial color={door} metalness={0.5} roughness={0.38} />
        </mesh>
        <mesh position={[-0.52, 1.78, 0.15]}>
          <boxGeometry args={[0.05, 2.8, 0.03]} />
          <meshStandardMaterial color={light} emissive={light} emissiveIntensity={1.8} />
        </mesh>
      </group>
    </group>
  )
}

function Tunnel({ theme, emailReady }: { theme: ThemeMode; emailReady: boolean }) {
  const wall = theme === 'arena' ? '#172432' : '#bfcbd2'
  const floor = theme === 'arena' ? '#111a24' : '#6c7981'
  const light = emailReady ? '#43d7a4' : '#168bea'

  return (
    <group position={[0, 0, -8]}>
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.18, 8]} />
        <meshStandardMaterial color={floor} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.075, 0]}>
        <boxGeometry args={[0.055, 0.018, 7.8]} />
        <meshStandardMaterial color={light} emissive={light} emissiveIntensity={emailReady ? 1.5 : 0.22} />
      </mesh>
      {[-3, -1, 1, 3].map((z) => (
        <group position={[0, 0, z]} key={z}>
          <mesh position={[0, 0.02, 0]}>
            <torusGeometry args={[2.16, 0.08, 14, 48, Math.PI]} />
            <meshStandardMaterial color={wall} roughness={0.44} metalness={0.46} />
          </mesh>
          <mesh position={[-1.84, 2.8, 0]}>
            <boxGeometry args={[0.06, 1.15, 0.12]} />
            <meshStandardMaterial color={light} emissive={light} emissiveIntensity={emailReady ? 2.2 : 0.55} />
          </mesh>
          <mesh position={[1.84, 2.8, 0]}>
            <boxGeometry args={[0.06, 1.15, 0.12]} />
            <meshStandardMaterial color={light} emissive={light} emissiveIntensity={emailReady ? 2.2 : 0.55} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Goal() {
  return (
    <group position={[0, 0.15, -19.1]}>
      <mesh position={[-1.35, 0.82, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 10]} />
        <meshStandardMaterial color="#df3345" roughness={0.4} />
      </mesh>
      <mesh position={[1.35, 0.82, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 10]} />
        <meshStandardMaterial color="#df3345" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.74, 10]} />
        <meshStandardMaterial color="#df3345" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.85, -0.2]}>
        <boxGeometry args={[2.62, 1.42, 0.03]} />
        <meshStandardMaterial color="#dce8ee" transparent opacity={0.5} wireframe />
      </mesh>
    </group>
  )
}

function IceSpray({
  position,
  phaseOffset,
  reducedMotion,
}: {
  position: [number, number, number]
  phaseOffset: number
  reducedMotion: boolean
}) {
  const spray = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!spray.current || reducedMotion) return
    const time = state.clock.elapsedTime * 2.2 + phaseOffset
    spray.current.rotation.z = Math.sin(time) * 0.12
    spray.current.scale.setScalar(0.78 + Math.abs(Math.sin(time)) * 0.32)
  })

  return (
    <group ref={spray} position={position}>
      {Array.from({ length: 9 }, (_, index) => (
        <mesh
          position={[
            -0.2 - (index % 3) * 0.09,
            0.04 + Math.floor(index / 3) * 0.075,
            -0.13 + (index % 2) * 0.08,
          ]}
          key={index}
        >
          <sphereGeometry args={[0.025 + (index % 3) * 0.008, 8, 6]} />
          <meshBasicMaterial color="#e8f6fa" transparent opacity={0.52} />
        </mesh>
      ))}
    </group>
  )
}

function AnimatedSkater({
  jersey,
  accent,
  lane,
  phaseOffset,
  reducedMotion,
  goalie = false,
}: {
  jersey: string
  accent: string
  lane: number
  phaseOffset: number
  reducedMotion: boolean
  goalie?: boolean
}) {
  const skater = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Group>(null)
  const rightLeg = useRef<THREE.Group>(null)
  const stickArm = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!skater.current) return

    const time = state.clock.elapsedTime * (goalie ? 0.72 : 0.48) + phaseOffset
    const stride = Math.sin(time * 7)
    const targetX = goalie ? 6.65 + Math.sin(time * 1.7) * 0.16 : Math.sin(time) * 4.8
    const targetZ = goalie ? -16.8 + Math.cos(time * 1.7) * 0.78 : -16 + lane + Math.cos(time) * 1.28
    const targetRotation = goalie
      ? -Math.PI / 2
      : Math.atan2(Math.cos(time) * 4.8, -Math.sin(time) * 1.28)

    skater.current.position.x = THREE.MathUtils.damp(skater.current.position.x, targetX, 7, delta)
    skater.current.position.z = THREE.MathUtils.damp(skater.current.position.z, targetZ, 7, delta)
    skater.current.rotation.y = THREE.MathUtils.damp(skater.current.rotation.y, targetRotation, 6, delta)

    if (!reducedMotion) {
      skater.current.position.y = 0.15 + Math.abs(stride) * 0.035
      if (torso.current) torso.current.rotation.z = stride * (goalie ? 0.02 : 0.065)
      if (leftLeg.current) leftLeg.current.rotation.z = stride * 0.28
      if (rightLeg.current) rightLeg.current.rotation.z = -stride * 0.28
      if (stickArm.current) stickArm.current.rotation.z = -0.38 + Math.cos(time * 4) * 0.08
    }
  })

  return (
    <group ref={skater} position={[0, 0.15, -16 + lane]} scale={goalie ? 1.06 : 0.92}>
      <group ref={torso} rotation={[0.08, 0, goalie ? 0 : -0.08]}>
        <mesh position={[0, 1.18, 0]} castShadow>
          <capsuleGeometry args={[goalie ? 0.38 : 0.3, goalie ? 0.62 : 0.72, 12, 24]} />
          <meshStandardMaterial color={jersey} roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.18, 0.29]}>
          <circleGeometry args={[0.13, 24]} />
          <meshStandardMaterial color={accent} roughness={0.45} />
        </mesh>
        <mesh position={[0, 1.88, 0]} castShadow>
          <sphereGeometry args={[0.25, 24, 18]} />
          <meshStandardMaterial color="#c88b68" roughness={0.62} />
        </mesh>
        <mesh position={[0, 1.98, -0.03]} castShadow>
          <sphereGeometry args={[0.275, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <meshStandardMaterial color={accent} roughness={0.32} metalness={0.13} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 1.85, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.016, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#cad4da" metalness={0.8} roughness={0.2} />
        </mesh>
        <group ref={stickArm} position={[0.34, 1.36, 0]} rotation={[0, 0, -0.4]}>
          <mesh position={[0, -0.27, 0]} rotation={[0, 0, -0.08]} castShadow>
            <capsuleGeometry args={[0.08, 0.46, 8, 14]} />
            <meshStandardMaterial color={jersey} roughness={0.55} />
          </mesh>
          <mesh position={[0.35, -0.88, 0.02]} rotation={[0, 0, -0.34]} castShadow>
            <cylinderGeometry args={[0.025, 0.032, 1.55, 12]} />
            <meshStandardMaterial color="#8b633f" roughness={0.48} />
          </mesh>
          <mesh position={[0.67, -1.57, 0.02]} rotation={[0, 0, Math.PI / 2.8]}>
            <capsuleGeometry args={[0.045, 0.38, 6, 12]} />
            <meshStandardMaterial color="#8b633f" roughness={0.48} />
          </mesh>
        </group>
        <mesh position={[-0.36, 1.36, 0]} rotation={[0, 0, 0.48]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 8, 14]} />
          <meshStandardMaterial color={jersey} roughness={0.55} />
        </mesh>
      </group>

      <group ref={leftLeg} position={[-0.16, 0.55, 0]}>
        <mesh position={[0, -0.26, 0]} rotation={[0, 0, 0.06]} castShadow>
          <capsuleGeometry args={[goalie ? 0.14 : 0.105, 0.46, 8, 14]} />
          <meshStandardMaterial color={goalie ? '#e8eef1' : '#172434'} roughness={0.6} />
        </mesh>
        <mesh position={[0.03, -0.65, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.035, 0.31, 6, 12]} />
          <meshStandardMaterial color="#7f929f" metalness={0.75} roughness={0.2} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.16, 0.55, 0]}>
        <mesh position={[0, -0.26, 0]} rotation={[0, 0, -0.06]} castShadow>
          <capsuleGeometry args={[goalie ? 0.14 : 0.105, 0.46, 8, 14]} />
          <meshStandardMaterial color={goalie ? '#e8eef1' : '#172434'} roughness={0.6} />
        </mesh>
        <mesh position={[0.03, -0.65, 0.08]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.035, 0.31, 6, 12]} />
          <meshStandardMaterial color="#7f929f" metalness={0.75} roughness={0.2} />
        </mesh>
      </group>
      {!goalie && <IceSpray position={[-0.26, 0.03, -0.18]} phaseOffset={phaseOffset} reducedMotion={reducedMotion} />}
    </group>
  )
}

function AnimatedPuck({
  phase,
  reducedMotion,
}: {
  phase: EntrancePhase
  reducedMotion: boolean
}) {
  const puck = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!puck.current) return
    const time = state.clock.elapsedTime
    const targetX = phase === 'arrived' ? Math.sin(time * 1.8) * 2.7 : 0
    const targetZ = phase === 'form' ? -7.3 : phase === 'transition' ? -18.3 : -16 + Math.cos(time * 1.25) * 1.1
    puck.current.position.x = THREE.MathUtils.damp(puck.current.position.x, targetX, phase === 'transition' ? 2.2 : 6, delta)
    puck.current.position.z = THREE.MathUtils.damp(puck.current.position.z, targetZ, phase === 'transition' ? 1.6 : 6, delta)
    if (!reducedMotion) puck.current.rotation.y += delta * 8
  })

  return (
    <mesh ref={puck} position={[0, 0.18, -7.3]} castShadow>
      <cylinderGeometry args={[0.22, 0.22, 0.1, 32]} />
      <meshStandardMaterial color="#050708" roughness={0.5} metalness={0.12} />
    </mesh>
  )
}

function OttawaSkyline({ theme }: { theme: ThemeMode }) {
  const stone = theme === 'arena' ? '#26384c' : '#8ca1ae'
  const roof = theme === 'arena' ? '#2e8a78' : '#3d9a84'
  const windowColor = theme === 'arena' ? '#f4c96b' : '#d9edf5'

  return (
    <group position={[0, 0, -23]}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[15, 3, 0.3]} />
        <meshStandardMaterial color={theme === 'arena' ? '#09121e' : '#bed6e2'} />
      </mesh>
      <mesh position={[0, 1.15, 0.25]}>
        <boxGeometry args={[5.8, 2.3, 0.7]} />
        <meshStandardMaterial color={stone} roughness={0.88} />
      </mesh>
      <mesh position={[0, 3.1, 0.25]}>
        <boxGeometry args={[1.1, 4.2, 0.8]} />
        <meshStandardMaterial color={stone} roughness={0.88} />
      </mesh>
      <mesh position={[0, 5.45, 0.25]}>
        <coneGeometry args={[0.78, 0.7, 4]} />
        <meshStandardMaterial color={roof} roughness={0.78} />
      </mesh>
      {[-5.6, -4.3, 4.1, 5.4].map((x, index) => (
        <mesh position={[x, 0.9 + (index % 2) * 0.45, 0.2]} key={x}>
          <boxGeometry args={[1.8, 1.8 + (index % 2) * 0.9, 0.6]} />
          <meshStandardMaterial color={index === 2 ? '#145987' : stone} roughness={0.82} />
        </mesh>
      ))}
      {[-2, -1.3, -0.65, 0.65, 1.3, 2].map((x) => (
        <mesh position={[x, 1.25, 0.62]} key={x}>
          <boxGeometry args={[0.22, 0.4, 0.03]} />
          <meshStandardMaterial color={windowColor} emissive={windowColor} emissiveIntensity={theme === 'arena' ? 0.75 : 0.05} />
        </mesh>
      ))}
    </group>
  )
}

function Rink({
  theme,
  arrived,
  phase,
  reducedMotion,
}: {
  theme: ThemeMode
  arrived: boolean
  phase: EntrancePhase
  reducedMotion: boolean
}) {
  const ice = theme === 'arena' ? '#80afc3' : '#cce6ed'
  const boards = theme === 'arena' ? '#d5e4e9' : '#ffffff'

  return (
    <group>
      <mesh position={[0, -0.02, -16]} receiveShadow>
        <boxGeometry args={[16, 0.18, 9]} />
        <meshStandardMaterial color={ice} roughness={0.35} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.085, -16]}>
        <boxGeometry args={[0.06, 0.02, 8.6]} />
        <meshStandardMaterial color="#df3345" />
      </mesh>
      <mesh position={[0, 0.09, -16]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.035, 8, 40]} />
        <meshStandardMaterial color="#df3345" />
      </mesh>
      {[-4.6, 4.6].map((x) => (
        <mesh position={[x, 0.09, -16]} key={x}>
          <boxGeometry args={[0.06, 0.02, 8.6]} />
          <meshStandardMaterial color="#168bea" />
        </mesh>
      ))}
      {[
        [0, 0.46, -20.55, 16.4, 0.82, 0.18],
        [0, 0.46, -11.45, 16.4, 0.82, 0.18],
        [-8.1, 0.46, -16, 0.18, 0.82, 9],
        [8.1, 0.46, -16, 0.18, 0.82, 9],
      ].map(([x, y, z, width, height, depth], index) => (
        <mesh position={[x, y, z]} key={index}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={boards} roughness={0.7} />
        </mesh>
      ))}
      <Goal />
      <AnimatedPuck phase={phase} reducedMotion={reducedMotion} />
      {(arrived || phase === 'transition') && (
        <>
          <AnimatedSkater jersey="#147dcc" accent="#081321" lane={-1.35} phaseOffset={0} reducedMotion={reducedMotion} />
          <AnimatedSkater jersey="#df4552" accent="#f4f8fa" lane={1.05} phaseOffset={2.1} reducedMotion={reducedMotion} />
          <AnimatedSkater jersey="#f2bd3f" accent="#081321" lane={0.15} phaseOffset={4.3} reducedMotion={reducedMotion} />
          <AnimatedSkater jersey="#31b784" accent="#f4f8fa" lane={0} phaseOffset={1} reducedMotion={reducedMotion} goalie />
        </>
      )}
      <OttawaSkyline theme={theme} />
    </group>
  )
}

function SceneContent({ theme, emailReady, phase, reducedMotion }: FacilitySceneProps) {
  const world = useRef<THREE.Group>(null)
  const travel = useRef(phase === 'arrived' ? 1 : 0)
  const lookTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const destination = phase === 'form' ? 0 : 1
    if (reducedMotion) {
      travel.current = destination
    } else {
      const speed = phase === 'transition' ? delta / 2.5 : delta * 2.8
      travel.current = THREE.MathUtils.clamp(
        travel.current + Math.sign(destination - travel.current) * speed,
        0,
        1,
      )
    }

    const rawProgress = THREE.MathUtils.smoothstep(travel.current, 0, 1)
    const eased =
      rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2
    const cinematicArc = reducedMotion ? 0 : Math.sin(eased * Math.PI)
    const pointerX = phase === 'form' && !reducedMotion ? state.pointer.x * 0.28 : 0
    const pointerY = phase === 'form' && !reducedMotion ? state.pointer.y * 0.12 : 0

    state.camera.position.set(
      THREE.MathUtils.lerp(0, 8.1, eased) + cinematicArc * 0.72 + pointerX,
      THREE.MathUtils.lerp(2.8, 5.7, eased) + cinematicArc * 0.34 + pointerY,
      THREE.MathUtils.lerp(8.4, -8.8, eased),
    )
    lookTarget.set(
      THREE.MathUtils.lerp(0, 0, eased),
      THREE.MathUtils.lerp(1.55, 0.2, eased),
      THREE.MathUtils.lerp(-3.6, -16, eased),
    )
    state.camera.lookAt(lookTarget)

    if (world.current && phase === 'form' && !reducedMotion) {
      world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, state.pointer.x * 0.012, 2.8, delta)
    }
  })

  const palette = {
    arena: {
      background: '#050b13',
      wall: '#111c29',
      floor: '#17202a',
      line: '#304158',
      ambient: 0.72,
    },
    day: {
      background: '#c9dce6',
      wall: '#d4dde2',
      floor: '#5d6871',
      line: '#8ea0aa',
      ambient: 1.3,
    },
  }[theme]

  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.background, 18, 42]} />
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[5, 9, 8]} intensity={theme === 'arena' ? 1.65 : 2.3} color="#f3f7fa" castShadow />
      <pointLight position={[0, 2.7, -2]} intensity={emailReady ? 18 : 7} color={emailReady ? '#43d7a4' : '#168bea'} distance={10} />
      <pointLight position={[0, 8, -15]} intensity={phase === 'arrived' ? 30 : 12} color="#dcecff" distance={18} />

      <group ref={world}>
        <mesh position={[0, -0.16, 1.7]} receiveShadow>
          <boxGeometry args={[13.6, 0.3, 11.6]} />
          <meshStandardMaterial color={palette.floor} roughness={0.72} metalness={0.08} />
        </mesh>
        <mesh position={[-6.72, 2.7, 1.7]} receiveShadow>
          <boxGeometry args={[0.24, 5.4, 11.6]} />
          <meshStandardMaterial color={palette.wall} roughness={0.76} />
        </mesh>
        <mesh position={[6.72, 2.7, 1.7]} receiveShadow>
          <boxGeometry args={[0.24, 5.4, 11.6]} />
          <meshStandardMaterial color={palette.wall} roughness={0.76} />
        </mesh>
        <mesh position={[-4.65, 2.05, -3.84]} receiveShadow>
          <boxGeometry args={[3.9, 4.1, 0.24]} />
          <meshStandardMaterial color={palette.wall} roughness={0.76} />
        </mesh>
        <mesh position={[4.65, 2.05, -3.84]} receiveShadow>
          <boxGeometry args={[3.9, 4.1, 0.24]} />
          <meshStandardMaterial color={palette.wall} roughness={0.76} />
        </mesh>
        <mesh position={[0, 4.7, 1.7]}>
          <boxGeometry args={[13.6, 0.18, 11.6]} />
          <meshStandardMaterial color={palette.wall} roughness={0.76} />
        </mesh>

        {[-5.4, -3.15, 3.15, 5.4].map((x, index) => (
          <Locker x={x} theme={theme} featured={index === 1} key={x} />
        ))}
        <FacilitySign theme={theme} emailReady={emailReady} />
        <TunnelDoors emailReady={emailReady} theme={theme} />
        <Tunnel theme={theme} emailReady={emailReady} />
        <EquipmentBench theme={theme} />
        <Rink
          theme={theme}
          arrived={phase === 'arrived'}
          phase={phase}
          reducedMotion={reducedMotion}
        />

        {[-4.2, -1.4, 1.4, 4.2].map((x) => (
          <mesh position={[x, 4.55, 0.8]} key={x}>
            <boxGeometry args={[1.6, 0.07, 0.45]} />
            <meshStandardMaterial color="#f0f5f6" emissive="#d9efff" emissiveIntensity={theme === 'arena' ? 1.8 : 0.45} />
          </mesh>
        ))}
        <mesh position={[0, 0.02, 3.5]}>
          <boxGeometry args={[10.5, 0.025, 0.05]} />
          <meshStandardMaterial color={palette.line} />
        </mesh>
      </group>
    </>
  )
}

export function FacilityScene(props: FacilitySceneProps) {
  return (
    <Canvas
      className="facility-canvas"
      camera={{ position: [0, 2.8, 8.4], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      shadows
      fallback={<div className="facility-canvas__fallback">3D facility preview unavailable</div>}
    >
      <SceneContent {...props} />
    </Canvas>
  )
}
