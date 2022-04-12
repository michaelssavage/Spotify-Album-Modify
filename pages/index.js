import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min.js";
import * as THREE from "three";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.token?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
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
  return (
    <main ref={vantaRef}>
      <div className="login">
        Not signed in
        <button className="signIn" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </main>
  );
}
