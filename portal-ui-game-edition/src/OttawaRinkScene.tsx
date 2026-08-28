import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import * as THREE from 'three'

export type SceneSeason = 'summer' | 'fall' | 'winter'
export type RinkMode = 'season' | 'play'

type SceneProps = {
  progress: number
  scored: boolean
  reducedMotion: boolean
  darkMode: boolean
  season: SceneSeason
  mode: RinkMode
  onGoal: (side: 'player' | 'cpu') => void
}

function ParliamentHill({ darkMode }: { darkMode: boolean }) {
  const stone = darkMode ? '#785f53' : '#b68a67'
  const roof = darkMode ? '#197867' : '#2aa989'

  return (
    <group position={[-0.55, 0, -3.15]}>
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[3.55, 1.04, 0.74]} />
        <meshStandardMaterial color={stone} roughness={0.9} />
      </mesh>
      <mesh position={[-1.48, 1.03, 0]} castShadow>
        <boxGeometry args={[0.58, 1.02, 0.72]} />
        <meshStandardMaterial color={stone} roughness={0.9} />
      </mesh>
      <mesh position={[1.48, 1.03, 0]} castShadow>
        <boxGeometry args={[0.58, 1.02, 0.72]} />
        <meshStandardMaterial color={stone} roughness={0.9} />
      </mesh>
      <mesh position={[-1.48, 1.71, 0]} castShadow>
        <coneGeometry args={[0.48, 0.48, 4]} />
        <meshStandardMaterial color={roof} roughness={0.82} />
      </mesh>
      <mesh position={[1.48, 1.71, 0]} castShadow>
        <coneGeometry args={[0.48, 0.48, 4]} />
        <meshStandardMaterial color={roof} roughness={0.82} />
      </mesh>
      {[-1.05, -0.72, -0.38, 0.38, 0.72, 1.05].map((x) => (
        <mesh position={[x, 0.62, 0.39]} key={x}>
          <boxGeometry args={[0.15, 0.28, 0.025]} />
          <meshStandardMaterial color="#ffe5a0" emissive="#ca8b25" emissiveIntensity={darkMode ? 0.65 : 0.15} />
        </mesh>
      ))}
      <mesh position={[0, 1.45, 0]} castShadow>
        <boxGeometry args={[0.72, 2.9, 0.68]} />
        <meshStandardMaterial color={stone} roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.06, 0]} castShadow>
        <coneGeometry args={[0.5, 0.58, 4]} />
        <meshStandardMaterial color={roof} roughness={0.82} />
      </mesh>
      <mesh position={[0, 2.02, 0.36]}>
        <cylinderGeometry args={[0.19, 0.19, 0.05, 24]} />
        <meshStandardMaterial color="#fff4d6" emissive="#ffc85a" emissiveIntensity={darkMode ? 0.5 : 0.08} />
      </mesh>
      <mesh position={[0, 2.02, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.025, 0.12, 0.02]} />
        <meshStandardMaterial color="#17243a" />
      </mesh>
    </group>
  )
}

function useSignTexture(darkMode: boolean) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 220
    const context = canvas.getContext('2d')

    if (!context) return null

    context.fillStyle = darkMode ? '#07182c' : '#091528'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#168bea'
    context.fillRect(28, 27, 11, 106)
    context.fillRect(48, 0, 11, 160)
    context.fillRect(68, 48, 11, 68)
    context.fillStyle = '#f7fbff'
    context.font = '700 66px Arial'
    context.fillText('backboard.io', 104, 102)
    context.fillStyle = '#7de7de'
    context.font = '600 24px Arial'
    context.fillText('OTTAWA LAB  //  BUILD COOL STUFF', 106, 154)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    return texture
  }, [darkMode])
}

function BackboardHQ({ darkMode }: { darkMode: boolean }) {
  const signTexture = useSignTexture(darkMode)

  return (
    <group position={[2.65, 0, -3.05]}>
      <mesh position={[0, 1.08, 0]} castShadow>
        <boxGeometry args={[1.82, 2.16, 0.76]} />
        <meshStandardMaterial color={darkMode ? '#102944' : '#294c69'} roughness={0.82} />
      </mesh>
      {[0.42, 0.85, 1.28, 1.71].map((y) => (
        <mesh position={[0, y, 0.39]} key={y}>
          <boxGeometry args={[1.42, 0.16, 0.025]} />
          <meshStandardMaterial color={darkMode ? '#7de7de' : '#dff7ff'} emissive="#168bea" emissiveIntensity={darkMode ? 0.7 : 0.08} />
        </mesh>
      ))}
      {signTexture && (
        <mesh position={[0, 2.48, 0.22]}>
          <planeGeometry args={[2.38, 0.82]} />
          <meshBasicMaterial map={signTexture} />
        </mesh>
      )}
    </group>
  )
}

