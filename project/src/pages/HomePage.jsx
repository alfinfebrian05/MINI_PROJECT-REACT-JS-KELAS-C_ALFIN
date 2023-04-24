import React from 'react';
import { NavbarComponent } from '../components/organism';

function HomePage() {
  return (
    <div className="mt-28 lg:mt-32 xl:mt-40 px-6 lg:px-18 xl:px-36">
      <NavbarComponent />
      <h1>HomePage</h1>
    </div>
  );
}

export default HomePage;
