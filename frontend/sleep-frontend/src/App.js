import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Form from './components/Form';
import Result from './Result'; // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/result" element={<Result />} />  {/* ✅ ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;
