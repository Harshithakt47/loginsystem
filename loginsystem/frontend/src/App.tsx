// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
//////////

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Homepage from "./pages/Homepage";
// import Form from "./pages/Form";
// import Profile from "./pages/Profile"; // For Profile section

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/homepage" element={<Homepage />} /> {/* New homepage */}
//         <Route path="/form" element={<Form />} /> {/* New form page */}
//         <Route path="/profile" element={<Profile />} /> {/* New profile page */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
//////
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from './pages/Homepage';
import Form from "./pages/Form";
import Profile from "./pages/Profile"; // For Profile section

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} /> {/* Ensure this path is used in redirection */}
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
