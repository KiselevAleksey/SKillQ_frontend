// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
// import Petal from './Petal'; // This would be a component you create

// const PetalDiagram = ({ userData, petalData }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedPetal, setSelectedPetal] = useState(null);

//   const handlePetalDoubleClick = (petal) => {
//     setSelectedPetal(petal);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Ensure petalData is an array before calling map
//   const petalElements = Array.isArray(petalData)
//     ? petalData.map((petal, index) => (
//         <Petal
//           key={index}
//           size={petal.size}
//           label={petal.label}
//           onDoubleClick={() => handlePetalDoubleClick(petal)}
//         />
//       ))
//     : null;

//   return (
//     <div className="petal-diagram">
//       <img src={userData?.photoUrl || 'default-image.png'} alt="User" className="center-image" />
//       {petalElements}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{selectedPetal?.label}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {selectedPetal?.content}
//           </DialogContentText>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PetalDiagram;


import React from 'react';
import Petal from './Petal'; // This assumes you have a Petal component

const PetalDiagram = ({ petalData }) => {
  // Render the petals only if petalData is an array
  const petalElements = Array.isArray(petalData)
    ? petalData.map((petal, index) => (
        <Petal
          key={index}
          size={petal.size}
          label={petal.label}
        />
      ))
    : null;

  return (
    <div className="petal-diagram">
      <h1>Petal Diagram</h1>
      {petalElements}
      <h1>Petal Diagram 2.0</h1>

    </div>
  );
};

export default PetalDiagram;
