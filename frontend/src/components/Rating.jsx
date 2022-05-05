//===================================================================================================================================================================//
//                                                                         Rating Component                                                                          //
//===================================================================================================================================================================//

import React from 'react';

//===================================================================================================================================================================//

// Displays a row of 5 stars as a rating system with some empty or filled based on the rating number.
const Rating = ({ value, text, color }) => {

    return (
        <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
                <span key={ i }>
                    <i style={{ color }} className={
                        value >= i + 1 
                            ? 'fas fa-star' 
                            : value >= (i + 1) - 0.5 
                            ? 'fas fa-star-half-alt' 
                            : 'far fa-star'
                    }>
                    </i>
                </span>
            ))}
            <span>{ text && text }</span>
        </div>
    )
};

//===================================================================================================================================================================//

Rating.defaultProps = {
    color: "#F8E825"
};

//===================================================================================================================================================================//

export default Rating;