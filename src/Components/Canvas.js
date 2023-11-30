import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Your drawing code goes here
        context.fillStyle = 'green';
        context.fillRect(10, 10, 100, 100);

        // Cleanup (optional)
        return () => {
            // Perform cleanup if needed
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <canvas
            ref={canvasRef}
            width={800} // Set canvas width
            height={600} // Set canvas height
            style={{ border: '1px solid black' }} // Optional: Add styling to the canvas
        ></canvas>
    );
};

export default CanvasComponent;
