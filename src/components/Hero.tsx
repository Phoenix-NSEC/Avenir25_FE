// import { useEffect, useRef, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Sparkles, Text3D, Center, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";

// // Video smoke material component
// type SmokeMaterialProps = {
//   color?: string;
// };

// const SmokeMaterial: React.FC<SmokeMaterialProps> = ({ color = "#9333ea" }) => {
//   const [video] = useState(() => {
//     const vid = document.createElement("video");
//     vid.src = "/purple-smoke.mp4";
//     vid.crossOrigin = "Anonymous";
//     vid.loop = true;
//     vid.muted = true;
//     vid.play();
//     return vid;
//   });

//   const videoTexture = new THREE.VideoTexture(video);
//   videoTexture.minFilter = THREE.LinearFilter;
//   videoTexture.magFilter = THREE.LinearFilter;
//   videoTexture.format = THREE.RGBAFormat;

//   return (
//     <meshStandardMaterial
//       map={videoTexture}
//       transparent
//       opacity={0.6}
//       color={color}
//       emissive={color}
//       emissiveIntensity={0.5}
//       depthWrite={false}
//       blending={THREE.AdditiveBlending}
//     />
//   );
// };

// // Animated smoke plane
// type SmokePlaneProps = {
//   position?: [number, number, number];
//   rotation?: [number, number, number];
//   scale?: [number, number, number];
//   speed?: number;
//   color?: string;
// };

// const SmokePlane: React.FC<SmokePlaneProps> = ({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [1, 1, 1],
//   speed = 1,
//   color = "#ffffff",
// }) => {
//   const mesh = useRef<THREE.Mesh | null>(null);

//   useFrame((state) => {
//     if (mesh.current && mesh.current.material) {
//       mesh.current.rotation.z += 0.005 * speed;
//       (mesh.current.material as THREE.MeshStandardMaterial).opacity =
//         (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 4 + 0.2;
//     }
//   });

//   return (
//     <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
//       <planeGeometry args={[5, 5, 1, 1]} />
//       <SmokeMaterial color={color} />
//     </mesh>
//   );
// };

// // Multiple smoke planes to create volume effect
// const SmokeEffect: React.FC = () => {
//   return (
//     <group>
//       {Array.from({ length: 15 }).map((_, i) => (
//         <SmokePlane
//           key={i}
//           position={[
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 3,
//             (Math.random() - 0.5) * 5 - 5,
//           ]}
//           rotation={[0, 0, Math.random() * Math.PI * 2]}
//           scale={[1 + Math.random() * 4, 1 + Math.random() * 4, 1]}
//           speed={0.3 + Math.random() * 1.5}
//           color={i % 3 === 0 ? "#4c1d95" : i % 2 === 0 ? "#7e22ce" : "#2e1065"}
//         />
//       ))}
//     </group>
//   );
// };

// // Main 3D text component with reveal animation
// const AnimatedText: React.FC = () => {
//   const [visible, setVisible] = useState(false);
//   const text = useRef<THREE.Mesh>(null);
//   const { camera } = useThree();

//   useEffect(() => {
//     camera.position.z = 10;
//     setTimeout(() => setVisible(true), 1000);
//   }, [camera]);

//   useFrame((state) => {
//     if (text.current && visible) {
//       (text.current.material as THREE.MeshStandardMaterial).opacity = Math.min(
//         1,
//         state.clock.elapsedTime * 0.2
//       );
//       (text.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
//         Math.min(0.5, state.clock.elapsedTime * 0.1);
//     }
//   });

//   return (
//     <Center>
//       <Text3D
//         ref={text}
//         font="/Inter_Bold.json"
//         size={1.5}
//         height={0.2}
//         curveSegments={12}
//         bevelEnabled
//         bevelThickness={0.02}
//         bevelSize={0.02}
//         bevelOffset={0}
//         bevelSegments={5}
//       >
//         Avenir'25
//         <meshStandardMaterial
//           color="#f8fafc"
//           emissive="#7e22ce"
//           emissiveIntensity={0}
//           transparent
//           opacity={0}
//           metalness={0.6}
//           roughness={0.1}
//         />
//       </Text3D>
//     </Center>
//   );
// };

