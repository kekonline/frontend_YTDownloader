import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';

const App: React.FC = () => {
  const [text, setText] = useState("https://www.youtube.com/watch?v=weRHyjj34ZE&ab_channel=shakiraVEVO");

  // create . env file with server name

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/audio-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: text })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }

      const blob = await response.blob();

      // Create a download link and click it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audio.mp3'; // You can dynamically generate the filename too
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };


  return (
    <div className="app-container">
      <img src={logo} alt="Logo" className="logo" />
      <textarea
        className="text-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button className="get-audio-button" onClick={handleClick}>
        Get Audio
      </button>
    </div>
  );
};

export default App;
