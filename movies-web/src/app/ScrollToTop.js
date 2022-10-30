/* Scroll to top -element applied from
https://v5.reactrouter.com/web/guides/scroll-restoration */
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setScrollUp } from '../redux/UIControlSlice';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const elementRef = useRef(null);
  const dispatch = useDispatch();

  const scrollUp = useSelector((state) => state.UIstate.scrollUp);

  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [pathname]);

  useEffect(() => {
    if (scrollUp) {
      dispatch(setScrollUp(false));
      elementRef.current.scrollIntoView();
    }
  }, [dispatch, scrollUp]);

  return <div ref={elementRef} />;
}
