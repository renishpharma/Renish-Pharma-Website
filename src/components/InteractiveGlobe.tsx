"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Particle Configuration
    const count = 1000; // High density as seen in the reference
    const radius = 220; // Sphere container size
    const ballSize = 0.8; // Tiny fixed size as requested

    // Geometry and Material for the "balls"
    const geometry = new THREE.SphereGeometry(ballSize, 8, 8);
    const material = new THREE.MeshPhongMaterial({
      color: "#01A3D4",
      transparent: true,
      opacity: 0.9,
      shininess: 100,
    });

    // Using InstancedMesh for high-performance 3D spheres
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(instancedMesh);

    // Brand Colors Palette
    const brandColors = [
      new THREE.Color("#01A3D4"), // Primary Blue
      new THREE.Color("#00F3FF"), // Bright Cyan
      new THREE.Color("#005C8A"), // Deep Navy Blue
      new THREE.Color("#FFFFFF"), // Pure White
      new THREE.Color("#A3E635"), // Lime Green (from the user's reference image)
    ];

    // Initial Positions and Velocities
    const dummy = new THREE.Object3D();
    const particles = Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * radius * 2,
        (Math.random() - 0.5) * radius * 2,
        (Math.random() - 0.5) * radius * 2
      ).clampLength(0, radius),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35
      ),
      color: brandColors[Math.floor(Math.random() * brandColors.length)]
    }));

    // Assign individual colors to instances
    particles.forEach((p, i) => {
      instancedMesh.setColorAt(i, p.color);
    });
    instancedMesh.instanceColor!.needsUpdate = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    // Mouse Tracking
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // Subtle tilt sensitivity
        mouseX = (e.clientX - rect.left - width / 2) * 0.005;
        mouseY = (e.clientY - rect.top - height / 2) * 0.005;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    let frame: number;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Smooth Tilt Follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      instancedMesh.rotation.y = targetX;
      instancedMesh.rotation.x = targetY;

      // Move Particles
      particles.forEach((p, i) => {
        p.position.add(p.velocity);

        // Keep inside sphere with soft bounce
        if (p.position.length() > radius) {
          p.velocity.negate().multiplyScalar(0.9); // Bounce back and slow slightly
        }

        dummy.position.copy(p.position);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div id="globe-container" ref={containerRef} className="w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,163,212,0.1)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl scale-150" />
    </div>
  );
}
