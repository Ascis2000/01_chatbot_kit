
import React, { useEffect, useState } from 'react';

const Users = () => {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/api/users')
			.then((res) => res.json())
			.then((data) => {
				console.log(data.length)
				setImageUrl(data);
			});
	}, []);

	return (
		<div>
      {imageUrl.length > 0 ? (
        imageUrl.map((item, index) => (
          <div key={index}>
            <p>{item.pais}</p>
            <p>{item.genero}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
	);
};

export default Users;