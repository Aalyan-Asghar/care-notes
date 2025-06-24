    // components/Dialog.js
    import React from 'react';
    import './Dialog.css'; // Import your CSS for styling

    const Dialog = ({ isOpen, onClose, children }) => {
      if (!isOpen) return null; // Don't render if not open

      return (
        <div className="dialog-overlay">
          <div className="dialog-content">
            {children}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );
    };

    export default Dialog;