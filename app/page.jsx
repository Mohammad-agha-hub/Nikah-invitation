"use client";
import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

const NikkaInvitation = () => {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const curtainTimer = setTimeout(() => setCurtainsOpen(true), 1500);
    const musicTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.log("Audio autoplay prevented:", error));
        setMusicPlaying(true);
      }
    }, 2000);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500;
        this.radius = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = Math.random() * 1.5 + 0.8;
        const colors = [
          { r: 212, g: 175, b: 55 },
          { r: 255, g: 215, b: 0 },
          { r: 34, g: 139, b: 34 },
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.z -= this.vz;
        this.x += this.vx;
        this.y += this.vy;
        if (this.z < 1) {
          this.reset();
          this.z = 1500;
        }
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const radius = this.radius * scale;
        const alpha = (1500 - this.z) / 1500;

        const gradient = ctx.createRadialGradient(
          x2d,
          y2d,
          0,
          x2d,
          y2d,
          radius * 8,
        );
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.6})`,
        );
        gradient.addColorStop(
          0.4,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.3})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${this.color.r + 40}, ${this.color.g + 40}, ${this.color.b + 40}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 120 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = "rgba(10, 30, 20, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(musicTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const OrnamentalPattern = ({ className = "" }) => (
    <svg
      viewBox="0 0 800 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="goldGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <g opacity="0.85">
        <path d="M400 20 L420 40 L400 60 L380 40 Z" fill="url(#goldGrad)" />
        <circle cx="400" cy="40" r="8" fill="#FFF8DC" opacity="0.9" />

        {[...Array(8)].map((_, i) => {
          const x = 350 - i * 45;
          const size = 12 - i * 1;
          return (
            <g key={`left-${i}`}>
              <circle
                cx={x}
                cy="40"
                r={size}
                fill="url(#goldGrad)"
                opacity={0.7 - i * 0.05}
              />
              <circle
                cx={x}
                cy="40"
                r={size * 0.6}
                fill="#FFF8DC"
                opacity={0.5}
              />
              <path
                d={`M ${x - size} 40 Q ${x - size - 10} ${30 + i * 2}, ${x - size - 15} 40 Q ${x - size - 10} ${50 - i * 2}, ${x - size} 40`}
                stroke="#D4AF37"
                strokeWidth="1"
                fill="none"
                opacity={0.6}
              />
              <path
                d={`M ${x + size} 40 Q ${x + size + 10} ${30 + i * 2}, ${x + size + 15} 40 Q ${x + size + 10} ${50 - i * 2}, ${x + size} 40`}
                stroke="#D4AF37"
                strokeWidth="1"
                fill="none"
                opacity={0.6}
              />
            </g>
          );
        })}

        {[...Array(8)].map((_, i) => {
          const x = 450 + i * 45;
          const size = 12 - i * 1;
          return (
            <g key={`right-${i}`}>
              <circle
                cx={x}
                cy="40"
                r={size}
                fill="url(#goldGrad)"
                opacity={0.7 - i * 0.05}
              />
              <circle
                cx={x}
                cy="40"
                r={size * 0.6}
                fill="#FFF8DC"
                opacity={0.5}
              />
              <path
                d={`M ${x - size} 40 Q ${x - size - 10} ${30 + i * 2}, ${x - size - 15} 40 Q ${x - size - 10} ${50 - i * 2}, ${x - size} 40`}
                stroke="#D4AF37"
                strokeWidth="1"
                fill="none"
                opacity={0.6}
              />
              <path
                d={`M ${x + size} 40 Q ${x + size + 10} ${30 + i * 2}, ${x + size + 15} 40 Q ${x + size + 10} ${50 - i * 2}, ${x + size} 40`}
                stroke="#D4AF37"
                strokeWidth="1"
                fill="none"
                opacity={0.6}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1e14] via-[#1a3d2e] to-[#0a1e14] flex items-center justify-center">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/03/10/audio_4f5c0a36c3.mp3"
      />

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e7d32]/30 via-transparent to-transparent pointer-events-none z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent pointer-events-none z-10" />

      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[100] group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-gradient-to-r from-[#D4AF37] to-[#FFD700] p-3 rounded-full shadow-2xl group-hover:scale-110 transition-all duration-300">
          {musicPlaying ? (
            <Volume2 className="w-6 h-6 text-[#0a1e14]" />
          ) : (
            <VolumeX className="w-6 h-6 text-[#0a1e14]" />
          )}
        </div>
      </button>

      {/* Curtains */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-[2500ms] ease-out ${curtainsOpen ? "-translate-x-full" : "translate-x-0"}`}
        >
          <div className="relative w-full h-full bg-gradient-to-r from-[#0d2818] via-[#1b5e20] to-[#2e7d32]">
            <div className="absolute inset-0 opacity-30">
              {[...Array(50)].map((_, i) => (
                <div
                  key={`left-line-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-black/40 via-transparent to-black/40"
                  style={{ left: `${i * 2}%` }}
                />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-3 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
          </div>
        </div>

        <div
          className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-[2500ms] ease-out ${curtainsOpen ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="relative w-full h-full bg-gradient-to-l from-[#0d2818] via-[#1b5e20] to-[#2e7d32]">
            <div className="absolute inset-0 opacity-30">
              {[...Array(50)].map((_, i) => (
                <div
                  key={`right-line-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-black/40 via-transparent to-black/40"
                  style={{ right: `${i * 2}%` }}
                />
              ))}
            </div>
            <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-3 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-40 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-4 py-4 sm:py-6 md:py-8 transition-all duration-1500 delay-1000 ${curtainsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {/* Animated Lanterns on Left Side - OUTSIDE THE CARD */}
        <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-2 md:-ml-6 z-30">
          {/* Hanging hook at top */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <svg width="40" height="40" viewBox="0 0 40 40">
              {/* Hook base */}
              <circle
                cx="20"
                cy="8"
                r="4"
                fill="#8B7355"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <rect x="18" y="8" width="4" height="6" fill="#8B7355" />
              {/* Decorative ring */}
              <circle
                cx="20"
                cy="8"
                r="6"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className="lantern-swing">
            <svg
              width="60"
              height="100"
              viewBox="0 0 80 120"
              className="drop-shadow-2xl md:w-[70px] md:h-[110px]"
            >
              <line
                x1="40"
                y1="0"
                x2="40"
                y2="25"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <path
                d="M 25 25 Q 40 20 55 25 L 52 35 L 28 35 Z"
                fill="#D4AF37"
                stroke="#8B7355"
                strokeWidth="1"
              />
              <ellipse cx="40" cy="25" rx="15" ry="4" fill="#FFD700" />
              <path
                d="M 28 35 L 25 75 Q 25 80 30 82 L 50 82 Q 55 80 55 75 L 52 35 Z"
                fill="url(#lantern-gradient-left)"
                stroke="#8B7355"
                strokeWidth="1.5"
              />
              <rect
                x="30"
                y="40"
                width="20"
                height="35"
                fill="rgba(255,215,0,0.3)"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
              <line
                x1="40"
                y1="40"
                x2="40"
                y2="75"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.6"
              />
              <circle
                cx="40"
                cy="55"
                r="3"
                fill="#FFD700"
                className="lantern-glow"
              />
              <path
                d="M 32 45 L 48 45 M 32 50 L 48 50 M 32 60 L 48 60 M 32 65 L 48 65 M 32 70 L 48 70"
                stroke="#D4AF37"
                strokeWidth="0.3"
                opacity="0.4"
              />
              <ellipse cx="40" cy="82" rx="10" ry="3" fill="#8B7355" />
              <path
                d="M 30 82 Q 40 88 50 82"
                fill="#D4AF37"
                stroke="#8B7355"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="88"
                x2="40"
                y2="95"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <circle cx="40" cy="96" r="4" fill="#FFD700" />
              <g>
                <line
                  x1="40"
                  y1="100"
                  x2="37"
                  y2="110"
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="100"
                  x2="40"
                  y2="112"
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="100"
                  x2="43"
                  y2="110"
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
              </g>
              <defs>
                <linearGradient
                  id="lantern-gradient-left"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#2d5a3d" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#1e4d2b" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#2d5a3d" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Animated Lanterns on Right Side - OUTSIDE THE CARD */}
        <div className="hidden sm:block absolute -right-10 top-1/2 -translate-y-1/2 translate-x-full mr-2 md:mr-6 z-30">
          {/* Hanging hook at top */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <svg width="40" height="40" viewBox="0 0 40 40">
              {/* Hook base */}
              <circle
                cx="20"
                cy="8"
                r="4"
                fill="#8B7355"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <rect x="18" y="8" width="4" height="6" fill="#8B7355" />
              {/* Decorative ring */}
              <circle
                cx="20"
                cy="8"
                r="6"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className="lantern-swing-reverse">
            <svg
              width="60"
              height="100"
              viewBox="0 0 80 120"
              className="drop-shadow-2xl md:w-[70px] md:h-[110px]"
            >
              <line
                x1="40"
                y1="0"
                x2="40"
                y2="25"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <path
                d="M 25 25 Q 40 20 55 25 L 52 35 L 28 35 Z"
                fill="#D4AF37"
                stroke="#8B7355"
                strokeWidth="1"
              />
              <ellipse cx="40" cy="25" rx="15" ry="4" fill="#FFD700" />
              <path
                d="M 28 35 L 25 75 Q 25 80 30 82 L 50 82 Q 55 80 55 75 L 52 35 Z"
                fill="url(#lantern-gradient-right)"
                stroke="#8B7355"
                strokeWidth="1.5"
              />
              <rect
                x="30"
                y="40"
                width="20"
                height="35"
                fill="rgba(255,215,0,0.3)"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
              <line
                x1="40"
                y1="40"
                x2="40"
                y2="75"
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.6"
              />
              <circle
                cx="40"
                cy="55"
                r="3"
                fill="#FFD700"
                className="lantern-glow"
              />
              <path
                d="M 32 45 L 48 45 M 32 50 L 48 50 M 32 60 L 48 60 M 32 65 L 48 65 M 32 70 L 48 70"
                stroke="#D4AF37"
                strokeWidth="0.3"
                opacity="0.4"
              />
              <ellipse cx="40" cy="82" rx="10" ry="3" fill="#8B7355" />
              <path
                d="M 30 82 Q 40 88 50 82"
                fill="#D4AF37"
                stroke="#8B7355"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="88"
                x2="40"
                y2="95"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <circle cx="40" cy="96" r="4" fill="#FFD700" />
              <g>
                <line
                  x1="40"
                  y1="100"
                  x2="37"
                  y2="110"
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="100"
                  x2="40"
                  y2="112"
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="100"
                  x2="43"
                  y2="110"
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
              </g>
              <defs>
                <linearGradient
                  id="lantern-gradient-right"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#2d5a3d" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#1e4d2b" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#2d5a3d" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 via-[#FFD700]/30 to-[#D4AF37]/30 rounded-2xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-[#1a4d3a] via-[#1e5542] to-[#1a4d3a] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden border-2 border-[#D4AF37]/40">
            {/* Islamic Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="islamic-pattern"
                    x="0"
                    y="0"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <g transform="translate(40, 40)">
                      <path
                        d="M 0,-20 L 5,-5 L 20,0 L 5,5 L 0,20 L -5,5 L -20,0 L -5,-5 Z"
                        fill="#D4AF37"
                        opacity="0.6"
                      />
                      <circle cx="0" cy="0" r="3" fill="#FFD700" />
                    </g>
                    <path
                      d="M 15,15 L 25,15 L 25,25 L 15,25 Z"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                    <path
                      d="M 55,15 L 65,15 L 65,25 L 55,25 Z"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                    <path
                      d="M 15,55 L 25,55 L 25,65 L 15,65 Z"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                    <path
                      d="M 55,55 L 65,55 L 65,65 L 55,65 Z"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                    <path
                      d="M 20,0 L 20,15 M 60,0 L 60,15 M 0,20 L 15,20 M 65,20 L 80,20"
                      stroke="#D4AF37"
                      strokeWidth="0.3"
                      opacity="0.3"
                    />
                    <path
                      d="M 20,65 L 20,80 M 60,65 L 60,80 M 0,60 L 15,60 M 65,60 L 80,60"
                      stroke="#D4AF37"
                      strokeWidth="0.3"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
              </svg>
            </div>

            {/* Top Ornamental Pattern */}
            <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden z-10">
              <OrnamentalPattern className="w-full h-full" />
            </div>

            {/* Content */}
            <div className="relative px-6 sm:px-8 md:px-10 lg:px-12 pt-20 sm:pt-22 md:pt-24 pb-8 sm:pb-9 md:pb-10">
              {/* Bismillah */}
              <div
                className="text-center mb-3 sm:mb-4 animate-fade-in"
                style={{ animationDelay: "1.3s" }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl pb-4 font-arabic mb-2 text-[#FFD700]">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-[10px] sm:text-xs text-[#FFF8DC] font-cinzel font-light tracking-[0.2em] uppercase">
                  In The Name Of Allah, Most Gracious, Most Merciful
                </p>
              </div>

              {/* Quranic Verse */}
              <div
                className="text-center mb-5 sm:mb-6 animate-fade-in"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="relative inline-block max-w-xl px-4 sm:px-6">
                  <p className="text-lg sm:text-xl md:text-2xl font-arabic mb-2 text-[#FFD700] leading-relaxed">
                    خَلَقْنَاكُمْ أَزْوَاجًا
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-[#FFF8DC] leading-relaxed italic font-light">
                    "And We created you in pairs"
                  </p>
                  <p className="text-[10px] sm:text-sm text-[#D4AF37] mt-2 font-cinzel">
                    (Quran 78:8)
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center mb-5 sm:mb-6">
                <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-[#FFD700] to-[#FFD700]" />
                <div className="mx-2 sm:mx-3">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    className="sm:w-[14px] sm:h-[14px]"
                  >
                    <path
                      d="M8 2 L10 6 L14 8 L10 10 L8 14 L6 10 L2 8 L6 6 Z"
                      fill="#FFD700"
                    />
                  </svg>
                </div>
                <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent via-[#FFD700] to-[#FFD700]" />
              </div>

              {/* Invitation Text */}
              <div
                className="text-center mb-5 sm:mb-6 animate-fade-in-up"
                style={{ animationDelay: "1.8s" }}
              >
                <p className="text-[10px] sm:text-xs md:text-sm text-[#FFF8DC] font-cinzel tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 uppercase px-2 sm:px-4">
                  Request the pleasure of your company
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  on the auspicious occasion of the
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-great-vibes text-[#FFD700] mb-1 leading-tight px-2">
                  Nikah Ceremony
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-allura text-[#D4AF37] mt-1">
                  of
                </p>
              </div>

              {/* Names */}
              <div
                className="text-center mb-6 sm:mb-7 md:mb-8 space-y-2 sm:space-y-3 animate-slide-up"
                style={{ animationDelay: "2s" }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-great-vibes text-[#FFD700] leading-tight px-2">
                  Mehdi
                </h2>

                <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3">
                  <div className="h-px w-12 sm:w-14 bg-gradient-to-r from-transparent to-[#FFD700]" />
                  <span className="text-xs sm:text-sm font-cinzel text-[#FFF8DC] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                    With
                  </span>
                  <div className="h-px w-12 sm:w-14 bg-gradient-to-l from-transparent to-[#FFD700]" />
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-great-vibes text-[#FFD700] leading-tight px-2">
                  Madina
                </h2>
              </div>

              {/* Event Details - Enhanced */}
              <div
                className="text-center mb-5 sm:mb-6 animate-scale-in"
                style={{ animationDelay: "2.2s" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent rounded-lg" />
                  <div className="relative bg-gradient-to-br from-[#1a3d2e]/50 to-[#2d5a3d]/50 rounded-lg px-4 sm:px-5 md:px-6 py-4 sm:py-5 border border-[#D4AF37]/30 backdrop-blur-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      {/* Date */}
                      <div className="group">
                        <div className="flex items-center justify-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="mr-2 sm:w-[20px] sm:h-[20px]"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="3"
                              y1="10"
                              x2="21"
                              y2="10"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="8"
                              y1="2"
                              x2="8"
                              y2="6"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="16"
                              y1="2"
                              x2="16"
                              y2="6"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                          </svg>
                          <p className="text-[10px] sm:text-xs font-cinzel text-[#D4AF37] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                            Date
                          </p>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl font-allura text-[#FFD700]">
                          February 10, 2026
                        </p>
                      </div>

                      {/* Time */}
                      <div className="group">
                        <div className="flex items-center justify-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="mr-2 sm:w-[20px] sm:h-[20px]"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="12"
                              y1="7"
                              x2="12"
                              y2="12"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="12"
                              y1="12"
                              x2="15"
                              y2="15"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                          </svg>
                          <p className="text-[10px] sm:text-xs font-cinzel text-[#D4AF37] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                            Time
                          </p>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl font-allura text-[#FFD700]">
                          12:00 PM
                        </p>
                      </div>

                      {/* Venue */}
                      <div className="group">
                        <div className="flex items-center justify-center mb-2">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="mr-2 sm:w-[20px] sm:h-[20px]"
                          >
                            <path
                              d="M12 2 L2 7 L12 12 L22 7 L12 2Z"
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M2 17 L12 22 L22 17"
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M2 12 L12 17 L22 12"
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                            />
                          </svg>
                          <p className="text-[10px] sm:text-xs font-cinzel text-[#D4AF37] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                            Venue
                          </p>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl font-allura text-[#FFD700]">
                          Grand Mosque Hall
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Ornamental Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden rotate-180 z-10">
              <OrnamentalPattern className="w-full h-full" />
            </div>

            {/* Bottom Border */}
            <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Allura&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Mea+Culpa&display=swap");

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes lantern-swing {
          0%,
          100% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }

        @keyframes lantern-glow {
          0%,
          100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(255, 215, 0, 1));
          }
        }

        .lantern-swing {
          animation: lantern-swing 4s ease-in-out infinite;
          transform-origin: top center;
        }

        .lantern-swing-reverse {
          animation: lantern-swing 4s ease-in-out infinite;
          animation-delay: 2s;
          transform-origin: top center;
        }

        .lantern-glow {
          animation: lantern-glow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slide-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .font-great-vibes {
          font-family: "Mea Culpa", cursive;
        }
        .font-allura {
          font-family: "Amiri", serif;
        }
        .font-arabic {
          font-family: "Amiri", serif;
        }
        .font-cinzel {
          font-family: "Cinzel", serif;
        }
      `}</style>
    </div>
  );
};

export default NikkaInvitation;
