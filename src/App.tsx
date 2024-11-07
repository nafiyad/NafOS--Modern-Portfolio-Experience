import { BrowserRouter as Router } from 'react-router-dom';
import { Desktop } from './components/Desktop';
import { MobileOS } from './components/MobileOS';
import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <Router>
      <div className="h-screen">
        {isMobile ? <MobileOS /> : <Desktop />}
      </div>
    </Router>
  );
}

export default App;