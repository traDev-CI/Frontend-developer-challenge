import React from 'react';

const GalleryShows = ({ shows, handleButtonClick, baseImgURL }) => {
  
  //Get the date with the name of the month
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
                src={`${baseImgURL}/original/${show.poster_path}` ? `${baseImgURL}/original/${show.poster_path}` :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fgodofwar.fandom.com%2Fes%2Fwiki%2FKratos&psig=AOvVaw3I3oaaHeGl47Mrle4dOo5t&ust=1613868718431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCv6M-f9-4CFQAAAAAdAAAAABAD"}
                onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"
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
