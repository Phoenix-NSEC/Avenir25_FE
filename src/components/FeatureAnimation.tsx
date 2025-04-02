"use client"

import { useEffect, useRef } from "react";
import * as THREE from "three"

export default function FeatureAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create a floating book (representing knowledge/features)
    const bookGroup = new THREE.Group()

    // Book cover
    const coverGeometry = new THREE.BoxGeometry(2, 3, 0.2)
    const coverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
    })
    const cover = new THREE.Mesh(coverGeometry, coverMaterial)
    bookGroup.add(cover)

    // Book pages
    const pagesGeometry = new THREE.BoxGeometry(1.8, 2.8, 0.4)
    const pagesMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    })
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterial)
    pages.position.z = 0.1
    bookGroup.add(pages)

    scene.add(bookGroup)

    // Add magical particles around the book
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200

    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position in a sphere around the book
      const radius = 2 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)

      // Colors - create a gradient from yellow to red to orange
      colorsArray[i] = Math.random() * 0.3 + 0.7 // 0.7-1.0 (high red)
      colorsArray[i + 1] = Math.random() * 0.5 // 0-0.5 (low to medium green)
      colorsArray[i + 2] = Math.random() * 0.1 // 0-0.1 (very low blue)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Float the book
      bookGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.2
      bookGroup.rotation.y = elapsedTime * 0.2

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.1

      // Animate particle positions
      const positions = particlesGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3
        positions[i] += Math.sin(elapsedTime + i3) * 0.003
        positions[i + 1] += Math.cos(elapsedTime + i3) * 0.003
        positions[i + 2] += Math.sin(elapsedTime + i3) * 0.003
      }
      particlesGeometry.attributes.position.needsUpdate = true

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      window.requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      // Update camera
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      coverGeometry.dispose()
      coverMaterial.dispose()
      pagesGeometry.dispose()
      pagesMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

