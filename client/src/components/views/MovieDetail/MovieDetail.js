import React, { useEffect, useState } from 'react'

import { API_URL, API_AUTHOR, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

	let movieId = props.match.params.movieId
	const [Movie, setMovie] = useState([]);
	const [Casts, setCasts] = useState([]);
	const [ActorToggle, setActorToggle] = useState(false);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `${API_AUTHOR}`
			}
		};

		const infoUrl = `${API_URL}movie/${movieId}?language=en-US`;
		const castUrl = `${API_URL}movie/${movieId}/credits?language=en-US`;

		fetchMovieInfo(infoUrl, options)
		fetchCasts(castUrl, options)
	}, []);

	const fetchMovieInfo = (url, options) => {
		const fetch = require('node-fetch');
		fetch(url, options)
			.then(res => res.json())
			.then(json => {
				console.log(json)
				setMovie(json)
			})
			.catch(err => console.error('error:' + err));
	}

	const fetchCasts = (url, options) => {
		const fetch = require('node-fetch');
		fetch(url, options)
			.then(res => res.json())
			.then(json => {
				console.log(json.cast)
				setCasts(json.cast)
			})
			.catch(err => console.error('error:' + err));
	}

	const toggleActorView = () => {
		setActorToggle(!ActorToggle)
	}

	return (
		<div>

			{/*Header*/}

			{Movie.length !== 0 && <MainImage
				image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
				title={Movie.original_title}
				overview={Movie.overview}
			/>}

			{/*Body*/}
			<div style={{ width: '85%', margin: '1rem auto' }}>

				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Favorite movie={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
				</div>

				{/* Movie Info */}

				<MovieInfo movie={Movie} />

				<br />
				{/* Actors Grid */}

				<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
					<button onClick={toggleActorView}>Toggle Actor View</button>
				</div>

				{ActorToggle && <Row gutter={[16, 16]}>
					{Casts && Casts.map((cast, index) => (
						<React.Fragment key={index}>
							<GridCards
								image={cast.profile_path ?
									`${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
								castName={cast.name}
							/>
						</React.Fragment>
					))}
				</Row>}

			</div>


		</div>
	)
}

export default MovieDetail