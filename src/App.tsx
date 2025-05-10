import { SkeletonTheme } from "react-loading-skeleton";
import "./App.css";
import AppRouter from "./routes/route";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div>
      <SkeletonTheme baseColor="#ECECEC" highlightColor="#F7F7F7">
        <AppRouter />
      </SkeletonTheme>
    </div>
  );
}

export default App;
