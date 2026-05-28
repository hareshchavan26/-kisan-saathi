import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Home from './pages/Home';
import Wizard from './pages/Wizard';
import Results from './pages/Results';
import SchemeDetail from './pages/SchemeDetail';
import About from './pages/About';
import LanguageToggle from './components/LanguageToggle';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-foreground pb-10">
        <header className="p-5 border-b border-gray-100 bg-white/70 backdrop-blur-lg flex justify-between items-center sticky top-0 z-10 shadow-sm transition-all">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            </div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600 tracking-tight">Kisan Saathi</h1>
          </Link>
          <LanguageToggle />
        </header>

        <main className="container mx-auto px-4 mt-8 max-w-5xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/scheme/:id" element={<SchemeDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
