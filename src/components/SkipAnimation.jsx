import ButtonCircle from "./ButtonCircle";
import { hideAllVisibleText } from "../helpers/animationText";
import { useRecoilState } from 'recoil';
import { animationDisabledState } from '../recoil/atoms';

const SkipAnimation = ({ enableScroll }) => {
   const [, setAnimationDisabledGlobally] = useRecoilState(animationDisabledState);
  

  const skipAnimation = (elementId) => { /* move to about us (up) / products (down) section */
    const element = document.getElementById(elementId);
    if (element) {
      enableScroll()
      /* disable animation to avoid trigerring it when using navigation or scroll to top */
      setAnimationDisabledGlobally(true);

      document.body.scrollTo({ top: element.offsetTop, behavior: "smooth" });

      /* enable animation after scroll */
      setTimeout(() => {
        setAnimationDisabledGlobally(false);
      }, 500);
    }
    hideAllVisibleText();
  }

  return (
    <div className="skip-animation_btns-wrapper">
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
    </div>
  );
};

export default SkipAnimation;