import { useEffect, useRef } from "react";

export function useOnDraw(onDraw){
    const canvasRef = useRef(null);
    const prevPointRef = useRef()
    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);


    useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        function computePointInCanvas(clientX, clientY){
            if(canvasRef.current){
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top
                }
            }else{
                return null;
            }
        }
        function initMouseMoveListener(){
            const mouseMoveListener = (e) => {
                if(isDrawingRef.current){
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    let prevPoint = prevPointRef.current;
                    if(onDraw) onDraw({ctx, point, prevPoint});
                    prevPointRef.current = point;
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }
        function initMouseUpListener(){
            const mouseUpListener=()=>{
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = mouseUpListener;
            window.addEventListener('mouseup', mouseUpListener);
        }
        function removeMouseEventListeners(){
            if(mouseMoveListenerRef.current){
                window.removeEventListener('mousemove', mouseMoveListenerRef.current);
            }
            if(mouseUpListenerRef.current){
                window.removeEventListener('mouseup', mouseUpListenerRef.current);
            }
        }
        
        initMouseMoveListener();
        initMouseUpListener();

        p.on("data", (data) => {
            console.log("data: " + JSON.parse(data), data, JSON.stringify(data));
            let decodedData =  JSON.parse((new TextDecoder("utf-8")).decode(data));
            if(Object.keys(decodedData.ctx).length){
                console.log('sec data', data, JSON.stringify(data));
                onDraw(data);
            }else{
                decodedData.ctx = ctx;
                console.log('first data', ctx, decodedData.ctx, decodedData, data, JSON.stringify(data));
                onDraw(decodedData);
            }
        });
        return ()=>{
            removeMouseEventListeners();
        }
    },[onDraw, p])

    function setCanvasRef(ref){
        if(!ref) return;
        canvasRef.current = ref;
    }
    
    function onMouseDown(){
        if(!canvasRef.current) return;
        isDrawingRef.current = true;
    }
    
    return {
        setCanvasRef,
        onMouseDown
    };
    // const canvasRef = useRef(null);
    // const isDrawingRef = useRef(false);
    // const mouseMoveListenerRef = useRef(null);
    // const mouseDownListenerRef = useRef(null);
    // const mouseUpListenerRef = useRef(null);

    // const prevPointRef = useRef()

    // useEffect(()=>{
    //     return ()=>{
    //         // if(mouseMoveListenerRef.current){
    //         //     window.removeEventListener('mousemove', mouseMoveListenerRef.current);
    //         // }
    //         // if(mouseUpListenerRef.current){
    //         //     window.removeEventListener('mouseup', mouseUpListenerRef.current);
    //         // }
    //     }
    // },[])

    // function setCanvasRef(ref){
    //     if(!ref) return;
    //     if(canvasRef.current){
    //         canvasRef.current.removeEventListener('mousedown', mouseDownListenerRef.current);
    //     }
    //     canvasRef.current = ref;
    //     initMouseMoveListener()
    //     initMouseDownListener();
    //     initMouseUpListener();
    // }
    // function initMouseMoveListener(){
    //     const mouseMoveListener = (e) => {
    //         console.log('isdr', isDrawingRef.current)
    //         if(isDrawingRef.current){
    //             const point = computePointInCanvas(e.clientX, e.clientY);
    //             const ctx = canvasRef.current.getContext('2d');
    //             if(onDraw) onDraw(ctx, point, prevPointRef.current);
    //             prevPointRef.current = point;
    //             console.log('point', point);
    //         }
    //     }
    //     mouseMoveListenerRef.current = mouseMoveListener;
    //     window.addEventListener("mousemove", mouseMoveListener);
    // }
    // function initMouseUpListener(){
    //     const mouseUpListener=()=>{
    //         isDrawingRef.current = false;
    //         prevPointRef.current = null;
    //     }
    //     mouseUpListenerRef.current = mouseUpListener;
    //     window.addEventListener('mouseup', mouseUpListener);
    // }
    // function initMouseDownListener(){
    //     if(!canvasRef.current) return;
    //     const mouseDownListener = () => {
    //         isDrawingRef.current = true;
    //     };
    //     mouseDownListenerRef.current = mouseDownListener;
    //     canvasRef.current.addEventListener('mousedown', mouseDownListener);
    // }
    // function computePointInCanvas(clientX, clientY){
    //     if(canvasRef.current){
    //         const boundingRect = canvasRef.current.getBoundingClientRect();
    //         return {
    //             x: clientX - boundingRect.left,
    //             y: clientY - boundingRect.top
    //         }
    //     }else{
    //         return null;
    //     }
    // }
    // return setCanvasRef;
}