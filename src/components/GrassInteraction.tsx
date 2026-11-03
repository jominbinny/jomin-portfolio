import { useEffect, useMemo, useRef } from "react";

type Blade = {
  x: number;
  height: number;
  width: number;
  curve: number;
  layer: number;
  phase: number;
  shade: string;
};

type BladeMotion = {
  angle: number;
  velocity: number;
};

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 170;
const BLADE_COUNT = 150;
const INTERACTION_RADIUS = 150;
const COLORS = ["#173d2b", "#1f5238", "#2f6848", "#397854", "#4b8a60"];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createBlades(): Blade[] {
  return Array.from({ length: BLADE_COUNT }, (_, index) => {
    const layer = index % 3;
    const random = (offset: number) => seededRandom(index * 17 + offset);

    return {
      x: (index / BLADE_COUNT) * VIEWBOX_WIDTH + (random(1) - 0.5) * 12,
      height: 58 + random(2) * 84 - layer * 10,
      width: 3.2 + random(3) * 4.5,
      curve: (random(4) - 0.5) * 28,
      layer,
      phase: random(5) * Math.PI * 2,
      shade: COLORS[(index * 7 + layer) % COLORS.length],
    };
  });
}

function getPointerPosition(event: PointerEvent) {
  return {
    x: (event.clientX / window.innerWidth) * VIEWBOX_WIDTH,
    y: event.clientY,
  };
}

export function GrassInteraction() {
  const blades = useMemo(createBlades, []);
  const container = useRef<HTMLDivElement>(null);
  const groups = useRef<(SVGGElement | null)[]>([]);
  const motion = useRef<BladeMotion[]>(blades.map(() => ({ angle: 0, velocity: 0 })));
  const pointer = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    let frame = 0;
    let lastTime = performance.now();

    const updatePointer = (event: PointerEvent) => {
      pointer.current = { ...getPointerPosition(event), active: true };
    };
    const clearPointer = () => {
      pointer.current.active = false;
    };

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      const bounds = container.current?.getBoundingClientRect();
      const pointerY = bounds
        ? ((pointer.current.y - bounds.top) / bounds.height) * VIEWBOX_HEIGHT
        : -1000;

      blades.forEach((blade, index) => {
        const current = motion.current[index];
        const distance = Math.abs(pointer.current.x - blade.x);
        const horizontalInfluence = Math.max(0, 1 - distance / INTERACTION_RADIUS);
        const verticalInfluence = Math.max(
          0,
          Math.min(1, (pointerY - (VIEWBOX_HEIGHT - blade.height - 30)) / 90),
        );
        const influence = pointer.current.active ? horizontalInfluence * verticalInfluence : 0;
        const direction = pointer.current.x < blade.x ? 1 : -1;
        const breeze = Math.sin(time / 1800 + blade.phase) * (1.2 + blade.layer * 0.25);
        const target = breeze + direction * influence * (15 + (1 - blade.layer) * 17);
        const spring = (target - current.angle) * 0.085;

        current.velocity += spring * delta;
        current.velocity *= Math.pow(0.78, delta);
        current.angle += current.velocity * delta;
        groups.current[index]?.setAttribute(
          "transform",
          `rotate(${current.angle.toFixed(2)} ${blade.x} ${VIEWBOX_HEIGHT})`,
        );
      });

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", updatePointer, { passive: true });
    window.addEventListener("pointerup", clearPointer, { passive: true });
    window.addEventListener("pointercancel", clearPointer, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", updatePointer);
      window.removeEventListener("pointerup", clearPointer);
      window.removeEventListener("pointercancel", clearPointer);
    };
  }, [blades]);

  return (
    <div ref={container} className="grass-interaction" aria-hidden="true">
      <svg
        className="grass-interaction__svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        {blades.map((blade, index) => {
          const baseY = VIEWBOX_HEIGHT + blade.layer * 5;
          const tipY = baseY - blade.height;
          const controlX = blade.x + blade.curve;
          const path = [
            `M ${blade.x - blade.width} ${baseY}`,
            `C ${blade.x - blade.width * 0.75} ${baseY - blade.height * 0.35}, ${controlX - blade.width} ${tipY + blade.height * 0.18}, ${controlX} ${tipY}`,
            `C ${controlX + blade.width} ${tipY + blade.height * 0.18}, ${blade.x + blade.width * 0.75} ${baseY - blade.height * 0.35}, ${blade.x + blade.width} ${baseY}`,
            "Z",
          ].join(" ");

          return (
            <g
              key={index}
              ref={(element) => {
                groups.current[index] = element;
              }}
              opacity={0.62 + (2 - blade.layer) * 0.12}
            >
              <path d={path} fill={blade.shade} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
