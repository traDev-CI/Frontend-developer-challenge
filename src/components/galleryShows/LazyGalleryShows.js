import React, { lazy, Suspense } from 'react';
import useNearScreen from '../../Hooks/useNearScreen';
import ImageGrid from '../../assest/spinner/spinner';

const GalleryShowsContainer = lazy(props => import('./GalleryShowsContainer'));

export default function LazyGalleryShows(props) {
  const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });

  return (
    <div ref={fromRef}>
      <Suspense fallback={<ImageGrid />}>
        {isNearScreen ? <GalleryShowsContainer {...props} /> : <ImageGrid />}
      </Suspense>
    </div>
  );
}
