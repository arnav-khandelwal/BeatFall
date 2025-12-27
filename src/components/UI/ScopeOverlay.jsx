export default function ScopeOverlay({ visible }) {
    if (!visible) return null;

    return (
        <div className="scope-overlay">

            <div className="scope-circle" >
                <div className="scope-line v" />
                <div className="scope-line h" />
            </div>
        </div>
    );
}
