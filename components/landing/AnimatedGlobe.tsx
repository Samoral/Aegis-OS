'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

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
  
  // Interactive controls state
  const [isInteracting, setIsInteracting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });

  // Reset camera position
  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5);
      cameraRef.current.lookAt(0, 0, 0);
    }
    if (globeRef.current) {
      globeRef.current.rotation.set(0, 0, 0);
      rotationVelocityRef.current = { x: 0, y: 0 };
    }
    setAutoRotate(true);
  };

  // Zoom controls
  const zoomIn = () => {
    if (cameraRef.current && cameraRef.current.position.z > 2) {
      cameraRef.current.position.z -= 0.5;
    }
  };

  const zoomOut = () => {
    if (cameraRef.current && cameraRef.current.position.z < 10) {
      cameraRef.current.position.z += 0.5;
    }
  };

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

    // Mouse interaction handlers
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      setAutoRotate(false);
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !globe) return;

      const deltaX = event.clientX - previousMousePositionRef.current.x;
      const deltaY = event.clientY - previousMousePositionRef.current.y;

      globe.rotation.y += deltaX * 0.005;
      globe.rotation.x += deltaY * 0.005;

      // Clamp X rotation to prevent flipping
      globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe.rotation.x));

      rotationVelocityRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005,
      };

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (camera) {
        const zoomSpeed = 0.001;
        camera.position.z += event.deltaY * zoomSpeed;
        camera.position.z = Math.max(2, Math.min(10, camera.position.z));
      }
    };

    // Touch handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDraggingRef.current = true;
        setIsInteracting(true);
        setAutoRotate(false);
        previousMousePositionRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDraggingRef.current || !globe || event.touches.length !== 1) return;

      const deltaX = event.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = event.touches[0].clientY - previousMousePositionRef.current.y;

      globe.rotation.y += deltaX * 0.005;
      globe.rotation.x += deltaY * 0.005;

      globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe.rotation.x));

      previousMousePositionRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    // Add event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate globe with auto-rotate or apply velocity
      if (globe) {
        if (autoRotate && !isDraggingRef.current) {
          globe.rotation.y += 0.002;
        } else if (!isDraggingRef.current) {
          // Apply inertia
          globe.rotation.y += rotationVelocityRef.current.y;
          globe.rotation.x += rotationVelocityRef.current.x;
          
          // Damping
          rotationVelocityRef.current.x *= 0.95;
          rotationVelocityRef.current.y *= 0.95;
          
          // Stop if velocity is very small
          if (Math.abs(rotationVelocityRef.current.x) < 0.0001 &&
              Math.abs(rotationVelocityRef.current.y) < 0.0001) {
            rotationVelocityRef.current = { x: 0, y: 0 };
            setAutoRotate(true);
          }
        }
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
          const mesh = child as THREE.Mesh;
          const material = mesh.material;
          if (!Array.isArray(material)) {
            (material as THREE.MeshBasicMaterial).opacity = pulse;
          }
          child.scale.setScalar(0.8 + pulse * 0.4);
        }

        // Animate hazard hotspot rings
        if (child.userData.isHotspotRing) {
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time + child.userData.pulsePhase - child.userData.ringIndex * 0.5) * 0.5 + 0.5;
          const mesh = child as THREE.Mesh;
          const material = mesh.material;
          if (!Array.isArray(material)) {
            (material as THREE.MeshBasicMaterial).opacity = (0.3 - child.userData.ringIndex * 0.1) * pulse;
          }
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
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
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
  }, [autoRotate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full h-full flex items-center justify-center group"
    >
      <div
        ref={containerRef}
        className={`w-full h-full min-h-[400px] md:min-h-[500px] transition-all duration-300 ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.4))',
        }}
      />
      
      {/* Interactive Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={zoomIn}
          className="glass-strong p-3 rounded-lg hover:bg-cyan-500/20 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-cyan-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={zoomOut}
          className="glass-strong p-3 rounded-lg hover:bg-cyan-500/20 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-cyan-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetCamera}
          className="glass-strong p-3 rounded-lg hover:bg-cyan-500/20 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5 text-cyan-400" />
        </motion.button>
      </div>

      {/* Interaction Hint */}
      {!isInteracting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-4 left-4 glass-strong px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <p className="text-xs text-cyan-400 flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            <span>Drag to rotate • Scroll to zoom</span>
          </p>
        </motion.div>
      )}
      
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
        <span className="hidden sm:inline">Live Global Monitoring</span>
      </div>

      {/* Auto-rotate indicator */}
      {autoRotate && !isInteracting && (
        <div className="absolute bottom-4 right-4 glass-subtle px-3 py-1.5 rounded-full pointer-events-none">
          <p className="text-xs text-cyan-400/60 flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <RotateCcw className="w-3 h-3" />
            </motion.div>
            <span>Auto-rotating</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Made with Bob