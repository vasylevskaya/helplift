import { useRecoilState } from "recoil";
import ButtonCircle from "./ButtonCircle";
import { animationTextVisibleState } from "../recoil/atoms";

const SkipAnimation = () => {
  const [, setIsAnimTextVisible] = useRecoilState(animationTextVisibleState);

  const skipAnimation = (elementId) => { /* move to about us (up) / products (down) section */
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
    }
    setIsAnimTextVisible(false);
  }

  return (
    <div className="skip-animation_btns">
      <button
        className="skip-animation_btns_btn btn-up"
        onClick={() => skipAnimation('section-about-us')}
      >
        <ButtonCircle backgroundColor="#9f9f9fad" arrowColor="#151517" />
      </button>
      <p className="skip-animation_btns_text">
        {'Пропустити анімацію'}
      </p>
      <button
        className="skip-animation_btns_btn btn-down"
        onClick={() => skipAnimation('section-products')}
      >
        <ButtonCircle backgroundColor="#9f9f9fad" arrowColor="#151517" />
      </button>
    </div>
  );
};

export default SkipAnimation;