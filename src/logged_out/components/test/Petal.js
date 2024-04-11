// import React from 'react';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   petal: {
//     cursor: 'pointer',
//     transition: 'fill 0.3s ease',
//     '&:hover': {
//       fill: 'rgba(255, 255, 255, 0.7)', // Lighten the petal color on hover
//     },
//   },
// }));

// const Petal = ({ scale = 1, label, onDoubleClick }) => {
//     const classes = useStyles();
  
//     // Use the scale prop to adjust the size of each petal
//     const petalStyle = {
//       transform: `scale(${scale})`,
//       transformOrigin: 'center',
//     };
  
//     return (
//       <svg width="100" height="100" className={classes.petal} style={petalStyle} onDoubleClick={onDoubleClick}>
//         <path
//           d="M50,50 L75,0 Q50,-50 25,0 L50,50" // Placeholder path
//           fill="rgba(255, 0, 0, 0.5)" // Semi-transparent red fill
//           stroke="black"
//           strokeWidth="1"
//         />
//         <text x="50" y="50" textAnchor="middle" fill="black">{label}</text>
//       </svg>
//     );
//   };
  
//   export default Petal;


// Petal.js
import React from 'react';

const Petal = ({ size, label }) => {
  return (
    <svg width={100 * size} height={100 * size} style={{ border: '1px solid black' }}>
      <circle cx={50 * size} cy={50 * size} r={40 * size} fill="red" />
      <text x={50 * size} y={50 * size} textAnchor="middle" fill="white">
        {label}
      </text>
    </svg>
  );
};

export default Petal;
