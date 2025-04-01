import React, { useState, useCallback, useRef } from "react";
import ReactFlow, { Background, Handle } from "reactflow";
import "reactflow/dist/style.css";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "../../../icons/UndoIcon";
import RedoIcon from "../../../icons/RedoIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import Header from "./Header";
import CustomControls from "./CustomControls";
import ApiCallConfig from "./ApiCallConfig";
import EmailConfig from "./EmailConfig";
import TextboxConfig from "./TextboxConfig";
import { useNavigate } from "react-router";

const nodeStyles = {
    start: {
        background: "#8A9A5B",
        color: "#F8F2E7",
        border: "6px solid",
        borderRadius: "50%",
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 0 0 6px #5C7045",
    },
    end: {
        background: "#E53030",
        color: "#F8F2E7",
        border: "6px solid",
        borderRadius: "50%",
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 0 0 6px #A61C1C",
    },
    step: {
        background: "white",
        color: "black",
        border: "1px solid #779455",  // Greenish border
        borderRadius: "10px",
        width: 140,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "normal",
        fontSize: "14px",
        fontFamily: "Poppins",
        boxShadow: "inset 0 0 0 1px #779455", // Inner border effect
        position: "relative",
        cursor: "pointer",
    },
    plus: {
        background: "white",
        color: "black",
        border: "2px solid black",
        borderRadius: "50%",
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

// Custom Plus Node Component
const PlusNode = ({ id, onClick }) => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => setShowOptions(!showOptions);
    const handleSelect = (type) => {
        onClick(id, type);
        setShowOptions(false);
    };

    return (
        <div style={{ position: "relative" }}>
            <div style={nodeStyles.plus} onClick={toggleOptions}>
                +
                <Handle type="target" position="top" />
                <Handle type="source" position="bottom" />
            </div>

            {showOptions && (
                <div style={speechBubbleStyle}>
                    <div style={arrowStyle}></div>
                    <button style={optionButtonStyle} onClick={() => handleSelect("API Call")}>API Call</button>
                    <button style={optionButtonStyle} onClick={() => handleSelect("Email")}>Email</button>
                    <button style={{ ...optionButtonStyle, gridColumn: "span 2" }} onClick={() => handleSelect("Textbox")}>Text Box</button>
                </div>
            )}
        </div>
    );
};


const speechBubbleStyle = {
    position: "absolute",
    top: "50px",
    left: "-10px",
    background: "white",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
    display: "grid",
    gridTemplateColumns: "repeat(2, auto)", // Two columns layout
    gap: "8px",
    width: "auto",
    whiteSpace: "nowrap",
    zIndex: 10,
};

const arrowStyle = {
    position: "absolute",
    top: "-5px",
    left: "20px",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid white",
};

const optionButtonStyle = {
    background: "white",
    border: "1px solid black",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s ease",
    textAlign: "center",
    minWidth: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

optionButtonStyle[":hover"] = {
    background: "#f0f0f0",
};



const StepNode = ({ id, data, onDeleteNode, onSelectNode }) => (
    <div style={{ ...nodeStyles.step, paddingRight: "30px" }} onClick={() => onSelectNode(id)}>
        {data.label}
        <IconButton
            onClick={() => onDeleteNode(id)}
            style={{
                position: "absolute",
                right: 5,
                top: "50%",
                transform: "translateY(-50%)",
                color: "red",
            }}
        >
            <DeleteIcon fontSize="small" />
        </IconButton>
        <Handle type="target" position="top" />
        <Handle type="source" position="bottom" />
    </div>
);

const WorkflowCanvas = () => {
    const navigate = useNavigate();
    const initialNodes = [
        { id: "start", type: "startNode", position: { x: 250, y: 50 }, data: { label: "Start" } },
        { id: "plus-1", type: "plusNode", position: { x: 275, y: 140 } },
        { id: "end", type: "endNode", position: { x: 250, y: 300 }, data: { label: "End" } },
    ];

    const initialEdges = [
        { id: "e-start-plus-1", source: "start", target: "plus-1", type: "smoothstep" },
        { id: "e-plus-1-end", source: "plus-1", target: "end", type: "smoothstep" },
    ];

    const [history, setHistory] = useState([{ nodes: initialNodes, edges: initialEdges }]);
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [idCounter, setIdCounter] = useState(2);
    const [selectedNode, setSelectedNode] = useState(null);

    const nodes = history[currentStep]?.nodes || initialNodes;
    const edges = history[currentStep]?.edges || initialEdges;
    const MAX_HISTORY = 20;

    console.log(selectedNode);
    const handleGoBack =()=>{
        navigate("/listView");
    }

    const handleSelectNode = (nodeId) => {
        const node = nodes.find((n) => n.id === nodeId);
        if (node?.type === "apiCallNode") {
            setSelectedNode(node);
        } else if (node?.type === "emailNode") {
            setSelectedNode(node);
        } else if (node?.type === "textboxNode") {
            setSelectedNode(node);
        } else {
            setSelectedNode(null); // Hide if another node is clicked
        }
    };

    const updateHistory = (newNodes, newEdges) => {
        let newHistory = history.slice(Math.max(0, history.length - MAX_HISTORY), currentStep + 1);
        newHistory.push({ nodes: newNodes, edges: newEdges });

        setHistory(newHistory);
        setCurrentStep(newHistory.length - 1);
    };

    const formatLabel = (type) => {
        return type.replace(/([A-Z][a-z])/g, " $1").trim();
    };

    const onAddNode = useCallback(
        (plusNodeId, type) => {
            const plusNode = nodes.find((node) => node.id === plusNodeId);
            if (!plusNode) return;

            setIdCounter((prev) => {
                const formattedType = type
                    .toLowerCase()
                    .split(" ")
                    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
                    .join("");
                const newNodeId = `${formattedType}-${prev + 1}`;
                const newPlusId = `plus-${prev + 1}`;

                const newNode = {
                    id: newNodeId,
                    type: `${formattedType}Node`,
                    position: { x: plusNode.position.x, y: plusNode.position.y + 80 },
                    data: { label: formatLabel(type), method: "GET", url: "", headers: "", body: "" }, // Default API Call data
                };

                const newPlusNode = {
                    id: newPlusId,
                    type: "plusNode",
                    position: { x: plusNode.position.x, y: plusNode.position.y + 150 },
                };

                const updatedEndNode = {
                    ...nodes.find((node) => node.id === "end"),
                    position: { x: plusNode.position.x, y: plusNode.position.y + 200 },
                };

                const newNodes = [...nodes, newNode, newPlusNode].map((node) =>
                    node.id === "end" ? updatedEndNode : node
                );

                const newEdges = [
                    ...edges.filter((edge) => edge.target !== "end"),
                    { id: `e-${plusNodeId}-${newNodeId}`, source: plusNodeId, target: newNodeId, type: "smoothstep" },
                    { id: `e-${newNodeId}-${newPlusId}`, source: newNodeId, target: newPlusId, type: "smoothstep" },
                    { id: `e-${newPlusId}-end`, source: newPlusId, target: "end", type: "smoothstep" },
                ];

                updateHistory(newNodes, newEdges);
                return prev + 1;
            });
        },
        [nodes, edges]
    );

    const onUpdateNode = (nodeId, updatedData) => {
        setHistory((prevHistory) => {
            const updatedNodes = prevHistory[currentStep].nodes.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...updatedData } } : node
            );
    
            const newHistory = [
                ...prevHistory.slice(0, currentStep + 1), 
                { nodes: updatedNodes, edges: prevHistory[currentStep].edges }
            ];
    
            return newHistory;
        });
    
        setCurrentStep((prev) => prev + 1); // Move forward in history
    };
    
    
    



    const undo = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const redo = () => {
        if (currentStep < history.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };


    const onDeleteNode = useCallback(
        (nodeId) => {
            const nodeToDelete = nodes.find((node) => node.id === nodeId);
            if (!nodeToDelete) return;

            let newNodes = nodes.filter((node) => node.id !== nodeId);
            let newEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

            if (nodeId.startsWith("step-")) {
                const incomingEdge = edges.find(edge => edge.target === nodeId);
                const outgoingEdge = edges.find(edge => edge.source === nodeId);

                if (incomingEdge && outgoingEdge) {
                    newEdges.push({
                        id: `e-${incomingEdge.source}-${outgoingEdge.target}`,
                        source: incomingEdge.source,
                        target: outgoingEdge.target,
                        type: "smoothstep",
                    });
                }

                // Remove associated plus node
                const plusNodeId = `plus-${nodeId.split('-')[1]}`;
                newNodes = newNodes.filter(node => node.id !== plusNodeId);
                newEdges = newEdges.filter(edge => edge.source !== plusNodeId && edge.target !== plusNodeId);
            }

            // If no step nodes remain, reconnect Start to End
            const remainingStepNodes = newNodes.filter(node => node.id.startsWith("step-"));
            if (remainingStepNodes.length === 0) {
                newEdges.push({ id: "e-start-end", source: "start", target: "end", type: "smoothstep" });
            }

            updateHistory(newNodes, newEdges);
        },
        [nodes, edges]
    );

    const nodeTypes = {
        plusNode: (props) => <PlusNode {...props} onClick={onAddNode} />,
        startNode: ({ data }) => (
            <div style={nodeStyles.start}>
                {data.label}
                <Handle type="source" position="bottom" />
            </div>
        ),
        endNode: ({ data }) => (
            <div style={nodeStyles.end}>
                {data.label}
                <Handle type="target" position="top" />
            </div>
        ),
        apiCallNode: (props) => <StepNode {...props} onSelectNode={handleSelectNode} onDeleteNode={onDeleteNode} />,
        emailNode: (props) => <StepNode {...props} onSelectNode={handleSelectNode} onDeleteNode={onDeleteNode} />,
        textboxNode: (props) => <StepNode {...props} onSelectNode={handleSelectNode} onDeleteNode={onDeleteNode} />,
    };


    return (
        <div ref={reactFlowWrapper} style={{ height: "100vh", width: "100vw", background: "#F8F2E7" }}>
            <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
                <Header
                    onGoBack={handleGoBack}
                    //   title={title}
                    onSave={() => alert("Workflow Saved!")}
                />

            </div>
            {/* Styled Undo & Redo Buttons */}
            <div style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                background: "white",
                border: "2px solid #E0E0E0",
                borderRadius: "12px",
                padding: "5px",
            }}>
                <IconButton
                    onClick={undo}
                    disabled={currentStep === 0}
                    style={{
                        background: "white",
                        borderRadius: "10px 0 0 10px",
                        borderRight: "1px solid #E0E0E0",
                        width: 35,
                        height: 35,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: currentStep === 0 ? "not-allowed" : "pointer",
                        opacity: currentStep === 0 ? 0.5 : 1,
                    }}
                >
                    <UndoIcon />
                </IconButton>

                <IconButton
                    onClick={redo}
                    disabled={currentStep === history.length - 1}
                    style={{
                        background: "white",
                        borderRadius: "0 10px 10px 0",
                        width: 35,
                        height: 35,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: currentStep === history.length - 1 ? "not-allowed" : "pointer",
                        opacity: currentStep === history.length - 1 ? 0.5 : 1,
                    }}
                >
                    <RedoIcon />
                </IconButton>
            </div>

            {/* Zoom Control Bar */}
            <CustomControls reactFlowInstance={reactFlowInstance} />
            {selectedNode && selectedNode.type === "apiCallNode" && (
                <div
                    style={{
                        position: "absolute",
                        left: selectedNode.position.x + 150, // Adjust X offset
                        top: selectedNode.position.y - 50, // Adjust Y offset
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 10,
                        minWidth: "250px",
                    }}
                >
                    <ApiCallConfig
  selectedNode={selectedNode}
  onUpdateNode={(updatedData) => {
    if (!selectedNode) {
      console.error("Error: selectedNode is undefined!");
      return;
    }
    onUpdateNode(selectedNode.id, updatedData);
  }}
/>
                </div>
            )}

            {selectedNode && selectedNode.type === "emailNode" && (
                <div
                    style={{
                        position: "absolute",
                        left: selectedNode.position.x + 150, // Adjust X offset
                        top: selectedNode.position.y - 50, // Adjust Y offset
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 10,
                        minWidth: "250px",
                    }}
                >
                    <EmailConfig selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
                </div>
            )}

            {selectedNode && selectedNode.type === "textboxNode" && (
                <div
                    style={{
                        position: "absolute",
                        left: selectedNode.position.x + 150, // Adjust X offset
                        top: selectedNode.position.y - 50, // Adjust Y offset
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 10,
                        minWidth: "250px",
                    }}
                >
                    <TextboxConfig selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
                </div>
            )}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                ref={reactFlowWrapper}
                onInit={setReactFlowInstance}
                fitView
                nodeTypes={nodeTypes}
            >
                <Background color="#E7D8C5" gap={12} />
            </ReactFlow>

        </div>
    );
};

export default WorkflowCanvas;
