import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as THREE from "three";

interface ARModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const ARModal = ({ isOpen, onClose, productName }: ARModalProps) => {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        }, 
        audio: false 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Initialize Three.js
      initThreeJS();
      setCameraEnabled(true);
      setError("");
    } catch (err) {
      console.error("Camera access failed:", err);
      setError("Camera access denied. Please allow camera permissions and try again.");
    }
  };

  const initThreeJS = () => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement;
    if (!container) return;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create AR object placeholder (rotating cube)
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xff69b4,
      transparent: true,
      opacity: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cubeRef.current = cube;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();
  };

  const cleanup = () => {
    // Stop animation
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Cleanup Three.js
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    setCameraEnabled(false);
    setError("");
  };

  useEffect(() => {
    if (!isOpen) {
      cleanup();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => cleanup();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-[var(--radius)] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h3 className="text-2xl font-bold">{productName}</h3>
          <button
            onClick={onClose}
            className="text-foreground hover:text-primary transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!cameraEnabled ? (
            <div className="text-center py-16 space-y-6">
              <h3 className="text-3xl font-bold">Starting AR for: {productName}</h3>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                We need access to your camera to begin the virtual try-on.
              </p>
              {error && (
                <p className="text-destructive font-semibold">{error}</p>
              )}
              <Button
                onClick={enableCamera}
                size="lg"
                className="px-12 py-6 text-lg rounded-full"
              >
                Allow Camera Access
              </Button>
            </div>
          ) : (
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
              
              {/* AR Controls Overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4">
                <Button className="rounded-full shadow-lg">
                  📸 Capture Photo
                </Button>
                <Button variant="secondary" className="rounded-full shadow-lg">
                  🔄 Switch Product
                </Button>
              </div>
            </div>
          )}
        </div>

        {cameraEnabled && (
          <div className="p-6 pt-0 text-center text-sm text-muted-foreground">
            💡 <strong>Note:</strong> This is a demo. Full AR tracking requires backend integration.
          </div>
        )}
      </div>
    </div>
  );
};

export default ARModal;
