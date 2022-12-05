import React from 'react';
import PropTypes from 'prop-types';

import './buttonStyle.css';

function Button({ buttonText, onClick, className, buttonType }) {
	return (
		<button onClick={onClick} className={className} type={buttonType}>
			{buttonText}
		</button>
	);
}

Button.propTypes = {
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
