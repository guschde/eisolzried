SimpleJekyllSearch({
searchInput: document.getElementById('search-input'),
resultsContainer: document.getElementById('results-container'),
json: '/search.json',
searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
noResultsText: '<li><a>Nix gfunna!</a></li>',
limit: 5,
fuzzy: false,
exclude: ['Welcome']
});

document.getElementById('theme-switch').onclick = function() {
    switchTheme();
};
