import { useState } from "react";
import { useHandInput } from "./hooks/useHandInput";
import HandCanvas from "./components/HandCanvas";

export default function App() {
  const [hand, setHand] = useState({ active: false });

  useHandInput(setHand);

  return (
    <>
      <HandCanvas
        landmarks={hand.landmarks}
        aim={hand.aim}
        fire={hand.fire}
      />

      {/* DEBUG */}
      <div style={{ position: "fixed", top: 10, left: 10, color: "#0af" }}>
        {!hand.active && <div>Hand not detected</div>}
        {hand.active && (
          <>
            <div>Aim: {hand.aim ? "YES" : "NO"}</div>
            <div>Fire: {hand.fire ? "YES" : "NO"}</div>
          </>
        )}
      </div>

      {/* DEPTH WARNINGS */}
      {hand.depthError === "TOO_CLOSE" && (
        <div style={{ color: "red" }}>✋ Move hand away</div>
      )}
      {hand.depthError === "TOO_FAR" && (
        <div style={{ color: "orange" }}>✋ Move hand closer</div>
      )}
    </>
  );
}
