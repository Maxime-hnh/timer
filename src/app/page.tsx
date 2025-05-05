"use client"
import CountdownCircle from "@/_components/countDownCircle";
import SetProgressBar from "@/_components/setProgressBar";
import { Button } from "@/_components/ui/button";
import { formatTime } from "@/_helper/helper";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {


  const [setList, setSetList] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [restList, setRestList] = useState<number[]>([10, 60, 90, 120, 180, 240]);
  const [restTime, setRestTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [gradient, setGradient] = useState<string>("--custom-gradient-green");
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [progressToNext, setProgressToNext] = useState(0);
  const isRunningRef = useRef(false);


  function addRestTime(time: number) {
    setList.push(time)
    setSetList(setList.sort((a, b) => a - b));
  };

  function removeRestTime(index: number) {
    setList.splice(index, 1);
  };

  function handleCurrentIndex(n: number) {
    setCurrentSetIndex(n)
  }

  function play(time: number) {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDuration(time);
    setRestTime(time);
    setGradient("--custom-gradient-green");
    isRunningRef.current = true;

    const half = time / 2;
    const nearEnd = time * 0.2;

    intervalRef.current = setInterval(() => {
      setRestTime((prev) => {
        const newTime = prev - 1;

        if (newTime <= nearEnd) {
          setGradient("--custom-gradient-red");
        } else if (newTime <= half) {
          setGradient("--custom-gradient-orange");
        }
        
        if (newTime <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setCurrentSetIndex((prev) => prev + 1);
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);
  }

  return (
    <div className="h-dvh" style={{ backgroundImage: `var(${gradient})` }}>
      <header className="flex items-center justify-between h-[60px] py-0 sm:py-1 px-0 sm:px-4 md:px-24 lg:px-40">
        <div className="sm:hidden flex items-center justify-center w-full">
          <Image src="/logo_dark.png" width={50} height={50} alt="logo" className="rounded-full" />
        </div>
      </header>
      <div className="flex flex-col justify-between h-full">
        <SetProgressBar
          sets={setList}
          currentSetIndex={currentSetIndex}
          progressToNext={progressToNext}
          handleCurrentIndex={handleCurrentIndex}
        />
        <div className="h-[calc(100dvh-60px-1rem)] px-3">
          <div className="flex justify-center items-center relative">
            <CountdownCircle duration={duration} timeLeft={restTime} />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {restList.map((r, i) => (
              <Button key={i} onClick={() => play(r)} className="py-8">
                {formatTime(r)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
