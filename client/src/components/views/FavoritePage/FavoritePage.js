import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Button } from 'antd'

function FavoritePage() {

	const [Favorites, setFavorites] = useState([]);

	useEffect(() => {
		Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
			.then(res => {
				if (res.data.success) {
					console.log(res.data)
					setFavorites(res.data.favorites)
				} else {
					alert('영화 정보를 가져오는 데 실패하였습니다.')
				}
			})
	}, [])


	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h2> Favorite Movies </h2>
			<hr />

			<table>
				<thead>
					<tr>
						<th>Movie Title</th>
						<th>Movie RunTime</th>
						<th>Remove from favorites</th>
					</tr>
				</thead>
				<tbody>

				{Favorites.map((favorite, index) => (
					<tr key={index}>
						<td>{favorite.movieTitle}</td>
						<td>{favorite.movieRunTime} mins</td>
						<td><Button>Remove</Button></td>
					</tr>
				))}

				</tbody>
			</table>
		</div>
	)
}

export default FavoritePage