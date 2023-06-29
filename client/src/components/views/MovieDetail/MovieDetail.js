import React, { useEffect, useState } from 'react'

import { API_URL, API_AUTHOR, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Button, Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

	const movieId = props.match.params.movieId
	const [Movie, setMovie] = useState([]);
	const [Casts, setCasts] = useState([]);
	const [ActorToggle, setActorToggle] = useState(false);
	const [LoadingForMovie, setLoadingForMovie] = useState(true);
	const [LoadingForCast, setLoadingForCast] = useState(true);

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
				setLoadingForMovie(false)
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
				setLoadingForCast(false)
			})
			.catch(err => console.error('error:' + err));
	}

	const toggleActorView = () => {
		setActorToggle(!ActorToggle)
	}

	return (
		<div>

			{/*Header*/}

			{!LoadingForMovie ?
				<MainImage
					image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
					title={Movie.original_title}
					overview={Movie.overview}
				/>
				:
				<div>loading..</div>
			}

			{/*Body*/}
			<div style={{ width: '85%', margin: '1rem auto' }}>

				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					{!LoadingForMovie && <Favorite movie={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>}
				</div>

				{/* Movie Info */}
				{!LoadingForMovie ?
					<MovieInfo movie={Movie} />
					:
					<div>loading..</div>
				}
				
				<br />
				{/* Actors Grid */}

				<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
					<Button onClick={toggleActorView}>Toggle Actor View</Button>
				</div>

				{ActorToggle &&
					<Row gutter={[16, 16]}>
						{!LoadingForCast &&
							Casts.map((cast, index) => (
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