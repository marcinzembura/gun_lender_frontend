import React, { useState, useEffect } from 'react';
import GunsDataGridForm from '../components/GunsDataGridForm';

import NavbarAdmin from '../components/navbars/NavbarAdmin';

export default function GunsDataGrid() {
	const [hasAccess, setHasAccess] = useState(undefined);

	useEffect(() => {
		const fetchData = async () => {
			const result = true
			setHasAccess(result);
		};
		fetchData();
	});

	if (hasAccess === undefined) {
		return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			Ładuje strone...
		</div>;
	}
	return (
		<>
			<NavbarAdmin />
			<GunsDataGridForm />
		</>
	);
}
