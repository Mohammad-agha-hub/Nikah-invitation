"use client";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MaroonNikahInvitation = () => {
  const [started, setStarted] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const landingCanvasRef = useRef(null);

  useEffect(() => {
    // Landing page stars animation
    const landingCanvas = landingCanvasRef.current;
    if (!landingCanvas) return;

    const ctx = landingCanvas.getContext("2d");
    landingCanvas.width = window.innerWidth;
    landingCanvas.height = window.innerHeight;

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * landingCanvas.width;
        this.y = Math.random() * landingCanvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
        const colors = [
          { r: 255, g: 215, b: 0 },
          { r: 212, g: 175, b: 55 },
          { r: 255, g: 223, b: 128 },
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speed;
        this.twinklePhase += this.twinkleSpeed;
        if (this.y > landingCanvas.height) {
          this.y = -10;
          this.x = Math.random() * landingCanvas.width;
        }
      }

      draw() {
        const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = this.opacity * twinkle;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 4,
        );
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity * 0.8})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity * 0.4})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.twinklePhase * 0.5);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity})`;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const stars = Array.from({ length: 150 }, () => new Star());

    const animate = () => {
      ctx.clearRect(0, 0, landingCanvas.width, landingCanvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      landingCanvas.width = window.innerWidth;
      landingCanvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    const curtainTimer = setTimeout(() => {
      setCurtainsOpen(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((error) => console.log("Audio play prevented:", error));
          setMusicPlaying(true);
        }
      }, 500);
    }, 500);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
        const colors = [
          { r: 255, g: 215, b: 0 },
          { r: 212, g: 175, b: 55 },
          { r: 255, g: 223, b: 128 },
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speed;
        this.twinklePhase += this.twinkleSpeed;
        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = this.opacity * twinkle;

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 4,
        );
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity * 0.8})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity * 0.4})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.twinklePhase * 0.5);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity})`;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const stars = Array.from({ length: 150 }, () => new Star());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
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
      window.removeEventListener("resize", handleResize);
    };
  }, [started]);

  const handleStart = () => {
    setStarted(true);
  };

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

  if (!started) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#19050a] via-[#3d0814] to-[#19050a] flex items-center justify-center">
        <canvas ref={landingCanvasRef} className="fixed inset-0 z-0" />

        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B0000]/30 via-transparent to-transparent pointer-events-none z-10" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none z-10" />

        <div className="relative z-40 text-center px-4 animate-fade-in-landing">
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] blur-xl opacity-5 animate-pulse-slow" />
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto mb-6 relative animate-float"
              >
                <defs>
                  <linearGradient
                    id="ringGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <circle
                  cx="35"
                  cy="60"
                  r="25"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="4"
                  opacity="0.9"
                />
                <circle
                  cx="85"
                  cy="60"
                  r="25"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="4"
                  opacity="0.9"
                />
                <path
                  d="M 60 35 L 60 50"
                  stroke="url(#ringGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="30" r="8" fill="#FFD700" opacity="0.9" />
                <g transform="translate(60, 28)">
                  <path
                    d="M 0,-6 L 4,-2 L 4,2 L 0,6 L -4,2 L -4,-2 Z"
                    fill="#FFD700"
                    stroke="#FFF8DC"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 0,-6 L 2,-2 L 0,0 L -2,-2 Z"
                    fill="#FFF8DC"
                    opacity="0.9"
                  />
                  <line
                    x1="-3"
                    y1="-2"
                    x2="-1"
                    y2="2"
                    stroke="#FFF8DC"
                    strokeWidth="0.3"
                    opacity="0.7"
                  />
                  <line
                    x1="0"
                    y1="-2"
                    x2="0"
                    y2="2"
                    stroke="#FFF8DC"
                    strokeWidth="0.3"
                    opacity="0.7"
                  />
                  <line
                    x1="3"
                    y1="-2"
                    x2="1"
                    y2="2"
                    stroke="#FFF8DC"
                    strokeWidth="0.3"
                    opacity="0.7"
                  />
                </g>
              </svg>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-great-vibes text-[#d0b206] mb-4 leading-tight animate-slide-down">
              You're Invited
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl font-arabic text-[#ffffffdc] mb-2 animate-slide-down"
              style={{ animationDelay: "0.2s" }}
            >
              To a Sacred Union
            </p>
            <div
              className="flex items-center justify-center gap-3 my-4 animate-slide-down"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <svg width="12" height="12" viewBox="0 0 16 16">
                <path
                  d="M8 2 L10 6 L14 8 L10 10 L8 14 L6 10 L2 8 L6 6 Z"
                  fill="#FFD700"
                />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
            </div>
            <p
              className="text-sm sm:text-base font-cinzel text-[#caa30a] tracking-[0.3em] uppercase animate-slide-down"
              style={{ animationDelay: "0.4s" }}
            >
              Nikah Ceremony
            </p>
          </div>

          <button
            onClick={handleStart}
            className="group relative animate-scale-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
            <div className="relative bg-gradient-to-r from-[#5c0a1a] to-[#800020] px-12 py-5 rounded-full border-2 border-[#D4AF37] shadow-2xl group-hover:scale-105 group-hover:border-[#FFD700] transition-all duration-300">
              <span className="text-xl font-cinzel text-[#edece4] tracking-[0.2em] uppercase group-hover:tracking-[0.25em] transition-all duration-300">
                Open Invitation
              </span>
            </div>
          </button>

          <p
            className="mt-8 text-sm font-cinzel text-[#FFF8DC]/60 tracking-wider animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            Click to reveal
          </p>
        </div>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Mea+Culpa&display=swap");

          @keyframes fade-in-landing {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.2;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-fade-in-landing {
            animation: fade-in-landing 1.5s ease-out forwards;
          }

          .animate-slide-down {
            animation: slide-down 1s ease-out forwards;
            opacity: 0;
          }

          .animate-scale-in {
            animation: scale-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .font-great-vibes {
            font-family: "Mea Culpa", cursive;
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
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#19050a] via-[#3d0814] to-[#19050a] flex items-center justify-center">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      <audio
        ref={audioRef}
        loop
        src="/public_Indila_-_Love_story_Orchestra_Version_Slowed_Reverb_256kbps.webm"
      />

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B0000]/30 via-transparent to-transparent pointer-events-none z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none z-10" />

      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[100] group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-gradient-to-r from-[#D4AF37] to-[#FFD700] p-3 rounded-full shadow-2xl group-hover:scale-110 transition-all duration-300">
          {musicPlaying ? (
            <Volume2 className="w-6 h-6 text-[#19050a]" />
          ) : (
            <VolumeX className="w-6 h-6 text-[#19050a]" />
          )}
        </div>
      </button>

      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-[2500ms] ease-out ${curtainsOpen ? "-translate-x-full" : "translate-x-0"}`}
        >
          <div className="relative w-full h-full bg-gradient-to-r from-[#5c0a1a] via-[#800020] to-[#a0222f]">
            <div className="absolute inset-0 opacity-20">
              {[...Array(60)].map((_, i) => (
                <div
                  key={`left-line-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-black/60 via-black/20 to-black/60"
                  style={{ left: `${i * 1.67}%` }}
                />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black/80 via-black/50 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
          </div>
        </div>

        <div
          className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-[2500ms] ease-out ${curtainsOpen ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="relative w-full h-full bg-gradient-to-l from-[#5c0a1a] via-[#800020] to-[#a0222f]">
            <div className="absolute inset-0 opacity-20">
              {[...Array(60)].map((_, i) => (
                <div
                  key={`right-line-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-black/60 via-black/20 to-black/60"
                  style={{ right: `${i * 1.67}%` }}
                />
              ))}
            </div>
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
          </div>
        </div>
      </div>

      <div
        className={`relative z-40 w-full max-w-[380px] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-4 py-4 sm:py-6 md:py-8 transition-all duration-1500 delay-1000 ${curtainsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-2 md:-ml-6 z-30">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="8"
                r="4"
                fill="#5c0a1a"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <rect x="18" y="8" width="4" height="6" fill="#5c0a1a" />
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
              <defs>
                <linearGradient
                  id="maroon-lantern"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#800020" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#5c0a1a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#800020" stopOpacity="0.95" />
                </linearGradient>
              </defs>
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
                stroke="#5c0a1a"
                strokeWidth="1"
              />
              <ellipse cx="40" cy="25" rx="15" ry="4" fill="#FFD700" />
              <path
                d="M 28 35 L 25 75 Q 25 80 30 82 L 50 82 Q 55 80 55 75 L 52 35 Z"
                fill="url(#maroon-lantern)"
                stroke="#5c0a1a"
                strokeWidth="1.5"
              />
              <rect
                x="30"
                y="40"
                width="20"
                height="35"
                fill="rgba(255,215,0,0.25)"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
              <circle
                cx="40"
                cy="55"
                r="3"
                fill="#FFD700"
                className="lantern-glow"
              />
              <ellipse cx="40" cy="82" rx="10" ry="3" fill="#5c0a1a" />
              <path
                d="M 30 82 Q 40 88 50 82"
                fill="#D4AF37"
                stroke="#5c0a1a"
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
            </svg>
          </div>
        </div>

        <div className="hidden sm:block absolute -right-10 top-1/2 -translate-y-1/2 translate-x-full mr-2 md:mr-6 z-30">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="8"
                r="4"
                fill="#5c0a1a"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <rect x="18" y="8" width="4" height="6" fill="#5c0a1a" />
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
                stroke="#5c0a1a"
                strokeWidth="1"
              />
              <ellipse cx="40" cy="25" rx="15" ry="4" fill="#FFD700" />
              <path
                d="M 28 35 L 25 75 Q 25 80 30 82 L 50 82 Q 55 80 55 75 L 52 35 Z"
                fill="url(#maroon-lantern)"
                stroke="#5c0a1a"
                strokeWidth="1.5"
              />
              <rect
                x="30"
                y="40"
                width="20"
                height="35"
                fill="rgba(255,215,0,0.25)"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
              <circle
                cx="40"
                cy="55"
                r="3"
                fill="#FFD700"
                className="lantern-glow"
              />
              <ellipse cx="40" cy="82" rx="10" ry="3" fill="#5c0a1a" />
              <path
                d="M 30 82 Q 40 88 50 82"
                fill="#D4AF37"
                stroke="#5c0a1a"
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
            </svg>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#FFD700]/20 to-[#D4AF37]/20 rounded-2xl " />

          <div className="relative bg-gradient-to-br from-[#380711] via-[#73031f] to-[#380711] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden border-2 border-[#D4AF37]/40">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="star-pattern"
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
                <rect width="100%" height="100%" fill="url(#star-pattern)" />
              </svg>
            </div>

            <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden z-10">
              <OrnamentalPattern className="w-full h-full" />
            </div>

            <div className="relative px-6 sm:px-8 md:px-10 lg:px-12 pt-20 sm:pt-22 md:pt-24 pb-8 sm:pb-9 md:pb-10">
              <div
                className="text-center mb-3 sm:mb-4 animate-fade-in"
                style={{ animationDelay: "1.3s" }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl pb-4 font-arabic mb-2 text-[#FFD700]">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p className="sm:sm text-[#FFF8DC] font-cinzel font-light tracking-[0.2em] uppercase">
                  In The Name Of Allah, Most Gracious, Most Merciful
                </p>
              </div>

              <div
                className="text-center mb-5 sm:mb-6 animate-fade-in"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="relative inline-block max-w-xl px-4 sm:px-6">
                  <p className="text-lg sm:text-xl md:text-2xl font-arabic mb-2 text-[#FFD700] leading-relaxed">
                    خَلَقْنَاكُمْ أَزْوَاجًا
                  </p>
                  <p className="text-sm md:text-base text-[#FFF8DC] leading-relaxed italic font-light">
                    "And We created you in pairs"
                  </p>
                  <p className=" sm:text-sm text-[#D4AF37] mt-2 font-cinzel">
                    (Quran 78:8)
                  </p>
                </div>
              </div>

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

              <div
                className="text-center mb-5 sm:mb-6 animate-fade-in-up"
                style={{ animationDelay: "1.8s" }}
              >
                <p className="text-[11px] sm:text-xs md:text-sm text-[#FFF8DC] font-cinzel tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 uppercase px-2 sm:px-4">
                  Request the pleasure of your company
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  on the auspicious occasion of the
                </p>
                <h1 className="text-4xl md:text-5xl font-great-vibes text-[#FFD700] mb-1 leading-tight px-2">
                  Nikah Ceremony
                </h1>
                <p className="text-lg md:text-xl font-allura text-[#ffffff] mt-1">
                  of
                </p>
              </div>

              <div
                className="text-center mb-6 sm:mb-7 md:mb-8 space-y-2 sm:space-y-3 animate-slide-up"
                style={{ animationDelay: "2s" }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-great-vibes text-[#FFD700] leading-tight px-2">
                 Mehdi Kazimi
                </h2>
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-great-vibes text-[#ffffff] leading-tight px-2">
                  Mohammad Juma
                </h2>
                <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3">
                  <div className="h-px w-12 sm:w-14 bg-gradient-to-r from-transparent to-[#FFD700]" />
                  <span className="text-xs sm:text-sm font-cinzel text-[#FFF8DC] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                    With
                  </span>
                  <div className="h-px w-12 sm:w-14 bg-gradient-to-l from-transparent to-[#FFD700]" />
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-great-vibes text-[#FFD700] leading-tight px-2">
                  Madina Zahidi
                </h2>
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-great-vibes text-[#ffffff] leading-tight px-2">
                  Baz Mohammad
                </h2>
              </div>

              <div
                className="text-center mb-5 sm:mb-6 animate-scale-in"
                style={{ animationDelay: "2.2s" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent rounded-lg" />
                  <div className="relative bg-gradient-to-br from-[#5c0a1a]/50 to-[#800020]/50 rounded-lg px-4 sm:px-5 md:px-6 py-4 sm:py-5 border border-[#D4AF37]/30 backdrop-blur-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
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
                          <p className="text-[11px] sm:text-xs font-cinzel text-[#ffd900] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                            Date
                          </p>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl font-allura text-[#e5e3dc]">
                          February 10, 2026
                        </p>
                      </div>

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
                          <p className="text-[11px] sm:text-xs font-cinzel text-[#D4AF37] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                            Time
                          </p>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl font-allura text-[#ffffff]">
                          12:00 PM
                        </p>
                      </div>

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
                          <p className="text-[11px] sm:text-xs font-cinzel text-[#D4AF37] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                            Venue
                          </p>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl font-allura text-[#ffffff]">
                          Bride's Home
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden rotate-180 z-10">
              <OrnamentalPattern className="w-full h-full" />
            </div>

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

export default MaroonNikahInvitation;
