import React, { useEffect, useState } from 'react'

import { API_URL, API_AUTHOR, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {

	let movieId = props.match.params.movieId
	const [Movie, setMovie] = useState([]);

	useEffect(() => {
		const fetch = require('node-fetch');

		const url = `${API_URL}movie/${movieId}?language=en-US`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `${API_AUTHOR}`
			}
		};

		fetch(url, options)
			.then(res => res.json())
			.then(json => {
				console.log(json)
				setMovie(json)
			})
			.catch(err => console.error('error:' + err));
	}, []);

	return (
		<div>

			{/*Header*/}

			<MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
				title={Movie.original_title}
				overview={Movie.overview}
			/>

			{/*Body*/}
			<div style={{ width: '85%', margin: '1rem auto' }}>

				{/* Movie Info */}

				<MovieInfo movie={Movie} />

				<br />
				{/* Actors Grid */}

				<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
					<button>Toggle Actor View</button>
				</div>

			</div>


		</div>
	)
}

export default MovieDetail