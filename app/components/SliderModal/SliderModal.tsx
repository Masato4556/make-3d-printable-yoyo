import { RefObject } from "react";
import { Slide, useSlider } from "./hooks/useSlider";
import styles from "./SliderModal.module.scss";

type Props = {
  slide: Slide[];
  modalRef: RefObject<HTMLDialogElement | null>;
};

export function SliderModal({ slide, modalRef }: Props) {
  const {
    currentPage,
    currentSlide,
    flipNextPage,
    flipPrevPage,
    hasNextPage,
    hasPrevPage,
  } = useSlider(slide);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <dialog className={styles.overlay} ref={modalRef} open>
      <div className={styles.modal}>
        <div className={styles.row}>
          <div>Slider Modal</div>
          <button onClick={closeModal}>Close</button>
        </div>
        <div>{currentSlide.title}</div>
        <img src={currentSlide.image.url} alt={currentSlide.image.alt} />
        <div>{currentSlide.description}</div>
        <div className={styles.row}>
          <button onClick={flipPrevPage} disabled={!hasPrevPage}>
            Previous
          </button>
          {Array.from(Array(slide.length)).map((_, i) =>
            i === currentPage ? (
              <div key={i} style={{ fontWeight: "bold" }}>
                ●
              </div>
            ) : (
              <div key={i}>○</div>
            )
          )}
          <button onClick={flipNextPage} disabled={!hasNextPage}>
            Next
          </button>
        </div>
      </div>
    </dialog>
  );
}
