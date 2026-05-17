'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface NetworkNode {
  position: THREE.Vector3;
  connections: number[];
}

interface HazardHotspot {
  position: THREE.Vector3;
  intensity: number;
  pulsePhase: number;
}

export default function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Group | null>(null);
  const networkNodesRef = useRef<NetworkNode[]>([]);
  const hazardHotspotsRef = useRef<HazardHotspot[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe group
    const globe = new THREE.Group();
    globeRef.current = globe;
    scene.add(globe);

    // Create Earth sphere with wireframe
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Main globe material with gradient
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.15,
      wireframe: false,
    });
    const globeMesh = new THREE.Mesh(sphereGeometry, globeMaterial);
    globe.add(globeMesh);

    // Wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globe.add(wireframeMesh);

    // Generate network nodes
    const generateNetworkNodes = () => {
      const nodes: NetworkNode[] = [];
      const nodeCount = 30;

      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        
        const x = 1.05 * Math.sin(phi) * Math.cos(theta);
        const y = 1.05 * Math.sin(phi) * Math.sin(theta);
        const z = 1.05 * Math.cos(phi);

        nodes.push({
          position: new THREE.Vector3(x, y, z),
          connections: [],
        });
      }

      // Create connections between nearby nodes
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j && node.position.distanceTo(otherNode.position) < 0.8) {
            if (Math.random() > 0.7 && node.connections.length < 4) {
              node.connections.push(j);
            }
          }
        });
      });

      networkNodesRef.current = nodes;

      // Create node meshes
      nodes.forEach((node) => {
        const nodeGeometry = new THREE.SphereGeometry(0.015, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.9,
        });
        const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        nodeMesh.position.copy(node.position);
        globe.add(nodeMesh);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.3,
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.copy(node.position);
        globe.add(glowMesh);
      });

      // Create connection lines
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const points = [
            node.position,
            nodes[connectionIndex].position,
          ];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.4,
          });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          globe.add(line);
        });
      });
    };

    generateNetworkNodes();

    // Generate hazard hotspots
    const generateHazardHotspots = () => {
      const hotspots: HazardHotspot[] = [];
      const hotspotCount = 8;

      for (let i = 0; i < hotspotCount; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        
        const x = 1.08 * Math.sin(phi) * Math.cos(theta);
        const y = 1.08 * Math.sin(phi) * Math.sin(theta);
        const z = 1.08 * Math.cos(phi);

        hotspots.push({
          position: new THREE.Vector3(x, y, z),
          intensity: 0.5 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      hazardHotspotsRef.current = hotspots;

      // Create hotspot meshes
      hotspots.forEach((hotspot) => {
        const hotspotGeometry = new THREE.SphereGeometry(0.025, 16, 16);
        const hotspotMaterial = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          transparent: true,
          opacity: 0.9,
        });
        const hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
        hotspotMesh.position.copy(hotspot.position);
        hotspotMesh.userData.isHotspot = true;
        hotspotMesh.userData.pulsePhase = hotspot.pulsePhase;
        globe.add(hotspotMesh);

        // Add pulsating glow rings
        for (let i = 0; i < 3; i++) {
          const ringGeometry = new THREE.RingGeometry(0.04 + i * 0.02, 0.045 + i * 0.02, 32);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xef4444,
            transparent: true,
            opacity: 0.3 - i * 0.1,
            side: THREE.DoubleSide,
          });
          const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
          ringMesh.position.copy(hotspot.position);
          ringMesh.lookAt(0, 0, 0);
          ringMesh.userData.isHotspotRing = true;
          ringMesh.userData.ringIndex = i;
          ringMesh.userData.pulsePhase = hotspot.pulsePhase;
          globe.add(ringMesh);
        }
      });
    };

    generateHazardHotspots();

    // Create orbital tracks
    const createOrbitalTracks = () => {
      const trackCount = 3;
      
      for (let i = 0; i < trackCount; i++) {
        const radius = 1.3 + i * 0.15;
        const segments = 128;
        const points: THREE.Vector3[] = [];

        // Create tilted elliptical orbit
        const tilt = (Math.PI / 6) * (i + 1);
        const rotation = (Math.PI / 3) * i;

        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 2;
          const x = radius * Math.cos(angle);
          const y = radius * 0.3 * Math.sin(angle);
          const z = 0;

          // Apply rotation
          const rotatedX = x * Math.cos(rotation) - z * Math.sin(rotation);
          const rotatedZ = x * Math.sin(rotation) + z * Math.cos(rotation);
          const rotatedY = y * Math.cos(tilt) - rotatedZ * Math.sin(tilt);
          const finalZ = y * Math.sin(tilt) + rotatedZ * Math.cos(tilt);

          points.push(new THREE.Vector3(rotatedX, rotatedY, finalZ));
        }

        const trackGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const trackMaterial = new THREE.LineBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.2,
        });
        const track = new THREE.Line(trackGeometry, trackMaterial);
        globe.add(track);

        // Add satellite on orbit
        const satelliteGeometry = new THREE.SphereGeometry(0.02, 16, 16);
        const satelliteMaterial = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
        });
        const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
        satellite.userData.isSatellite = true;
        satellite.userData.orbitRadius = radius;
        satellite.userData.orbitSpeed = 0.001 + i * 0.0005;
        satellite.userData.orbitAngle = (Math.PI * 2 * i) / trackCount;
        satellite.userData.tilt = tilt;
        satellite.userData.rotation = rotation;
        globe.add(satellite);
      }
    };

    createOrbitalTracks();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate globe
      if (globe) {
        globe.rotation.y += 0.002;
      }

      // Animate satellites
      globe.children.forEach((child) => {
        if (child.userData.isSatellite) {
          child.userData.orbitAngle += child.userData.orbitSpeed;
          const angle = child.userData.orbitAngle;
          const radius = child.userData.orbitRadius;
          const tilt = child.userData.tilt;
          const rotation = child.userData.rotation;

          const x = radius * Math.cos(angle);
          const y = radius * 0.3 * Math.sin(angle);
          const z = 0;

          const rotatedX = x * Math.cos(rotation) - z * Math.sin(rotation);
          const rotatedZ = x * Math.sin(rotation) + z * Math.cos(rotation);
          const rotatedY = y * Math.cos(tilt) - rotatedZ * Math.sin(tilt);
          const finalZ = y * Math.sin(tilt) + rotatedZ * Math.cos(tilt);

          child.position.set(rotatedX, rotatedY, finalZ);
        }

        // Animate hazard hotspots pulsing
        if (child.userData.isHotspot) {
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time + child.userData.pulsePhase) * 0.3 + 0.7;
          (child as THREE.Mesh).material.opacity = pulse;
          child.scale.setScalar(0.8 + pulse * 0.4);
        }

        // Animate hazard hotspot rings
        if (child.userData.isHotspotRing) {
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time + child.userData.pulsePhase - child.userData.ringIndex * 0.5) * 0.5 + 0.5;
          (child as THREE.Mesh).material.opacity = (0.3 - child.userData.ringIndex * 0.1) * pulse;
          const scale = 1 + pulse * 0.5 + child.userData.ringIndex * 0.3;
          child.scale.setScalar(scale);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Dispose geometries and materials
      globe.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className="w-full h-full min-h-[400px] md:min-h-[500px]"
        style={{ 
          filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.4))',
        }}
      />
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-primary-300/60 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Network Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Hazard Zones</span>
          </div>
        </div>
        <span>Live Global Monitoring</span>
      </div>
    </motion.div>
  );
}

// Made with Bob