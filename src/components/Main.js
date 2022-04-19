import React from 'react';
import Artist from './Artist';
import Header from './Header';
import '../styles/main.css';
import Track from './Track';


const Main = (props) => {
  return (
    <section>
      <Header {...props} />
      <div className="Artist-content">
        <Artist {...props} />
        <Track {...props} />
      </div>
    </section>
  );
};

export default Main;