function Evergreen({
  position,
  scale = 1,
  darkMode,
  season,
}: {
  position: [number, number, number]
  scale?: number
  darkMode: boolean
  season: SceneSeason
}) {
  const foliage =
    season === 'fall'
      ? ['#a84f32', '#d67538', '#edaa45']
      : season === 'winter'
        ? [darkMode ? '#145a51' : '#2b7567', darkMode ? '#1d7764' : '#459881', '#dceff1']
        : [darkMode ? '#12614f' : '#1b8c68', darkMode ? '#168267' : '#2ab57c', '#46cb91']

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.27, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.54, 8]} />
        <meshStandardMaterial color="#72513b" />
      </mesh>
      <mesh position={[0, 0.78, 0]} castShadow>
        <coneGeometry args={[0.42, 0.9, 7]} />
        <meshStandardMaterial color={foliage[0]} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.31, 0.72, 7]} />
        <meshStandardMaterial color={foliage[1]} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.42, 0]} castShadow>
        <coneGeometry args={[0.2, 0.52, 7]} />
        <meshStandardMaterial color={foliage[2]} roughness={0.9} />
      </mesh>
    </group>
  )
}

function LampPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.05, 1.6, 8]} />
        <meshStandardMaterial color="#22314a" />
      </mesh>
      <mesh position={[0, 1.62, 0]} castShadow>
        <boxGeometry args={[0.25, 0.18, 0.25]} />
        <meshStandardMaterial color="#ffd95a" emissive="#ffd95a" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Goal({ side, active }: { side: 'left' | 'right'; active: boolean }) {
  const light = active ? '#ff5f55' : '#672b31'

  return (
    <group position={[side === 'right' ? 3.3 : -3.3, 0.3, 0]} rotation={[0, side === 'right' ? -Math.PI / 2 : Math.PI / 2, 0]}>
      <mesh position={[-0.68, 0.54, 0]} castShadow>
        <boxGeometry args={[0.06, 1.08, 0.06]} />
        <meshStandardMaterial color="#ff5f55" />
      </mesh>
      <mesh position={[0.68, 0.54, 0]} castShadow>
        <boxGeometry args={[0.06, 1.08, 0.06]} />
        <meshStandardMaterial color="#ff5f55" />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[1.42, 0.06, 0.06]} />
        <meshStandardMaterial color="#ff5f55" />
      </mesh>
      <mesh position={[0, 0.53, -0.34]}>
        <boxGeometry args={[1.32, 0.94, 0.04]} />
        <meshStandardMaterial color="#dcecf2" transparent opacity={0.46} wireframe />
      </mesh>
      <mesh position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.13, 12, 8]} />
        <meshStandardMaterial color={light} emissive={light} emissiveIntensity={active ? 2.6 : 0.05} />
      </mesh>
    </group>
  )
}

function HockeyPlayer({
  playerRef,
  position,
  rotation = 0,
  color,
  goalie = false,
}: {
  playerRef?: RefObject<THREE.Group | null>
  position: [number, number, number]
  rotation?: number
  color: string
  goalie?: boolean
}) {
  return (
    <group ref={playerRef} position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.88, 0]} castShadow>
        <boxGeometry args={[goalie ? 0.58 : 0.48, goalie ? 0.72 : 0.65, 0.32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.89, 0.17]}>
        <planeGeometry args={[0.19, 0.2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.89, 0.185]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshBasicMaterial color="#17243a" />
      </mesh>
      <mesh position={[0, 1.34, 0]} castShadow>
        <sphereGeometry args={[0.23, 12, 8]} />
        <meshStandardMaterial color="#d3976f" />
      </mesh>
      <mesh position={[0, 1.49, -0.02]} castShadow>
        <sphereGeometry args={[0.25, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={goalie ? '#f4f7fa' : '#33293c'} />
      </mesh>
      <mesh position={[-0.16, 0.39, 0]} rotation={[0, 0, -0.12]} castShadow>
        <boxGeometry args={[0.13, 0.55, 0.15]} />
        <meshStandardMaterial color="#17243a" />
      </mesh>
      <mesh position={[0.16, 0.39, 0]} rotation={[0, 0, 0.12]} castShadow>
        <boxGeometry args={[0.13, 0.55, 0.15]} />
        <meshStandardMaterial color="#17243a" />
      </mesh>
      <mesh position={[0.58, 0.55, 0]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.06, 1.55, 0.06]} />
        <meshStandardMaterial color="#75503c" />
      </mesh>
      <mesh position={[0.91, -0.03, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.65, 0.07, 0.12]} />
        <meshStandardMaterial color="#75503c" />
      </mesh>
      <mesh position={[0, 0.89, 0.19]}>
        <planeGeometry args={[0.16, 0.16]} />
        <meshBasicMaterial color="#17243a" />
      </mesh>
    </group>
  )
}

