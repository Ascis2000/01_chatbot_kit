
import React, { useState } from 'react';

const UserForm = ({ actionProvider }) => {
	const [pais, setPais] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = () => {
		// Aquí hacemos un fetch al servidor con los datos del formulario
		fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ pais, genero, orientacion, zip, edad }),
		})
			.then((response) => response.json())
			.then((data) => {
				// Llamar a una función para manejar la respuesta si es necesario
				console.log('Usuario creado:', data);
				// Enviar un mensaje al chatbot
				actionProvider.handleUserSubmit();
			})
			.catch((error) => console.error('Error:', error));
	};

	return (
		<div>
			<h3>Por favor, ingresa tus datos:</h3>
			<input
				type="text"
				placeholder="Nombre"
				value={pais}
				onChange={(e) => setPais(e.target.value)}
			/>
			<input
				type="email"
				placeholder="Correo electrónico"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button onClick={handleSubmit}>Enviar</button>
		</div>
	);
};

export default UserForm;
