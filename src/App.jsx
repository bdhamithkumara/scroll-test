import ArcTextComponent from "./ArcTextComponent";
import './App.css'
import { useEffect, useState } from "react";

function App() {


  const [divWidth, setDivWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDivWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mainWindow">
      <div id="app" style={{ width: divWidth }}>
        <div className="scroller">
          <div className="text">
            <div className="container">
              <div className="centered">
                <svg height="80" viewBox="0 0 1792 1792" width="80" xmlns="http://www.w3.org/2000/svg"><path d="M1664 896q0 251-146.5 451.5t-378.5 277.5q-27 5-39.5-7t-12.5-30v-211q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-121-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-86-13.5q-44 113-7 204-79 85-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-40 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 89t.5 54q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>
              </div>
              <div className="centered2">
                <div className="container">
                  <button className="centered-button">Learn More</button>
                </div>
              </div>
            </div>




            <ArcTextComponent
              value="preview."
              radius="3.0"
              fontSize="80"
              backfaceOpacity="1"
              textColor="inherit"
            />
            <ArcTextComponent
              value="publish."
              radius="3.0"
              fontSize="80"
              backfaceOpacity="1"
              textColor="inherit"
            />
            <ArcTextComponent
              value="revert."
              radius="3.0"
              fontSize="80"
              backfaceOpacity="1"
              textColor="inherit"
            />
          </div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  )
}

export default App
