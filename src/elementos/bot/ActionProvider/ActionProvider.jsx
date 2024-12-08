
import React from 'react';
import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

	const handleHello = () => {
		const messageWithProperties = createChatBotMessage('Hola. Encantad@ de conocerteeee', {
			payload: {},
			delay: 500,
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, messageWithProperties],
		}));
	};

	const handleStartOptions = () => {
		const botMessage = createChatBotMessage("Selecciona una opción:", {
			widget: "startOptions",
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleDog = () => {
		const botMessage = createChatBotMessage("Here's a nice dog picture for you!", {
			widget: 'dogPicture',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleGetUsers = () => {
		const botMessage = createChatBotMessage("Aquí están los usuarios:", {
			widget: 'getUsers',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleUserForm = () => {
		const botMessage = createChatBotMessage("Formulario:", {
			widget: 'showUserForm',
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};


	let currentQuestionId = 1; // Inicializamos el ID de la primera pregunta

const handleOptionSelection = async (option, texto) => {

	if (option === "profesional") {
		currentQuestionId = 6; 
	} else if (option === "usuario") {
			currentQuestionId = 1; 
	} else if (option) {
		currentQuestionId = option; // Asignar el valor de `nextQuestion`
	} else {
		throw new Error("No se encontró un valor válido para currentQuestionId");
	}
	
    // Mostrar mensaje del usuario reflejando la selección
    const userMessage = createClientMessage(`Mi selección es: "${texto}"`, {
		widget: 'showHTML',
        delay: 500,
    });

    setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, userMessage],
    }));

    // Estructura jerárquica de opciones con preguntas y varias respuestas
    const optionsMap = {
        profesional: {
            pregunta: "",
            respuestas: [],
        },
        usuario: {
            pregunta: "¿Cómo te gustaría comenzar?",
            respuestas: [],
        },
    };

    async function obtenerRespuestasPorPregunta(option) {
        try {
			console.log("id_pregunta==", option)
            const response = await fetch(`http://localhost:3000/api/preguntas/pr/${option}`);
            if (!response.ok) {
                throw new Error("Error al obtener las respuestas");
            }
            const respuestas = await response.json();

			currentQuestionId++

            return respuestas.map((res) => ({
                pregunta: res.pregunta,
                id: res.respuesta_id,
                texto: res.respuesta,
				nextQuestion: currentQuestionId++
            }));
        } catch (error) {
            console.error("Hubo un error:", error);
            return [];
        }
    }

    async function actualizarRespuestasPorPregunta(option) {
        const nuevosDatos = await obtenerRespuestasPorPregunta(option);
        if (nuevosDatos.length > 0) {
            optionsMap.profesional.pregunta = nuevosDatos[0].pregunta;
            optionsMap.profesional.respuestas = nuevosDatos;
        }
        return optionsMap.profesional; // Devuelve los datos actualizados
    }

    // Incrementar el ID de la pregunta para la próxima llamada
    const nextOptions = await actualizarRespuestasPorPregunta(currentQuestionId);

    if (nextOptions) {
        const { pregunta, respuestas } = nextOptions;

		if (respuestas.length !== 0){
			console.log(respuestas)
			const botMessage = createChatBotMessage(pregunta, {
				widget: "dynamicOptions",
				payload: { options: respuestas },
				delay: 500,
			});

			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, botMessage],
			}));
		}
		else if (respuestas.length === 0){
			const finalMessage = createChatBotMessage("Fin de la información.");
			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, finalMessage],
			}));

			const ayudaMessage = createChatBotMessage("¿Necesitas ayuda?");
			setState((prevState) => ({
				...prevState,
				messages: [...prevState.messages, ayudaMessage],
			}));
		}
    } else {
        // Si no hay más opciones, mostrar un mensaje por defecto
        const noMoreOptionsMessage = createChatBotMessage("No hay más opciones disponibles.");
        setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, noMoreOptionsMessage],
        }));
    }
};










	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						handleStartOptions,
						handleHello,
						handleDog,
						handleGetUsers,
						handleUserForm,
						handleOptionSelection,
					},
				});
			})}
		</div>
	);
};

export default ActionProvider;
