import React from 'react'
import { Col } from 'antd';

function GridCards(props) {

  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/movie/${props.movieId}`}>
            <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
          </a>
        </div>
      </Col>
    )
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img style={{ width: '100%', height: '320px' }} src={props.image ? props.image : 'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'} alt={props.castName} />
          <div style={{ textAlign: 'center' }}>{props.castName}</div>
        </div>
      </Col>
    )
  }
}

export default GridCards