(function () {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const copyButton = document.getElementById('copyEmailButton');
    const email = document.getElementById('emailText').textContent.trim();

    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries, revealObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(function (item) { observer.observe(item); });
    } else {
        revealItems.forEach(function (item) { item.classList.add('is-visible'); });
    }

    function setTheme(theme) {
        const dark = theme === 'dark';
        body.classList.toggle('dark-mode', dark);
        themeToggle.innerHTML = dark
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        localStorage.setItem('contact-theme', theme);
    }

    const savedTheme = localStorage.getItem('contact-theme');
    setTheme(savedTheme === 'light' ? 'light' : 'dark');

    themeToggle.addEventListener('click', function () {
        setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
    });

    copyButton.addEventListener('click', async function () {
        const original = copyButton.innerHTML;
        try {
            await navigator.clipboard.writeText(email);
            copyButton.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copied!';
        } catch (error) {
            copyButton.textContent = 'Copy failed';
        }
        window.setTimeout(function () { copyButton.innerHTML = original; }, 2000);
    });
}());
