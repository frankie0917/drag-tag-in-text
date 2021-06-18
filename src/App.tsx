import React, { useEffect, useRef } from 'react';

function App() {
  const id = useRef(0);

  const bindEvents = (el: HTMLElement, text: string, srcBtn = false) => {
    id.current += 1;
    const className = `btn-${id.current}`;

    el.addEventListener('dragstart', (event: any) => {
      var textContent = `<span
      class="${className} btn"
      draggable="true"
      data-text="${text}"
    ></span>`;

      event.dataTransfer.setData('text/html', textContent);
      event.dataTransfer.effectAllowed = 'copy';
    });

    el.addEventListener('dragend', (e) => {
      const newBtn = document.getElementsByClassName(
        className,
      )[0] as HTMLElement;
      bindEvents(newBtn, text);

      if (!srcBtn) {
        (e.target as HTMLElement).remove();
      }
    });
  };

  useEffect(() => {
    ['STORE_NAME', 'STORE_URL'].forEach((id) => {
      const btn = document.getElementById(id) as HTMLElement;
      bindEvents(btn, `*| ${id} |*`, true);
    });
  }, []);

  return (
    <div className="App">
      <div style={{ marginBottom: 10 }}>
        <div>drag to text</div>
        <button draggable id="STORE_NAME" className="src-btn">
          *| STORE_NAME |*
        </button>
        <button draggable id="STORE_URL" className="src-btn">
          *| STORE_URL |*
        </button>
      </div>
      <div className="box" contentEditable>
        123456789
      </div>
      <div>
        <button
          onClick={() => {
            const text = document.getElementsByClassName(
              'box',
            )[0] as HTMLElement;
            let res = '';

            text.childNodes.forEach((node: any) => {
              if (node.dataset) {
                res += node.dataset.text;
              } else {
                res += node.textContent;
              }
            });
            console.log('res', res);
          }}
        >
          log
        </button>
      </div>
    </div>
  );
}

export default App;
