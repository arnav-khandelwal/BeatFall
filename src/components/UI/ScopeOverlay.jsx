// src/components/ScopeOverlay.jsx
import "./ScopeOverlay.css";

export default function ScopeOverlay({ visible, fire }) {
    if (!visible) return null;

    return (
        <div className="scope-overlay">
            {/* The 'key' ensures the recoil animation resets every time you fire */}
            <div className={`scope-body ${fire ? "recoil" : ""}`} key={fire}>
                
                {/* Layer 1: The Glass Lens Effect (blue/purple tint) */}
                <div className="scope-lens-coating" />

                {/* Layer 2: The Detailed Reticle */}
                <div className="reticle">
                    <div className="reticle-line v">
                        <div className="mil-dots" />
                    </div>
                    <div className="reticle-line h">
                        <div className="mil-dots" />
                    </div>
                    {/* The tactical center point */}
                    <div className="center-dot" />
                </div>

                {/* Layer 3: Inner Shadow (adds depth to the tube) */}
                <div className="lens-inner-shadow" />
            </div>
        </div>
    );
}