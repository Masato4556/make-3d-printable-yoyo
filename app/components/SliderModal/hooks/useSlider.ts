import { useCallback, useState } from "react";

export type Slide = {
  image: { url: string; alt: string };
  title: string;
  description: string;
};

export function useSlider(slide: Slide[]) {
  const [page, setPage] = useState(0);

  const flipNextPage = useCallback(() => {
    if (page >= slide.length - 1) return;
    setPage((prev) => prev + 1);
  }, [page, slide.length]);

  const flipPrevPage = useCallback(() => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
  }, [page]);

  if (slide.length === 0) {
    throw new Error("Slide data is empty");
  }

  if (page < 0 || page >= slide.length) {
    throw new Error("Page index out of bounds");
  }

  return {
    page,
    hasPrevPage: page > 0,
    hasNextPage: page < slide.length - 1,
    flipNextPage,
    flipPrevPage,
    currentPage: page,
    currentSlide: getSlide(slide, page),
  };
}

const getSlide = (slide: Slide[], page: number): Slide => {
  if (slide.length === 0) {
    throw new Error("Slide data is empty");
  }

  if (slide[page] === undefined) {
    throw new Error("Page index out of bounds");
  }

  return slide[page];
};
