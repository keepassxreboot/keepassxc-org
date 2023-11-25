async function copyText(e) {
    const btn = e.currentTarget;
    const icon = btn.firstChild;
    const textNode = btn.previousElementSibling;
    try {
        await navigator.clipboard.writeText(textNode.textContent);
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
      } catch (err) {
        alert(`Error copying text to clipboard: ${err.message}\n\nPlease copy manually instead.`);
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    setTimeout(() => {
        icon.classList.remove('fa-check');
        icon.classList.add('fa-copy');
      }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll('.copyable')) {
        const btn = document.createElement('button');
        btn.title = 'Copy to clipboard';
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-copy');
        btn.appendChild(icon);
        btn.addEventListener('click', copyText);
        el.appendChild(btn);
    }
});
