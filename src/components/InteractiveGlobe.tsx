"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Clear any existing canvas to prevent duplicates
    const existingCanvas = containerRef.current.querySelector("canvas");
    if (existingCanvas) {
      containerRef.current.removeChild(existingCanvas);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 1000);
    camera.position.z = 400;

    let renderer: THREE.WebGLRenderer | null = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Particle Configuration
    const count = 1000;
    const radius = 250;
    const ballSize = 1.0;

    const geometry = new THREE.SphereGeometry(ballSize, 8, 8);
    const material = new THREE.MeshPhongMaterial({
      color: "#01A3D4",
      transparent: true,
      opacity: 0.9,
      shininess: 100,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(instancedMesh);

    const brandColors = [
      new THREE.Color("#01A3D4"),
      new THREE.Color("#00F3FF"),
      new THREE.Color("#005C8A"),
      new THREE.Color("#FFFFFF"),
      new THREE.Color("#A3E635"),
    ];

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

    particles.forEach((p, i) => {
      instancedMesh.setColorAt(i, p.color);
    });
    instancedMesh.instanceColor!.needsUpdate = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = (e.clientX - rect.left - width / 2) * 0.005;
        mouseY = (e.clientY - rect.top - height / 2) * 0.005;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    let frame: number;
    const animate = () => {
      if (!renderer) return;
      frame = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      instancedMesh.rotation.y = targetX;
      instancedMesh.rotation.x = targetY;

      particles.forEach((p, i) => {
        p.position.add(p.velocity);
        if (p.position.length() > radius) {
          p.velocity.negate().multiplyScalar(0.9);
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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
      
      if (renderer) {
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        renderer = null;
      }
      
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div id="globe-container" ref={containerRef} className="w-full aspect-square max-w-200 mx-auto flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,163,212,0.1)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl scale-150" />
    </div>
  );
}
