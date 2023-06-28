import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_AUTHOR, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import { Row, Button } from 'antd';

function LandingPage() {
    const [Movies, setMoives] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const url = `${API_URL}movie/popular?language=en-US&page=1`;
        fetchMovies(url);

    }, [])

    const fetchMovies = (url) => {
        const fetch = require('node-fetch');
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${API_AUTHOR}`
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                console.log(res.results)
                setMoives([...Movies, ...res.results])
                setMainMovieImage(res.results[0])
                setCurrentPage(res.page)
            })
            .catch(err => console.error('error:' + err));
    }

    const loadMoreItems = () => {
        const url = `${API_URL}movie/popular?language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(url)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/*Main Image */}

            {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    overview={MainMovieImage.overview}
                />}

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={loadMoreItems}> Load More </Button>
            </div>
        </div>
    )
}

export default LandingPage
