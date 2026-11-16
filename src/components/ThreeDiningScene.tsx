'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
export default function ThreeDiningScene({ preset = 'pastel' }: { preset?: 'pastel' | 'persian' | 'luxury' }) {
  const palette = {
    pastel: { rug: '#fbcfe8', chair: '#f472b6' },
    persian: { rug: '#99f6e4', chair: '#0d9488' },
    luxury: { rug: '#fef3c7', chair: '#b45309' }
  }[preset];
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-purple-200 bg-slate-950">
      <Canvas camera={{ position: [0, 3.6, 6.2], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 4.5, 2]} intensity={1.6} color="#fbbf24" />
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[5.2, 0.06, 3.4]} />
            <meshStandardMaterial color={palette.rug} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[3.2, 0.14, 1.5]} />
            <meshStandardMaterial color="#fffbeb" roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.03, 0]}>
            <cylinderGeometry args={[0.42, 0.35, 0.22, 24]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.35} />
          </mesh>
          {[-0.9, 0, 0.9].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.28, -1.1]}>
                <boxGeometry args={[0.55, 0.45, 0.55]} />
                <meshStandardMaterial color={palette.chair} roughness={0.6} />
              </mesh>
              <mesh position={[x, 0.28, 1.1]}>
                <boxGeometry args={[0.55, 0.45, 0.55]} />
                <meshStandardMaterial color={palette.chair} roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}