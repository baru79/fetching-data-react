import { Suspense, useEffect, useState } from 'react';
import './App.css';
import { URL } from './const';
import { fetchData } from './fetchData';
import useFetch from './useFetch';

// Option 1: using useState, useEffect without custom hook

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => setUsers(data));
	}, []);

	return (
		<div className='App'>
			<h1>Fetching like a Pro</h1>
			<ul className='card'>
				{users.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}

// Option 2: using useFetch custom hook
// Option 2.1: Basic
// Option 2.2: With loading
// Option 2.3: With loading and error
// Option 2.4: With loading, error and abortController

// function App() {
// 	const { users, error, loading, handleCancelRequest } = useFetch({ url: URL });

// 	return (
// 		<div className='App'>
// 			<h1>Fetching like a Pro</h1>
// 			<button onClick={handleCancelRequest}>Cancel Request</button>
// 			<ul className='card'>
// 				{error && <li>{error}</li>}
// 				{loading && <li>Loading...</li>}
// 				{users.map(user => (
// 					<li key={user.id}>{user.name}</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

// Option 3: Pro Version - Render as you fetch

// const apiData = fetchData(URL);

// function App() {
// 	const users = apiData.read();
// 	return (
// 		<div className='App'>
// 			<h1>Fetching like a Pro</h1>
// 			<Suspense fallback={<div>Loading...</div>}>
// 				<ul className='card'>
// 					{users.map(user => (
// 						<li key={user.id}>{user.name}</li>
// 					))}
// 				</ul>
// 			</Suspense>
// 		</div>
// 	);
// }

export default App;
