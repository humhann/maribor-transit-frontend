import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchComponent } from './components/Search/SearchComponent';
import { TrackingServiceContext } from './services/Tracking/TrackingService';

function App() {
  const trackingService = useContext(TrackingServiceContext);

  useEffect(() => {
    const subscription = trackingService.initialiseTracking();

    return () => {
      subscription.unsubscribe();
    };
  }, [trackingService]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchComponent />
    </div>
  );
}

export default App;
