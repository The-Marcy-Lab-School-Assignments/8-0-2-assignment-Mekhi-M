/** @format */
import { handleFetch } from "../utils";

function GifSearch({ search, setSearch, setGifs }) {
	const handleSubmit = async e => {
		e.preventDefault();
		if (!search.length) return;
		const [data, error] = await handleFetch(`/api/gifs?search=${search}`);
		if (error) setErrorMessage(error.message);
		if (data) setGifs(data.data);
	};

	return (
		<form
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: "10px",
			}}>
			<label htmlFor='searchInput'>Enter a Search Term </label>
			<input
				type='text'
				className='form-control'
				id='searchInput'
				style={{ width: "50%" }}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<button
				type='submit'
				className='btn btn-success'
				onClick={handleSubmit}>
				Search
			</button>
		</form>
	);
}

export default GifSearch;
