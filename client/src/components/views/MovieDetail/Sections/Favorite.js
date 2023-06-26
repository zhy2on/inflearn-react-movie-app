import React, { useEffect } from 'react'
import Axios from 'axios';

function Favorite(props) {

	useEffect(() => {

		const userFrom = props.userFrom
		const movieId = props.movieId
		const movieTitle = props.movie.title
		const moviePost = props.movie.backdrop_path
		const movieRunTime = props.movie.runtime

		let variables = {
			userFrom, //누가
			movieId //무엇을
		}

		Axios.post('/api/favorite/favoriteNumber', variables)
			.then(res => {
				if (res.data.success) {
					console.log(res.data)
				} else {
					alert('숫자 정보를 가져오는 데 실패 했습니다.')
				}
			})

		Axios.post('/api/favorite/favorited', variables)
			.then(res => {
				if (res.data.success) {
					console.log(res.data)
			} else {
				alert('정보를 가져오는 데 실패 했습니다.')
			} 
		})
	}, []);


	return (
		<button>Favorite</button>
	)
}

export default Favorite