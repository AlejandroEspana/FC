import React, { useEffect, useRef } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

export interface Vector3DProps {
  width?: number;
  height?: number;
}

export const Vector3D: React.FC<Vector3DProps> = ({
  width = 620,
  height = 420,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame = useCurrentFrame();

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#070A12");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const axesHelper = new THREE.AxesHelper(4);
    scene.add(axesHelper);

    const grid = new THREE.GridHelper(8, 8, 0x38bdf8, 0x1e2942);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);

    // Vector A (Cian) sobre X
    const dirA = new THREE.Vector3(3, 0, 0);
    const arrowA = new THREE.ArrowHelper(dirA.clone().normalize(), new THREE.Vector3(0, 0, 0), dirA.length(), 0x38bdf8, 0.4, 0.25);
    scene.add(arrowA);

    // Vector B (Amarillo) en el plano XY
    const dirB = new THREE.Vector3(1.5, 2.5, 0);
    const arrowB = new THREE.ArrowHelper(dirB.clone().normalize(), new THREE.Vector3(0, 0, 0), dirB.length(), 0xfacc15, 0.4, 0.25);
    scene.add(arrowB);

    // Vector C = A x B (Verde, perpendicular en Z)
    const dirC = new THREE.Vector3().crossVectors(dirA, dirB);
    const normalizedC = dirC.clone().normalize().multiplyScalar(3.2);
    const arrowC = new THREE.ArrowHelper(normalizedC.clone().normalize(), new THREE.Vector3(0, 0, 0), normalizedC.length(), 0x34d399, 0.5, 0.3);
    scene.add(arrowC);

    // Paralelogramo sombreado del área formada por A y B
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(dirA.x, dirA.y);
    shape.lineTo(dirA.x + dirB.x, dirA.y + dirB.y);
    shape.lineTo(dirB.x, dirB.y);
    shape.closePath();

    const geom = new THREE.ShapeGeometry(shape);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    return () => {
      renderer.dispose();
    };
  }, [width, height]);

  useEffect(() => {
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

    const angle = 0.6 + (frame / 60) * 0.25;
    const radius = 9.0;
    const heightY = 4.5;

    cameraRef.current.position.x = radius * Math.sin(angle);
    cameraRef.current.position.y = radius * Math.cos(angle);
    cameraRef.current.position.z = heightY;
    cameraRef.current.up.set(0, 0, 1);
    cameraRef.current.lookAt(1.5, 1.2, 1.0);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [frame]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative rounded-2xl overflow-hidden border border-[#1E2942] shadow-2xl">
        <canvas ref={canvasRef} width={width} height={height} />
        <div className="absolute top-3 left-3 bg-[#0A0D18]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#1E2942] text-xs font-mono text-[#38BDF8]">
          Cámara 3D Orbital Activa (60 FPS)
        </div>
      </div>
      <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38BDF8]" />
          <span>Vector a (Eje X)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FACC15]" />
          <span>Vector b (Plano XY)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#34D399]" />
          <span className="font-bold text-white">w = a × b (Normal Z)</span>
        </div>
      </div>
    </div>
  );
};
