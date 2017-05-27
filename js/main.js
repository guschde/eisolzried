// Language switch
var path = window.location.pathname;
var langBtn = document.getElementById('language-btn');
var langImg = document.getElementById('flag-img');
if (path.indexOf("/by/") === -1) {
    langImg.src = '/assets/by.png';
    langImg.alt = 'Flagge Bayern';
    langBtn.onclick = function() {
        window.location = '/by'.concat(path);
    };
}
else {
    langImg.src = '/assets/de.png';
    langImg.alt = 'Flagge Deutschland';
    langBtn.onclick = function() {
        window.location = path.replace('/by','');;
    };
}

// Theme switch
function setTheme(local) {
    var theme, icon, css;
    if (local == 'light') {
        theme = 'dark';
        icon = 'sun';
        css = '/css/dark-theme.min.css';
    }
    else  {
        theme = 'light';
        icon = 'moon';
        css = ''
    }
    document.getElementById('theme-link').href = css;
    document.getElementById('theme-icon').className = 'icon-' + icon;
    localStorage.setItem('theme', theme);
}
if (localStorage.getItem('theme') == 'dark') {
    setTheme('light');
}
else {
    localStorage.setItem('theme', 'light');
}
document.getElementById('theme-switch').onclick = function() {
    setTheme(localStorage.getItem('theme'));
};

// Lazy load images and videos
// 1. Convert node list of all elements with data-src attributed to array
var els = document.querySelectorAll('.lazy');
if (els.length > 0) {
    function replaceSrc(element) {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
    }
    function addLoaded(element) {
        element.classList.add('loaded');
    }
    function load(element) {
        if (element.nodeName == 'VIDEO') {
            var sources = element.getElementsByTagName('source');
            for (let i = 0; i < sources.length; i++) {
                replaceSrc(sources[i]);
            }
            element.load();
            element.onloadstart = function() { addLoaded(element) };
        }
        else {
            replaceSrc(element);
            element.onload = function() { addLoaded(element) };
        }
    }

    if (! ('IntersectionObserver' in window)) {
    console.log('Intersection Observer not supported');
    for (var i = 0; i < els.length; i++) {
        load(els[i]);
    }
    } else {
    // 2. Create the IntersectionObserver and bind it to the function we want it to work with
    var observer = new IntersectionObserver(onChange, {
        threshold: 0.5
    });
    
    function onChange(changes) {
        // 3. For each element that we want to change
        changes.forEach(change => {
            // Edge 15 doesn't support isIntersecting, but we can infer it from intersectionRatio
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
            if (change.intersectionRatio > 0) {
                // 4. take url from `data-src` attribute
                load(change.target);

                // 5. Stop observing the current target
                observer.unobserve(change.target);

                console.log('lazy loaded element');
            }
            })
    }
    // 6. Observe each image derived from the array above
    els.forEach(el => observer.observe(el));
    }
}

// Simple lightbox
$('.gallery a').simpleLightbox();

// Custom search
const endpoint = '/assets/search.json';
const pages = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => pages.push(...data))
function findResults(termToMatch, pages) {
    return pages.filter(item => {
        const regex = new RegExp(termToMatch, 'gi');
        return item.title.match(regex) || item.content.match(regex);
    });
}
function displayResults() {
    const resultsArray = findResults(this.value, pages);
    const html = resultsArray.map(item => {
        return `
            <li><a href="${item.url}">${item.title}</a></li>`;
    }).join('');
    if ((resultsArray.length == 0) || (this.value == '')) {
        resultsList.innerHTML = `<p>Nix gfunna!</p>`;
    } else {
        resultsList.innerHTML = html;
    }
}
const field = document.querySelector('#search-input');
const resultsList = document.querySelector('#results-container');
field.addEventListener('keyup', displayResults);
field.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

// Siren player
document.getElementById('siren-btn').onclick = function() {
    var player = document.getElementById('siren-player');
    var icon;
    if (player.paused) {
        if (player.readyState == 0) {
            player.load();
        }
        player.play();
        icon = 'volume-off';
    }
    else {
        player.pause();
        icon = 'volume-up';
    }
    document.getElementById('siren-icon').className = 'icon-' + icon;
};
