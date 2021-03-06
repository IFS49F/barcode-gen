if (typeof window.generateToBase64 === 'undefined') {
  window.generateToBase64 = async (options) => {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error(await response.text());
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const batchApply = selector => callback => Array.prototype.forEach.call(
    document.querySelectorAll(selector),
    elem => callback(elem)
  );
  
  const $links = batchApply('a.nav-group-item');
  const $forms = batchApply('form');
  const $output = batchApply('#output');

  const clearOutput = () => $output(output => {
    while (output.lastChild) output.removeChild(output.lastChild);
  });
  
  $links(link => link.addEventListener('click', (e) => {
    $links(lnk => lnk === link
      ? lnk.classList.add('active')
      : lnk.classList.remove('active'));
    clearOutput()
  }, false));

  $forms(form => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const options = {};
    const formData = new FormData(e.target);
    formData.forEach((v, k) => options[k] = v);
    clearOutput();
    generateToBase64(options).then((data) => {
      $output((output) => {
        const img = document.createElement('img');
        img.src = data;
        img.srcset = `${data}, ${data} 2x`;
        output.appendChild(img);
      });
    }).catch((e) => {
      $output((output) => {
        const span = document.createElement('span');
        span.textContent = e.message;
        span.style.color = '#fc605b';
        output.appendChild(span);
      });
    });
  }, false));
}, false);
