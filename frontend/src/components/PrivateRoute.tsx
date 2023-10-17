import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({ authenticated, state, component: Component }) => {

//   if (state === authenticated) {
//       return Component;
//     } else {
//       if (state === 0) {
//         return <Navigate to="/main" />;
//       } else if (state === 1) {
//         return <Navigate to="/pmain" />;
//       } else if (state === 2) {
//         return <Navigate to="/" />;
//       }
//     }
// }

// 개발용
return (
  Component
)}

export default PrivateRoute;