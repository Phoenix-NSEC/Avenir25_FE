import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<Particle>>([]);
  const magicElementsRef = useRef<Array<MagicElement>>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Particle class definition
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
    pulse: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.pulse = Math.random() * 0.1;
      this.alpha = Math.random() * 0.5 + 0.5;

      // Create a gradient color from purple to cyan with some variation
      const hue =
        Math.random() > 0.5
          ? 260 + Math.random() * 40 // purple range
          : 180 + Math.random() * 30; // cyan range
      this.color = `hsla(${hue}, 80%, 60%, ${this.alpha})`;
    }

    update(mouseX: number, mouseY: number, _time: number) {
      // Move particles
      this.x += this.speedX;
      this.y += this.speedY;

      // Add subtle attraction to mouse
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (200 - distance) / 500;
        this.speedX += forceDirectionX * force;
        this.speedY += forceDirectionY * force;
      }

      // Add friction to prevent infinite acceleration
      this.speedX *= 0.98;
      this.speedY *= 0.98;

      // Wrap around edges
      if (this.x < 0) this.x = windowSize.width;
      if (this.x > windowSize.width) this.x = 0;
      if (this.y < 0) this.y = windowSize.height;
      if (this.y > windowSize.height) this.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D, time: number) {
      const pulseFactor = Math.sin(time * this.pulse) * 0.5 + 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * pulseFactor, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Magic Element class for special moving elements
  class MagicElement {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotationSpeed: number;
    rotation: number;
    points: number;
    color: string;
    glowColor: string;
    glowSize: number;
    lifetime: number;
    maxLifetime: number;
    type: "star" | "polygon" | "ring" | "comet";

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 30 + 10;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;

      // Slower, more deliberate movement than particles
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.7 + 0.3;
      this.speedX = Math.cos(angle) * speed;
      this.speedY = Math.sin(angle) * speed;

      // Random number of points for stars and polygons
      this.points = Math.floor(Math.random() * 4) + 3;

      // Magical colors with high saturation
      const hues = [280, 260, 220, 180, 300]; // Purple, blue, cyan, magenta hues
      const hue = hues[Math.floor(Math.random() * hues.length)];
      this.color = `hsla(${hue}, 100%, 70%, 0.7)`;
      this.glowColor = `hsla(${hue}, 100%, 50%, 0.2)`;
      this.glowSize = this.size * 2;

      // Lifetime for elements to appear and disappear
      this.maxLifetime = Math.random() * 500 + 500;
      this.lifetime = 0;

      // Different types of magical elements
      const types: Array<"star" | "polygon" | "ring" | "comet"> = [
        "star",
        "polygon",
        "ring",
        "comet",
      ];
      this.type = types[Math.floor(Math.random() * types.length)];
    }

    update() {
      // Update position
      this.x += this.speedX;
      this.y += this.speedY;

      // Update rotation
      this.rotation += this.rotationSpeed;

      // Update lifetime
      this.lifetime++;

      // Wrap around edges with some margin
      const margin = this.size * 2;
      if (this.x < -margin) this.x = windowSize.width + margin;
      if (this.x > windowSize.width + margin) this.x = -margin;
      if (this.y < -margin) this.y = windowSize.height + margin;
      if (this.y > windowSize.height + margin) this.y = -margin;

      return this.lifetime <= this.maxLifetime;
    }

    draw(ctx: CanvasRenderingContext2D, time: number) {
      const alpha =
        this.lifetime < 60
          ? this.lifetime / 60
          : this.lifetime > this.maxLifetime - 60
          ? (this.maxLifetime - this.lifetime) / 60
          : 1;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Draw glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.glowColor;

      switch (this.type) {
        case "star":
          this.drawStar(
            ctx,
            0,
            0,
            this.points,
            this.size * 0.5,
            this.size,
            alpha
          );
          break;
        case "polygon":
          this.drawPolygon(ctx, 0, 0, this.points, this.size, alpha);
          break;
        case "ring":
          this.drawRing(ctx, 0, 0, this.size, this.size * 0.3, alpha, time);
          break;
        case "comet":
          this.drawComet(ctx, 0, 0, this.size, alpha);
          break;
      }

      ctx.restore();
    }

    drawStar(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      innerRadius: number,
      outerRadius: number,
      alpha: number
    ) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }

      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = this.color.replace("0.7", alpha.toString());
      ctx.fill();
    }

    drawPolygon(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      sides: number,
      radius: number,
      alpha: number
    ) {
      ctx.beginPath();
      const angle = (Math.PI * 2) / sides;

      for (let i = 0; i < sides; i++) {
        const x = cx + radius * Math.cos(angle * i);
        const y = cy + radius * Math.sin(angle * i);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fillStyle = this.color.replace("0.7", alpha.toString());
      ctx.fill();
    }

    drawRing(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      outerRadius: number,
      thickness: number,
      alpha: number,
      time: number
    ) {
      // Create a pulsating ring with dynamic thickness
      const pulse = Math.sin(time * 0.5) * 0.2 + 1;

      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = this.color.replace("0.7", alpha.toString());
      ctx.lineWidth = thickness;
      ctx.stroke();

      // Add a second inner ring for extra magic
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius * 0.6 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = this.color.replace("0.7", (alpha * 0.7).toString());
      ctx.lineWidth = thickness * 0.5;
      ctx.stroke();
    }

    drawComet(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      alpha: number
    ) {
      // Comet head
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, this.color.replace("0.7", alpha.toString()));
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Comet tail
      const tailGradient = ctx.createLinearGradient(
        cx,
        cy,
        cx - this.speedX * radius * 3,
        cy - this.speedY * radius * 3
      );
      tailGradient.addColorStop(
        0,
        this.color.replace("0.7", (alpha * 0.8).toString())
      );
      tailGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      // Control points for curve
      const cpx1 = cx - this.speedX * radius * 1.5 + this.speedY * 0.3;
      const cpy1 = cy - this.speedY * radius * 1.5 - this.speedX * 0.3;
      const cpx2 = cx - this.speedX * radius * 3 - this.speedY * 0.5;
      const cpy2 = cy - this.speedY * radius * 3 + this.speedX * 0.5;
      const x = cx - this.speedX * radius * 4;
      const y = cy - this.speedY * radius * 4;

      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
      ctx.lineTo(x - radius, y - radius);
      ctx.lineTo(x - radius, y + radius);
      ctx.closePath();
      ctx.fillStyle = tailGradient;
      ctx.fill();
    }
  }

  // Initialize particles and magic elements
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    const initParticles = () => {
      particlesRef.current = [];
      // Create particles based on screen size
      const particleCount = Math.floor(
        (windowSize.width * windowSize.height) / 12000
      );

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * windowSize.width;
        const y = Math.random() * windowSize.height;
        particlesRef.current.push(new Particle(x, y));
      }

      // Initialize some magic elements
      magicElementsRef.current = [];
      const magicCount =
        Math.floor((windowSize.width * windowSize.height) / 150000) + 2;

      for (let i = 0; i < magicCount; i++) {
        const x = Math.random() * windowSize.width;
        const y = Math.random() * windowSize.height;
        magicElementsRef.current.push(new MagicElement(x, y));
      }
    };

    initParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [windowSize.width, windowSize.height]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let lastTime = 0;

    const animate = (timestamp: number) => {
      // Calculate delta time and update time reference
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      timeRef.current += 0.001 * deltaTime;

      ctx.clearRect(0, 0, windowSize.width, windowSize.height);

      // Draw magic energy paths between particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            // Dynamic connection color based on distance
            const alpha = (1 - distance / 150) * 0.2;
            const hue = 260 - (distance / 150) * 80; // Shift from purple to cyan
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;

            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(mousePosition.x, mousePosition.y, timeRef.current);
        particle.draw(ctx, timeRef.current);
      });

      // Randomly add new magic elements
      if (Math.random() < 0.005) {
        const x = Math.random() * windowSize.width;
        const y = Math.random() * windowSize.height;
        magicElementsRef.current.push(new MagicElement(x, y));
      }

      // Update and draw magic elements
      magicElementsRef.current = magicElementsRef.current.filter((element) => {
        const isAlive = element.update();
        if (isAlive) {
          element.draw(ctx, timeRef.current);
        }
        return isAlive;
      });

      // Create energy beam effect when mouse moves
      if (mousePosition.x !== 0 && mousePosition.y !== 0) {
        const mouseRadius = 100;
        const mouseGlow = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          mouseRadius
        );
        mouseGlow.addColorStop(0, "rgba(147, 51, 234, 0.2)");
        mouseGlow.addColorStop(0.5, "rgba(56, 189, 248, 0.1)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, mouseRadius, 0, Math.PI * 2);
        ctx.fillStyle = mouseGlow;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, windowSize]);

  // Create floating light orbs effect
  const orbs = Array(6)
    .fill(0)
    .map((_, i) => {
      const orb = {
        x: 10 + i * 20,
        y: 20 + i * 10,
        size: 100 + Math.random() * 200,
        color: i % 2 === 0 ? "purple" : "cyan",
      };
      return orb;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
    >
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />

      {/* Moving gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-10 ${
            orb.color === "purple" ? "bg-purple-600" : "bg-cyan-400"
          }`}
          initial={{
            x: `${orb.x}%`,
            y: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: [`${orb.x}%`, `${orb.x + 5}%`, `${orb.x - 5}%`, `${orb.x}%`],
            y: [`${orb.y}%`, `${orb.y - 8}%`, `${orb.y + 8}%`, `${orb.y}%`],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated particle system */}
      <canvas
        ref={canvasRef}
        width={windowSize.width}
        height={windowSize.height}
        className="absolute inset-0"
      />

      {/* Cosmic dust overlay */}
      <div
        className="absolute inset-0 bg-noise opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Light beam effect */}
      <div
        className="absolute top-0 left-1/4 w-32 h-screen bg-gradient-to-b from-purple-500/5 via-transparent to-transparent transform -rotate-45 blur-xl animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute top-0 right-1/3 w-24 h-screen bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent transform rotate-45 blur-xl animate-pulse"
        style={{ animationDuration: "12s" }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;
