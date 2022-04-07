import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({value, text, color}) => {

    return (
        <div className="rating">
            {Array.from({length: 5}, (_, i) => (
                <span>
                    <i style={{color}} className={
                        value >= i + 1 
                            ? 'fas fa-star' 
                            : value >= (i + 1) - 0.5 
                            ? 'fas fa-star-half-alt' 
                            : 'far fa-star'
                    }>
                    </i>
                </span>
            ))}
            <span>{text && text}</span>
        </div>
    )
};

Rating.defaultProps = {
    color: "#F8E825"
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default Rating;