import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Favorite(props) {

	const [FavoriteNumber, setFavoriteNumber] = useState(0);
	const [Favorited, setFavorited] = useState(false);

	const userFrom = props.userFrom
	const movieId = props.movieId
	const movieTitle = props.movie.title
	const moviePost = props.movie.backdrop_path
	const movieRunTime = props.movie.runtime

	let variables = {
		userFrom, //누가
		movieId, //무엇을
		movieTitle,
		moviePost,
		movieRunTime
	}

	useEffect(() => {

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

	const onClickFavorite = () => {
		if (Favorited) {
			Axios.post('/api/favorite/removeFromFavorite', variables)
				.then(res => {
					if (res.data.success) {
						console.log(res.data)
						setFavoriteNumber(FavoriteNumber - 1)
						setFavorited(!Favorited)
					} else {
						alert('removeFromFavorite이 실패했습니다.')
					}
				})
		} else {
			Axios.post('/api/favorite/addToFavorite', variables)
				.then(res => {
					if (res.data.success) {
						console.log(res.data)
						setFavoriteNumber(FavoriteNumber + 1)
						setFavorited(!Favorited)
					} else {
						alert('addToFavorite이 실패했습니다.')
					}
				})
		}
	}


	return (
		<div>
			<div>
				{Favorited ? <AiFillHeart onClick={onClickFavorite} style={{ color: 'pink', fontSize: '40px', cursor: 'pointer' }} />
					: <AiOutlineHeart onClick={onClickFavorite} style={{ color: 'pink', fontSize: '40px', cursor: 'pointer' }} />}
			</div>
			<div>
				{FavoriteNumber} likes
			</div>
		</div>
	)
}

export default Favorite