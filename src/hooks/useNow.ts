import { useEffect, useState } from "react";

// მიმდინარე დრო, რომელიც ყოველ intervalMs-ში ახლდება
export function useNow(intervalMs: number): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}