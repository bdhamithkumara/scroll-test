import { useEffect, useRef } from "react";
import "./arc-text"; // Ensure the ArcText class is defined in this file or import it correctly

const ArcTextComponent = ({
  value,
  fontSize,
  radius,
  rotation,
  backfaceOpacity,
  textColor,
  bgColor,
  perspectiveOriginX,
  perspectiveOriginY,
}) => {
  const arcTextRef = useRef(null);

  useEffect(() => {
    const arcText = arcTextRef.current;

    if (arcText) {
      if (value) arcText.setAttribute("value", value);
      if (fontSize) arcText.setAttribute("font-size", fontSize);
      if (radius) arcText.setAttribute("radius", radius);
      if (rotation) arcText.setAttribute("rotation", rotation);
      if (backfaceOpacity)
        arcText.setAttribute("backface-opacity", backfaceOpacity);
      if (textColor) arcText.setAttribute("text-color", textColor);
      if (bgColor) arcText.setAttribute("bg-color", bgColor);
      if (perspectiveOriginX)
        arcText.setAttribute("perspective-origin-x", perspectiveOriginX);
      if (perspectiveOriginY)
        arcText.setAttribute("perspective-origin-y", perspectiveOriginY);
    }
  }, [
    value,
    fontSize,
    radius,
    rotation,
    backfaceOpacity,
    textColor,
    bgColor,
    perspectiveOriginX,
    perspectiveOriginY,
  ]);

  return <arc-text ref={arcTextRef}></arc-text>;
};

export default ArcTextComponent;