function WeatherParticles({
  reducedMotion,
  season,
}: {
  reducedMotion: boolean
  season: SceneSeason
}) {
  const group = useRef<THREE.Group>(null)
  const particles = useMemo(
    () =>
      Array.from({ length: season === 'summer' ? 18 : 42 }, (_, index) => ({
        position: [
          -4.8 + ((index * 37) % 96) / 10,
          1.4 + ((index * 23) % 38) / 10,
          -3.6 + ((index * 17) % 66) / 10,
        ] as [number, number, number],
        size: 0.025 + (index % 3) * 0.012,
      })),
    [season],
  )

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return
    group.current.position.y -= delta * (season === 'winter' ? 0.22 : season === 'fall' ? 0.12 : 0.035)
    group.current.rotation.y += delta * (season === 'fall' ? 0.05 : 0.008)
    if (group.current.position.y < -1.2) group.current.position.y = 0.8
  })

  const particleColor = season === 'winter' ? '#ffffff' : season === 'fall' ? '#e7793e' : '#ffe26a'

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh position={particle.position} rotation={[0, 0, index * 0.3]} key={index}>
          {season === 'fall' ? (
            <boxGeometry args={[particle.size * 2.1, particle.size, particle.size]} />
          ) : (
            <sphereGeometry args={[particle.size, 5, 4]} />
          )}
          <meshBasicMaterial color={particleColor} />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ progress, scored, reducedMotion, darkMode, season, mode, onGoal }: SceneProps) {
  const world = useRef<THREE.Group>(null)
  const puck = useRef<THREE.Mesh>(null)
  const player = useRef<THREE.Group>(null)
  const opponent = useRef<THREE.Group>(null)
  const teammate = useRef<THREE.Group>(null)
  const goalie = useRef<THREE.Group>(null)
  const keys = useRef(new Set<string>())
  const puckVelocity = useRef(new THREE.Vector3())
  const elapsed = useRef(0)
  const shotLatched = useRef(false)
  const goalCooldown = useRef(0)
  const seasonPalette = {
    summer: {
      sky: darkMode ? '#09233d' : '#52c7f0',
      ground: darkMode ? '#2b715d' : '#77c879',
      surface: darkMode ? '#4b8f91' : '#85d8cf',
      boards: darkMode ? '#d9edf1' : '#ffffff',
    },
    fall: {
      sky: darkMode ? '#261a31' : '#eca45d',
      ground: darkMode ? '#70412f' : '#c97945',
      surface: darkMode ? '#8c9fa2' : '#c5d9d4',
      boards: darkMode ? '#ead9ce' : '#fff8ec',
    },
    winter: {
      sky: darkMode ? '#07182c' : '#67d0f2',
      ground: darkMode ? '#c8dbe5' : '#f8fbfc',
      surface: darkMode ? '#9fcbd7' : '#dff4f7',
      boards: darkMode ? '#dcebf1' : '#ffffff',
    },
  }[season]

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (mode !== 'play') return
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) event.preventDefault()
      keys.current.add(event.code)
    }
    const keyUp = (event: KeyboardEvent) => keys.current.delete(event.code)
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [mode])

  useEffect(() => {
    puckVelocity.current.set(0, 0, 0)
    if (puck.current) puck.current.position.set(mode === 'play' ? 0 : -1.78, 0.18, mode === 'play' ? 0 : 0.2)
    if (player.current) player.current.position.set(-2.45, 0.16, 0.45)
    if (opponent.current) opponent.current.position.set(1.75, 0.16, -0.25)
  }, [mode])

  useFrame((state, delta) => {
    elapsed.current += delta
    const time = elapsed.current

    if (world.current && !reducedMotion) {
      world.current.rotation.y = THREE.MathUtils.lerp(world.current.rotation.y, state.pointer.x * 0.055, delta * 2.3)
      world.current.rotation.x = THREE.MathUtils.lerp(world.current.rotation.x, -state.pointer.y * 0.025, delta * 2.3)
    }

    if (!puck.current || !player.current || !opponent.current || !teammate.current || !goalie.current) return

    if (mode === 'play') {
      const movement = new THREE.Vector3(
        Number(keys.current.has('ArrowRight') || keys.current.has('KeyD')) -
          Number(keys.current.has('ArrowLeft') || keys.current.has('KeyA')),
        0,
        Number(keys.current.has('ArrowDown') || keys.current.has('KeyS')) -
          Number(keys.current.has('ArrowUp') || keys.current.has('KeyW')),
      )
      if (movement.lengthSq() > 0) movement.normalize().multiplyScalar(delta * 2.7)

      player.current.position.x = THREE.MathUtils.clamp(player.current.position.x + movement.x, -3.0, -0.25)
      player.current.position.z = THREE.MathUtils.clamp(player.current.position.z + movement.z, -1.85, 1.85)

      opponent.current.position.x = THREE.MathUtils.lerp(
        opponent.current.position.x,
        THREE.MathUtils.clamp(puck.current.position.x + 0.68, 0.3, 2.7),
        delta * 1.5,
      )
      opponent.current.position.z = THREE.MathUtils.lerp(
        opponent.current.position.z,
        THREE.MathUtils.clamp(puck.current.position.z, -1.7, 1.7),
        delta * 1.35,
      )

      const playerDistance = player.current.position.distanceTo(puck.current.position)
      const opponentDistance = opponent.current.position.distanceTo(puck.current.position)
      const shooting = keys.current.has('Space')

      if (shooting && !shotLatched.current && playerDistance < 1.1) {
        puckVelocity.current.set(4.6, 0, (puck.current.position.z - player.current.position.z) * 1.7)
        shotLatched.current = true
      }
      if (!shooting) shotLatched.current = false

      if (opponentDistance < 0.58 && puckVelocity.current.x > -1.4) {
        puckVelocity.current.set(-3.8, 0, (puck.current.position.z - opponent.current.position.z) * 1.5)
      }

      puck.current.position.x += puckVelocity.current.x * delta
      puck.current.position.z += puckVelocity.current.z * delta
      puckVelocity.current.multiplyScalar(Math.pow(0.986, delta * 60))

      if (Math.abs(puck.current.position.z) > 2.08) {
        puck.current.position.z = THREE.MathUtils.clamp(puck.current.position.z, -2.08, 2.08)
        puckVelocity.current.z *= -0.82
      }

      if (goalCooldown.current > 0) goalCooldown.current -= delta
      const inGoalMouth = Math.abs(puck.current.position.z) < 0.72
      if (goalCooldown.current <= 0 && puck.current.position.x > 3.45 && inGoalMouth) {
        onGoal('player')
        puck.current.position.set(0, 0.18, 0)
        puckVelocity.current.set(0, 0, 0)
        goalCooldown.current = 0.8
      } else if (goalCooldown.current <= 0 && puck.current.position.x < -3.45 && inGoalMouth) {
        onGoal('cpu')
        puck.current.position.set(0, 0.18, 0)
        puckVelocity.current.set(0, 0, 0)
        goalCooldown.current = 0.8
      } else if (Math.abs(puck.current.position.x) > 3.55) {
        puck.current.position.x = THREE.MathUtils.clamp(puck.current.position.x, -3.55, 3.55)
        puckVelocity.current.x *= -0.82
      }

      teammate.current.position.x = -1.18 + Math.sin(time * 1.4) * 0.22
      teammate.current.position.z = -1.35 + Math.cos(time * 1.15) * 0.22
      goalie.current.position.z = Math.sin(time * 1.8) * 0.42
    } else {
      const targetX = scored ? 3.25 : -1.78 + progress * 3.7
      const targetZ = scored ? 0 : 0.2
      puck.current.position.x = THREE.MathUtils.lerp(puck.current.position.x, targetX, Math.min(1, delta * 4.8))
      puck.current.position.z = THREE.MathUtils.lerp(puck.current.position.z, targetZ, Math.min(1, delta * 4.8))
      puck.current.rotation.y += reducedMotion ? 0 : delta * 3.2

      if (!reducedMotion) {
        player.current.position.x = -2.45 + Math.sin(time * 1.65) * 0.16
        player.current.position.z = 0.45 + Math.cos(time * 1.25) * 0.11
        opponent.current.position.x = 1.18 + Math.cos(time * 1.35) * 0.38
        opponent.current.position.z = -0.4 + Math.sin(time * 1.1) * 0.72
        teammate.current.position.x = -0.7 + Math.sin(time * 1.15) * 0.42
        teammate.current.position.z = -1.25 + Math.cos(time * 1.3) * 0.26
        goalie.current.position.z = Math.sin(time * 1.7) * 0.5
        player.current.position.y = 0.16 + Math.abs(Math.sin(time * 2.7)) * 0.03
        opponent.current.position.y = 0.16 + Math.abs(Math.cos(time * 2.4)) * 0.03
      }
    }
  })

  return (
    <>
      <color attach="background" args={[seasonPalette.sky]} />
      <fog attach="fog" args={[seasonPalette.sky, 13, 22]} />
      <ambientLight intensity={darkMode ? 1.05 : 1.65} />
      <directionalLight position={[4, 8, 6]} intensity={darkMode ? 1.55 : 2.1} color="#fff4d5" castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={darkMode ? 1.1 : 0.65} color="#3aa9ff" />

      <group ref={world} rotation={[-0.02, 0, 0]}>
        <mesh position={[0, -0.34, 0]} receiveShadow>
          <boxGeometry args={[9.8, 0.5, 7.2]} />
          <meshStandardMaterial color={seasonPalette.ground} roughness={0.96} />
        </mesh>

        <mesh position={[0, -0.02, 0]} receiveShadow>
          <boxGeometry args={[7.7, 0.18, 4.8]} />
          <meshStandardMaterial color={seasonPalette.surface} roughness={0.6} metalness={0.04} />
        </mesh>

        <mesh position={[0, 0.085, 0]}>
          <boxGeometry args={[0.055, 0.015, 4.55]} />
          <meshStandardMaterial color="#ff6860" />
        </mesh>
        <mesh position={[-2.05, 0.087, 0]}>
          <boxGeometry args={[0.045, 0.018, 4.55]} />
          <meshStandardMaterial color="#168bea" />
        </mesh>
        <mesh position={[2.05, 0.087, 0]}>
          <boxGeometry args={[0.045, 0.018, 4.55]} />
          <meshStandardMaterial color="#168bea" />
        </mesh>
        <mesh position={[0, 0.096, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.025, 6, 36]} />
          <meshStandardMaterial color="#ff6860" />
        </mesh>

        {[
          [0, 0.28, -2.45, 8.1, 0.36, 0.18],
          [0, 0.28, 2.45, 8.1, 0.36, 0.18],
          [-3.95, 0.28, 0, 0.18, 0.36, 4.65],
          [3.95, 0.28, 0, 0.18, 0.36, 4.65],
        ].map(([x, y, z, width, height, depth], index) => (
          <mesh position={[x, y, z]} castShadow key={index}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={seasonPalette.boards} />
          </mesh>
        ))}

        <ParliamentHill darkMode={darkMode} />
        <BackboardHQ darkMode={darkMode} />

        <Evergreen position={[-4.45, 0, -2.05]} scale={0.86} darkMode={darkMode} season={season} />
        <Evergreen position={[4.45, 0, -1.8]} scale={0.72} darkMode={darkMode} season={season} />
        <Evergreen position={[-4.36, 0, 1.75]} scale={0.68} darkMode={darkMode} season={season} />
        <Evergreen position={[4.43, 0, 1.9]} scale={0.82} darkMode={darkMode} season={season} />
        <LampPost position={[-4.15, 0, -0.85]} />
        <LampPost position={[4.15, 0, 0.82]} />

        <Goal side="right" active={scored} />
        <Goal side="left" active={false} />
        <HockeyPlayer playerRef={player} position={[-2.45, 0.16, 0.45]} color="#168bea" />
        <HockeyPlayer playerRef={opponent} position={[1.75, 0.16, -0.25]} rotation={Math.PI} color="#ff6155" />
        <HockeyPlayer playerRef={teammate} position={[-0.7, 0.16, -1.25]} color="#ffd438" />
        <HockeyPlayer playerRef={goalie} position={[2.78, 0.16, 0]} rotation={Math.PI} color="#24b978" goalie />

        <mesh ref={puck} position={[-1.78, 0.18, 0.2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.1, 20]} />
          <meshStandardMaterial color="#091528" roughness={0.7} />
        </mesh>

        <WeatherParticles reducedMotion={reducedMotion} season={season} />
      </group>
    </>
  )
}

export function OttawaRinkScene(props: SceneProps) {
  return (
    <Canvas
      className="signup-canvas"
      camera={{ position: [7.4, 5.8, 8.6], fov: 37 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      shadows
      fallback={<div className="signup-canvas__error">3D preview unavailable</div>}
    >
      <Scene {...props} />
    </Canvas>
  )
}
