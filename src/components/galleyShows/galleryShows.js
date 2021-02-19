import React from 'react';

const GalleryShows = ({ shows, handleButtonClick, baseImgURL }) => {
  const getNewDate = date => {
    const newDate = new Date(date);
    const monthStrign = new Array(
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    );
    const month = monthStrign[newDate.getMonth()];
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return month + ' ' + (day + 1) + ', ' + year;
  };

  return (
    <main>
      <section className="cards">
        {shows.map(show => (
          <div
            key={show.id}
            className="card"
            onClick={() => handleButtonClick(`/gallery/show/${show.id}`)}
          >
            <div className="card__image-container">
              <img
                src={`${baseImgURL}/original/${show.poster_path}`}
                alt="Detailed image description would go here."
              />
            </div>
            <div className="card__content">
              <p className="card__title text--medium text--title">
                {show.name}{' '}
              </p>
              <div className="card__info">
                <p className="text--medium">
                  {getNewDate(show.first_air_date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default GalleryShows;
