import { RefObject } from "react";
import { Slide, useSlider } from "./hooks/useSlider";
import styles from "./SlideModal.module.scss";
import {
  FaAngleRight,
  FaAngleLeft,
  FaCircle,
  FaRegCircle,
  FaTimes,
} from "react-icons/fa";
import { IconButton } from "../IconButton/IconButton";

type Props = {
  slide: Slide[];
  modalRef: RefObject<HTMLDialogElement | null>;
};

export function SlideModal({ slide, modalRef }: Props) {
  const {
    currentPage,
    currentSlide,
    flipNextPage,
    flipPrevPage,
    resetPage,
    hasNextPage,
    hasPrevPage,
  } = useSlider(slide);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      resetPage();
    }
  };

  return (
    <dialog className={styles.overlay} ref={modalRef} open>
      <div className={styles.modal}>
        <div className={styles.row}>
          <h2>{currentSlide.title}</h2>
          <div className={styles.closeButton}>
            <IconButton icon={<FaTimes />} onClick={closeModal} />
          </div>
        </div>
        <div className={styles.row}>
          <img src={currentSlide.image.url} alt={currentSlide.image.alt} />
        </div>
        <div className={styles.row}>{currentSlide.description}</div>
        <div className={styles.row}>
          <IconButton
            icon={<FaAngleLeft />}
            onClick={flipPrevPage}
            disabled={!hasPrevPage}
          />
          {Array.from(Array(slide.length)).map((_, i) => (
            <div
              key={`${i}-${currentSlide.title}`}
              className={styles.progressCircle}
            >
              {i === currentPage ? (
                <FaCircle size={"1rem"} />
              ) : (
                <FaRegCircle size={"1rem"} />
              )}
            </div>
          ))}
          <IconButton
            icon={<FaAngleRight />}
            onClick={flipNextPage}
            disabled={!hasNextPage}
          />
        </div>
      </div>
    </dialog>
  );
}
