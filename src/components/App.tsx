import CountriesContextProvider from "../contexts/CountriesContextProvider";
import CountryDetailsPage from "../pages/CountryDetailsPage";
import HomePage from "../pages/HomePage";
import Hero from "./Hero";
import Logo from "./Logo";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Router>
        <header className="relative">
          <Hero />
          <Logo />
        </header>

        <CountriesContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:code" element={<CountryDetailsPage />} />
          </Routes>
        </CountriesContextProvider>
      </Router>
    </>
  );
}

export default App;
