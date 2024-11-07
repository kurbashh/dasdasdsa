import React from 'react';

const BackstagePage = () => {
  return (
    <div className="backstage-page">
      <header className="backstage-header">
        <h1>Backstage Access</h1>
        <p>Get exclusive behind-the-scenes content and see how the magic of theater is made.</p>
      </header>

      <section className="backstage-content">
        <div className="content-block">
          <h2>Interviews with Performers</h2>
          <p>Hear directly from the actors, dancers, and directors about their experiences, challenges, and creative process.</p>
        </div>

        <div className="content-block">
          <h2>Costume and Set Design</h2>
          <p>Explore the intricate world of costume and set design, and discover how each piece comes together to bring the show to life.</p>
        </div>

        <div className="content-block">
          <h2>Behind the Curtains</h2>
          <p>Take a look behind the curtains and see the rehearsals, preparations, and all the hard work that goes into every performance.</p>
        </div>
      </section>
    </div>
  );
};

export default BackstagePage;
