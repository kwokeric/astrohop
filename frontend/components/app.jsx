import React from 'react';

import SessionFormContainer from './session_form/session_form_container';
import HeaderContainer from './header/header_container';
import SplashContainer from './splash/splash_container';
import Footer from './footer/footer';

const App = ({ children }) => (
  <div className="app">
    <HeaderContainer/>
      {children}
    <Footer/>
  </div>
);

export default App;
