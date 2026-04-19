import { useEffect, useRef } from 'react'

export default function FloatingSphere() {
  const mountRef = useRef(null)

  useEffect(() => {
    // Dynamic import Three.js to avoid SSR issues
    let renderer, animId
    const mount = mountRef.current

    const init = async () => {
      const THREE = await import('three')

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
      camera.position.z = 3

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(400, 400)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // Main sphere wireframe
      const geo = new THREE.IcosahedronGeometry(1.2, 2)
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
      const wireSphere = new THREE.Mesh(geo, wireMat)
      scene.add(wireSphere)

      // Inner glowing sphere
      const innerGeo = new THREE.SphereGeometry(0.85, 32, 32)
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.08,
      })
      const innerSphere = new THREE.Mesh(innerGeo, innerMat)
      scene.add(innerSphere)

      // Orbiting rings
      const createRing = (radius, rotation, color) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.008, 8, 80),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })
        )
        ring.rotation.x = rotation.x
        ring.rotation.y = rotation.y
        ring.rotation.z = rotation.z
        return ring
      }

      const ring1 = createRing(1.5, { x: Math.PI / 2, y: 0, z: 0 }, 0x00f5d4)
      const ring2 = createRing(1.5, { x: 0, y: Math.PI / 4, z: Math.PI / 4 }, 0x8b5cf6)
      const ring3 = createRing(1.5, { x: Math.PI / 3, y: Math.PI / 3, z: 0 }, 0x38bdf8)
      scene.add(ring1, ring2, ring3)

      // Floating particles around sphere
      const particleGeo = new THREE.BufferGeometry()
      const count = 200
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 1.8 + Math.random() * 0.6
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const particleMat = new THREE.PointsMaterial({
        color: 0x00f5d4,
        size: 0.025,
        transparent: true,
        opacity: 0.7,
      })
      const particleMesh = new THREE.Points(particleGeo, particleMat)
      scene.add(particleMesh)

      // Mouse interaction
      let mx = 0, my = 0
      const onMove = (e) => {
        const rect = mount.getBoundingClientRect()
        mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        my = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      mount.addEventListener('mousemove', onMove)

      let t = 0
      const animate = () => {
        animId = requestAnimationFrame(animate)
        t += 0.005

        wireSphere.rotation.x += 0.003
        wireSphere.rotation.y += 0.005
        innerSphere.rotation.y -= 0.004

        ring1.rotation.z += 0.008
        ring2.rotation.x += 0.006
        ring3.rotation.y += 0.007

        particleMesh.rotation.y += 0.002
        particleMesh.rotation.x += 0.001

        // Mouse influence
        scene.rotation.x += (my * 0.3 - scene.rotation.x) * 0.05
        scene.rotation.y += (mx * 0.3 - scene.rotation.y) * 0.05

        // Float up/down
        scene.position.y = Math.sin(t) * 0.1

        renderer.render(scene, camera)
      }
      animate()
    }

    init()

    return () => {
      cancelAnimationFrame(animId)
      if (renderer) renderer.dispose()
      if (mount && renderer) {
        try { mount.removeChild(renderer.domElement) } catch (e) {}
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative"
      style={{ filter: 'drop-shadow(0 0 40px rgba(0,245,212,0.3))' }}
    />
  )
}
