 const colorBtns = document.querySelectorAll('.color-btn');
  colorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      colorBtns.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });

  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });


  const addToBagBtn = document.querySelector('.add-to-bag-btn');
  const addToBagLabel = addToBagBtn ? addToBagBtn.querySelector('.btn-label') : null;

  const defaultText = 'Add to Bag';
  const addedText = 'Added';
  let resetTimer;


  function setPlainLabel(label, text) {
    if (!label) return;
    label.classList.remove('is-split');
    label.textContent = text;
  }

  function setAnimatedLabel(label, text, direction) {
    if (!label) return;
    label.classList.add('is-split');
    label.innerHTML = '';
    Array.from(text).forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = `char char-${direction}`;
      span.style.setProperty('--i', String(i));
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      label.appendChild(span);
    });
  }

  function onClick(btn, label) {
    if (btn.classList.contains('is-added')) return;
    btn.classList.add('is-added');
    setAnimatedLabel(label, addedText, 'up');

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      btn.classList.remove('is-added');
      setAnimatedLabel(label, defaultText, 'down');
    }, 5000);
  }

  function initialize() {
  if (!addToBagBtn || !addToBagLabel) return;
  setPlainLabel(addToBagLabel, defaultText);
  addToBagBtn.addEventListener('click', () => onClick(addToBagBtn, addToBagLabel));
  }

  initialize();
