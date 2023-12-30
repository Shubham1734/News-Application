import React from 'react';
// import PropTypes from 'prop-types';

const truncateDescription = (description, limit) => {
  const words = description.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return description;
};
const truncateTitle = (title, limit) => {
  if (title.length > limit) {
    return title.slice(0, limit) + '...';
  }
  return title;
};

const Newsitem = ({ title, description, imageUrl, newsUrl, author, source, data }) => {
  const truncatedTitle = truncateTitle(title, 30);
  const truncatedDescription = truncateDescription(description, 20); // Change 20 to your desired word limit

  return (
    <div className='my-3'>
      <div className="card" style={{ width: '20rem' }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "80%", zIndex: '1', color: "white" }}>
          {source.name}
        </span>
        <img className="card-img-top" target="_blank" src={!imageUrl ? "https://assets.newatlas.com/dims4/default/31b914a/2147483647/strip/true/crop/2087x1096+0+148/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Feb%2Ffc%2Ff9bf5ee741de924a3fae90ae3d81%2Ffigure01-humanoid-2-2.png&na.image_optimisation=0" : imageUrl} alt="News" style={{ height: '150px', width: '100%', objectFit: 'cover' }} />
        <div className="card-body" style={{ height: '300px', overflow: 'hidden' }}> {/* Set a fixed height for the card body */}
          <h5 className="card-title">{truncatedTitle}</h5>
          <p className="card-text">{truncatedDescription}</p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More</a>
          <div className="card-footer text-body-primary my-2" style={{ backgroundColor: "#b7b0b0" }}>
            By {!author ? "Unknown" : author} on {new Date(data).toUTCString()}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Newsitem;
