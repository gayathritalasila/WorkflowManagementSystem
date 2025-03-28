import React, { useState, useEffect } from "react";
import { IconButton, Slider } from "@mui/material";

const CustomControls = ({ reactFlowInstance }) => {
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        if (reactFlowInstance) {
            setZoom(reactFlowInstance.getZoom());
        }
    }, [reactFlowInstance]);

    const handleZoomChange = (_, newValue) => {
        setZoom(newValue);
        reactFlowInstance?.setViewport({ x: 0, y: 0, zoom: newValue }, { duration: 200 });
    };

    return (
        <div
            style={{
                position: "absolute",
                bottom: 10,
                left: "88%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                background: "white",
                borderRadius: 20,
                padding: "5px 10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
                zIndex: 10,
                pointerEvents: "auto"
            }}
        >
            {/* Reset View Button */}
            <IconButton
                onClick={() => reactFlowInstance?.setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 200 })}
                style={{
                    width: 30,
                    height: 30,
                    border: "2px solid #A0C15A",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 12,
                        height: 12,
                        background: "#A0C15A",
                        borderRadius: "50%",
                    }}
                />
            </IconButton>

            {/* Zoom Out Button */}
            <IconButton onClick={() => reactFlowInstance?.zoomOut()} style={{ margin: "0 5px" }}>
                -
            </IconButton>

            {/* Zoom Slider */}
            <Slider
                value={zoom}
                onChange={handleZoomChange}
                min={0.5}
                max={2}
                step={0.1}
                sx={{
                    width: 150,
                    color: "grey",
                    '& .MuiSlider-thumb': { width: 14, height: 14 },
                }}
            />

            {/* Zoom In Button */}
            <IconButton onClick={() => reactFlowInstance?.zoomIn()} style={{ margin: "0 5px" }}>
                +
            </IconButton>
        </div>
    );
};

export default CustomControls;
