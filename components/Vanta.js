import { useEffect, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min.js";
import * as THREE from "three";

export default function useVanta(vantaRef) {
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x2a7ad1,
          midtoneColor: 0xd6681f,
          lowlightColor: 0x23e5c0,
          baseColor: 0xfcedd5,
          blurFactor: 0.75,
          THREE,
        })
      );
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return vantaRef;
}
