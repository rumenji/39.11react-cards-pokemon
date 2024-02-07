import React, {useState} from "react";

const useToggleFlip = (initialState = true) => {
    const [isFacingUp, setIsFacingUp] = useState(initialState);
    const toggleFacingUp = () => {
        setIsFacingUp(isFacingUp => !isFacingUp)
    }
    return [isFacingUp, toggleFacingUp]
}

export default useToggleFlip;