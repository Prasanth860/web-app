import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const RoutingConfig = lazy(() => import("./Components/RoutingConfig"));
const Landing = lazy(() => import("./SharedComponents/Landing"));
const Login = lazy(() => import("./Components/Auth/Login"));

function App() {
  return (
    <>
      <Suspense fallback={() => <div>Loading ....</div>}>
        <Router>
          <Routes >
          <Route path="" element={<Login />} />
          <Route path="/v1/*" element={<RoutingConfig />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
