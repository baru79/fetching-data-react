import { useEffect, useState } from 'react';

export default function useFetch({ url }) {
	// Option 2.1: Basic
	// const [users, setUsers] = useState([]);

	// useEffect(() => {
	//   fetch(url)
	//     .then((res) => res.json())
	//     .then((data) => setUsers(data))
	// }, []);
	//   return { users };

	// Option 2.2: With loading
	// const [users, setUsers] = useState([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	//   setLoading(true);
	//   fetch(url)
	//     .then((res) => res.json())
	//     .then((data) => setUsers(data))
	//     .finally(() => setLoading(false));
	// }, []);

	//   return { users, loading };

	// Option 2.3: With loading and error
	// const [users, setUsers] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);

	// useEffect(() => {
	//   setLoading(true);
	//   fetch(url)
	//     .then((res) => res.json())
	//     .then((data) => setUsers(data))
	//     .catch((error) => setError(error))
	//     .finally(() => setLoading(false));
	// }, []);

	//   return { users, loading, error };

	// Option 2.4: With loading, error and abortController
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [controller, setController] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		setController(abortController);
		setLoading(true);
		fetch(url, { signal: abortController.signal })
			.then(res => res.json())
			.then(data => setUsers(data))
			.catch(error => {
				if (error.name === 'AbortError') {
					console.log('Request cancelled');
				} else {
					setError(error);
				}
			})
			.finally(() => setLoading(false));

		return () => abortController.abort();
	}, []);

	const handleCancelRequest = () => {
		if (controller) {
			controller.abort();
			setError('Request cancelled');
		}
	};

	return { loading, error, handleCancelRequest, users };
}
