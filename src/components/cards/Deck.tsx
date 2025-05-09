import type { DeckProps } from "./cardTypes";

const Deck: React.FC<DeckProps> = ({
    children,
    cardsPerRow = 4,
    rowHeight = "h-auto",
    wrap = true,
    className = "",
  }) => {
    const cardWidth = `${100 / cardsPerRow}%`;
  
    return (
      <div
        className={`flex ${wrap ? "flex-wrap" : "flex-nowrap"} ${rowHeight} ${className}`}
      >
        {Array.isArray(children)
          ? children.map((child, idx) => (
              <div key={idx} className="p-2" style={{ width: cardWidth }}>
                {child}
              </div>
            ))
          : (
            <div className="p-2" style={{ width: cardWidth }}>
              {children}
            </div>
          )}
      </div>
    );
  };
  
  export default Deck;