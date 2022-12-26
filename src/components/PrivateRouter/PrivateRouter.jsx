import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getUserRole } from '../../selectors';

export const PrivateRouter = ({ children }) => {
	const role = useSelector(getUserRole);

	return role === 'admin' ? children : <Navigate to='/courses' />;
};
