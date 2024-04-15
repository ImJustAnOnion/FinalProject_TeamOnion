const toggleButton = document.getElementById('toggle-mode');

toggleButton.addEventListener(`click`, (e) => {
    const body = document.body;
    body.classList.toggle('light-mode')
    toggleButton.innerText = body.classList.contains ('light-mode') ? '🌙' : '☀️';
})