import React, { lazy, Suspense } from "react";
import useNearScreen from '../../Hooks/useNearScreen';
import ImageGrid from '../../assest/spinner/spinner';
import { Button } from "@material-ui/core";

const GalleryShows = lazy((props) => import('./getGallery'))

export default function LazyGalleryShows(props) {
  const {hidtory} = props;
  const {isNearScreen, fromRef} = useNearScreen({distance: '200px'});

  return <div ref={fromRef}>
    <Suspense fallback={<ImageGrid />}>
      {isNearScreen ? <GalleryShows {...props}/> : <ImageGrid />}
    </Suspense>
    </div>;
}
