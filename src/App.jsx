import { useState } from 'react'
import './App.css'

import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
//import './assets/css/chatbot/custom-chatbot-kit.css'; 
import './css/chatbot/custom-chatbot-kit.css'; 

import config from './elementos/bot/config/config.jsx';
import MessageParser from './elementos/bot/MessageParser/MessageParser.jsx';
import ActionProvider from './elementos/bot/ActionProvider/ActionProvider.jsx';

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div>
				<div>
				<Chatbot
					config={config}
					messageParser={MessageParser}
					actionProvider={ActionProvider}
				/>
				</div>
			</div>
		</>
	)
}

export default App
