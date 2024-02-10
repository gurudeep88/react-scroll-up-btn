import React from 'react';

const ScrollUpButton =({text, onClick, count}) =>{

        return(
            <React.Fragment>
                <div>
                <p>Scroll Up</p>
                    <button 
                    onClick={onClick}
                    style={{color: text ==='updates' ? 'yellow': 'red'}}
                    >
                        {text} {count}
                    </button>
                </div>
            </React.Fragment>
        )
}

export default ScrollUpButton;