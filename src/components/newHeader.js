import React, { useState, useEffect } from "react";


const headingStyle = {
  fontSize: '4em',
};

const buttonStyle = {
  margin: '10px',
};

function NewHeader(props) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.getElementById('headerContainer');
      const headerOffset = headerElement.offsetTop;
      const windowHeight = window.innerHeight;
      const newHeight = Math.min(Math.max(windowHeight - headerOffset, 100), 300); // Adjust the min and max height here
      setHeaderHeight(newHeight);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  const headerStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center',
    textShadow: '2px 2px 4px #000',
    height: `${headerHeight}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
 
  
  return (
    <div id="headerContainer" className="position-relative overflow-hidden" style={headerStyle}>
      <div>
        <h1 style={headingStyle}>OOMDB</h1>
        <p style={{ fontSize: '1.5em' }}>SEE THE LATEST REVIEWS!</p>
        {!props.register  &&  <a className="btn btn-primary" style={buttonStyle} href="register">
          REGISTER
        </a>}
        <a href="/myReviews" className="btn btn-primary" style={buttonStyle}>MY REVIEWS</a>
        <a href="/" className="btn btn-primary" style={buttonStyle}>HOME</a>
      </div>
    </div>
  );
}

export default NewHeader;
