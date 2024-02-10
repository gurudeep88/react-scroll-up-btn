import React from 'react';

const ScrollUpButton =({text, onClick}) =>{
        return(
            <React.Fragment>
                <div>
                <p>Scroll Up</p>
                    <button 
                    onClick={onClick}
                    >
                        {text}
                    </button>
                </div>
            </React.Fragment>
        )
}

export default ScrollUpButton;