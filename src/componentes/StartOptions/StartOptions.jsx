
/* import React from "react";

const StartOptions = (props) => {
  const handleUserClick = () => {
	props.actionProvider.handleUserResponse();
  };

  const handleProfessionalClick = () => {
	props.actionProvider.handleProfessionalResponse();
  };

  return (
	<div className="react-chatbot-kit-chat-bot-message-container">
	  <button onClick={handleUserClick}>Usuario</button>
	  <button onClick={handleProfessionalClick}>Profesional</button>
	</div>
  );
};

export default StartOptions; */


import React, { useState } from "react";

const StartOptions = (props) => {
	const [responses, setResponses] = useState([]); // Para almacenar las respuestas
	const [loading, setLoading] = useState(false); // Para controlar el estado de carga

	const handleUserClick = async () => {
		// 1. Primero, enviar el mensaje del bot indicando que se ha pulsado la opción
		props.actionProvider.handleUserResponse("usuario");

		// 2. Luego, simular la carga de datos de forma asíncrona
		setLoading(true);

		try {
			// Aquí haces la llamada a la API o la lógica para obtener las respuestas
			const userResponses = await getUserResponses(); // Simulación de obtención de datos

			// 3. Una vez que los datos estén disponibles, actualizar el estado
			setResponses(userResponses);
		} catch (error) {
			console.error("Error al obtener respuestas:", error);
		} finally {
			setLoading(false); // Al terminar la carga, poner el estado en false
		}
	};

	const handleProfessionalClick = async () => {
		// 1. Primero, enviar el mensaje del bot indicando que se ha pulsado la opción
		props.actionProvider.handleProfessionalResponse("profesional");

		// 2. Luego, simular la carga de datos de forma asíncrona
		setLoading(true);

		try {
			// Aquí haces la llamada a la API o la lógica para obtener las respuestas
			const professionalResponses = await getProfessionalResponses(); // Simulación de obtención de datos

			// 3. Una vez que los datos estén disponibles, actualizar el estado
			setResponses(professionalResponses);
		} catch (error) {
			console.error("Error al obtener respuestas:", error);
		} finally {
			setLoading(false); // Al terminar la carga, poner el estado en false
		}
	};

	// Función para simular la obtención de respuestas de "Usuario"
	const getUserResponses = async () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					{ id: 1, text: "Opción 1 de Usuario" },
					{ id: 2, text: "Opción 2 de Usuario" },
					{ id: 3, text: "Opción 3 de Usuario" },
				]);
			}, 2000); // Simulamos 2 segundos de espera para obtener los datos
		});
	};

	// Función para simular la obtención de respuestas de "Profesional"
	const getProfessionalResponses = async () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					{ id: 1, text: "Opción 1 de Profesional" },
					{ id: 2, text: "Opción 2 de Profesional" },
					{ id: 3, text: "Opción 3 de Profesional" },
				]);
			}, 2000); // Simulamos 2 segundos de espera para obtener los datos
		});
	};

	const handleResponseClick = (response) => {
		console.log("Respuesta seleccionada:", response);
	};

	return (
		<div>
			{/* Mostrar los botones solo si no hay respuestas */}
			{!responses.length ? (
				<>
					<button onClick={handleUserClick} disabled={loading}>
						Usuario
					</button>
					<button onClick={handleProfessionalClick} disabled={loading}>
						Profesional
					</button>
				</>
			) : (
				// Si hay respuestas, mostramos los botones de las respuestas obtenidas
				<div>
					{responses.map((response) => (
						<button key={response.id} onClick={() => handleResponseClick(response)}>
							{response.text}
						</button>
					))}
				</div>
			)}

			{/* Opcional: Mostrar un mensaje de carga */}
			{loading && <p>Recuperando opciones...</p>}
		</div>
	);
};

export default StartOptions;
