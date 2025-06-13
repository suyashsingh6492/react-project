import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({ children, open, onClose, className = '' }) {

    const dialog = useRef();
    useEffect(() => {
        const modal=dialog.current;
        if (open) {
            modal.showModal();
        }
        return ()=>modal.close(); //clean up function 
        //the cleanup function will then only run once this value(open) changed at some point in the future.
    }, [open]);

    return createPortal(<dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> {children}</dialog>,
         document.getElementById('modal'));
}