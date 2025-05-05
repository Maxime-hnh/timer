import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/_helper/helper";

interface CountdownCircleProps {
  duration: number;
  timeLeft: number;
}

function CountdownCircle({ duration, timeLeft }: CountdownCircleProps) {
  const radius = 130;
  const strokeWidth = 12;
  const size = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = useState(1);
  const animationRef = useRef<number>(null);
  const startTimeRef = useRef<number>(performance.now());
  const targetEndRef = useRef<number>(duration);

  useEffect(() => {
    if (duration === 0) return;

    startTimeRef.current = performance.now();
    targetEndRef.current = duration;

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      const remaining = Math.max(0, targetEndRef.current - elapsed);
      const newProgress = remaining / targetEndRef.current;
      setProgress(newProgress);

      if (remaining > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [duration]); // nouvelle animation à chaque nouveau départ

  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#eee"
        fill="none"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="black"
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontWeight={"600"}
        fontFamily="var(--font-orbitron)"
        fontSize={radius / 2}
        fill={"black"}
      >
        {formatTime(timeLeft)}
      </text>
    </svg>
  );
}

export default CountdownCircle;
