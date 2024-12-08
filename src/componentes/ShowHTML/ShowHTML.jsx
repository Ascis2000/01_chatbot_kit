
import React from 'react';

// Función para procesar texto y convertir URLs en enlaces HTML
const parseTextWithLinks = (text) => {

	
	if (typeof text !== 'string' || !text) {console.log(text)
		return null; // Retorna `null` si el texto no es válido
	  }
	  alert(text)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) =>
    urlRegex.test(part) ? (
      <a 
        key={`link-${index}`} 
        href={part} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {part}
      </a>
    ) : (
      <span key={`text-${index}`}>{part}</span>
    )
  );
};

const ShowHTML = ({ customHTML }) => {
  return (
    <div className="custom-html-widget">
      {parseTextWithLinks(customHTML)}
    </div>
  );
};

export default ShowHTML;