// // Magic sparkles effect
// const MagicSparkles: React.FC = () => {
//   return (
//     <Sparkles
//       count={150}
//       scale={10}
//       size={2}
//       speed={0.3}
//       color="#7e22ce"
//       opacity={0.4}
//     />
//   );
// };

// // Scene setup
// const Scene: React.FC = () => {
//   return (
//     <>
//       <fog attach="fog" args={["#0a0a0f", 4, 18]} />
//       <ambientLight intensity={0.15} />
//       <directionalLight position={[5, 5, 5]} intensity={0.4} color="#a855f7" />
//       <pointLight position={[-5, -5, -5]} intensity={0.4} color="#4f46e5" />
//       <AnimatedText />
//       <SmokeEffect />
//       <MagicSparkles />
//       <PerspectiveCamera makeDefault fov={50} position={[0, 0, 10]} />
//     </>
//   );
// };

// // Main Hero component
// const Hero: React.FC = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="h-screen w-full bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
//       {/* {loading && (
//         <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
//           <div className="text-purple-600 text-xl">
//             Summoning mystical forces...
//           </div>
//         </div>
//       )} */}
//       <div className="absolute inset-0 z-0">
//         <Canvas shadows>
//           <Scene />
//         </Canvas>
//       </div>
//       <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-sm opacity-60 z-10">
//         <p className="mb-2">Welcome to the mystical journey</p>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Text3D, Center, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Video background component
const VideoBackground: React.FC = () => {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/purple-smoke.mp4"; // Ensure this path is correct
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBAFormat;

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={videoTexture} transparent />
    </mesh>
  );
};

// Main 3D text component with reveal animation
const AnimatedText: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const text = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 10;
    setTimeout(() => setVisible(true), 1000);
  }, [camera]);

  useFrame((state) => {
    if (text.current && visible) {
      (text.current.material as THREE.MeshStandardMaterial).opacity = Math.min(
        1,
        state.clock.elapsedTime * 0.2
      );
      (text.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        Math.min(0.5, state.clock.elapsedTime * 0.1);
    }
  });

  return (
    // <Center>
    //   <Text3D
    //     ref={text}
    //     font="/Inter_Bold.json"
    //     size={1.5}
    //     height={0.2}
    //     curveSegments={12}
    //     bevelEnabled
    //     bevelThickness={0.02}
    //     bevelSize={0.02}
    //     bevelOffset={0}
    //     bevelSegments={5}
    //   >
    //     Avenir'25
    //     <meshStandardMaterial
    //       color="#f8fafc"
    //       emissive="#7e22ce"
    //       emissiveIntensity={0}
    //       transparent
    //       opacity={0}
    //       metalness={0.6}
    //       roughness={0.1}
    //     />
    //   </Text3D>
    // </Center>


    <Center>
  <Text3D
    ref={text}
    font="/Inter_Bold.json"
    size={1.5}
    height={0.2}
    curveSegments={12}
    bevelEnabled
    bevelThickness={0.02}
    bevelSize={0.02}
    bevelOffset={0}
    bevelSegments={5}
  >
    Avenir'25
    <meshStandardMaterial
      color="#f8fafc" // Text color
      emissive="#7e22ce" // Emissive color
      emissiveIntensity={0.5} // Adjust emissive intensity as needed
      transparent={false} // Set to false to remove transparency
      opacity={1} // Set to 1 for full opacity
      metalness={0.6}
      roughness={0.1}
    />
  </Text3D>
</Center>
  );
};

// Magic sparkles effect
const MagicSparkles: React.FC = () => {
  return (
    <Sparkles
      count={150}
      scale={10}
      size={2}
      speed={0.3}
      color="#7e22ce"
      opacity={0.4}
    />
  );
};

// Scene setup
const Scene: React.FC = () => {
  return (
    <>
      <fog attach="fog" args={["#0a0a0f", 4, 18]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#a855f7" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#4f46e5" />
      <VideoBackground />
      <AnimatedText />
      <MagicSparkles />
      <PerspectiveCamera makeDefault fov={50} position={[0, 0, 10]} />
    </>
  );
};

// Main Hero component
const Hero: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <div className="text-purple-600 text-xl">
            Summoning mystical forces...
          </div>
        </div>
      )} */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>
      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-sm opacity-60 z-10">
        <p className="mb-2">Welcome to the mystical journey</p>
      </div>
    </div>
  );
};

export default Hero;
