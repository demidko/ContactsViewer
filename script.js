"use strict";
var SearchBox = document.getElementById('search-box');
function GenerateTrueRequest(request) {
    var lexemes = SearchBox.value.split(' ').filter();
    return 's';
}
function SuperActualPath() {
    SearchBox.value = GenerateTrueRequest(SearchBox.value.toUpperCase());
}
function Search() {
    SuperActualPath();
    var request = SearchBox.value.toUpperCase();
}
