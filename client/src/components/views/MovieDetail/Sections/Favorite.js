import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Favorite(props) {

	const [FavoriteNumber, setFavoriteNumber] = useState(0);
	const [Favorited, setFavorited] = useState(false);

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
					setFavoriteNumber(res.data.favoriteNumber)
				} else {
					alert('숫자 정보를 가져오는 데 실패 했습니다.')
				}
			})

		Axios.post('/api/favorite/favorited', variables)
			.then(res => {
				if (res.data.success) {
					console.log(res.data)
					setFavorited(res.data.favorited)
			} else {
				alert('정보를 가져오는 데 실패 했습니다.')
			} 
		})
	}, []);


	return (
		<div>
			<div>
			{Favorited ? <AiFillHeart style={{ color: 'pink', fontSize: '40px'}} />
				: <AiOutlineHeart style={{ color: 'pink', fontSize: '40px'}} />}
			</div>
			<div>
				{FavoriteNumber} likes 
			</div>
		</div>
	)
}

export default Favorite