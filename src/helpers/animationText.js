export const hideAllVisibleText = () => {

  const visibleTextElements = document.querySelectorAll(
    '.png__sequence__text_part.visible'
  );

  visibleTextElements.forEach((element) => {
    element.classList.remove('visible');
    element.classList.add('hidden');
  });
};

export const makeTextVisible = (textStage) => {
  const newVisibleTextElement = document.querySelector(
    `#text-stage-${textStage}`
  );

  hideAllVisibleText();

  if (newVisibleTextElement) {
    newVisibleTextElement.classList.remove('hidden')
    newVisibleTextElement.classList.add('visible')
  }

};

export const toggleSkipAnimation = (action) => {
  /* const skipButtons = document.querySelector(
    '.skip-animation_btns'
  );

  if (!skipButtons) return

  if (action === 'show') {
    skipButtons.classList.remove('hidden')
    skipButtons.classList.add('visible')
  }

  if (action === 'hide') {
    skipButtons.classList.remove('visible')
    skipButtons.classList.add('hidden')
  } */
};