const bangs = [
    ["!w", "Wikipedia", "https://en.wikipedia.org/wiki/$QUERY$"],
    ["!y", "YouTube", "https://www.youtube.com/results?search_query=$QUERY$"],
    ["!d", "DuckDuckGo", "https://duckduckgo.com/?q=$QUERY$"],
    ["!gh", "GitHub (users)", "https://www.github.com/$QUERY$"],
    ["!ghr", "GitHub (repos)", "https://www.github.com/search?q=$QUERY$"],
    ["!a", "Amazon", "https://www.amazon.com/s?k=$QUERY$"],
    ["!r", "Reddit", "https://www.reddit.com/search?q=$QUERY$"],
    ["!tw", "Twitter", "https://twitter.com/search?q=$QUERY$"],
    ["!g", "Google", "https://www.google.com/search?q=$QUERY$"],
    ["!m", "Google Maps", "https://www.google.com/maps?q=$QUERY$"],
    ["!i", "Google Images", "https://www.google.com/search?tbm=isch&q=$QUERY$"],
    ["!ytm", "YouTube Music", "https://music.youtube.com/search?q=$QUERY$"],
    ["!wikt", "Wiktionary", "https://en.wiktionary.org/wiki/$QUERY$"],
    ["!wiki", "Wikipedia", "https://en.wikipedia.org/wiki/$QUERY$"],
    ["!wisp", "Wikiespecies", "https://species.wikimedia.org/wiki/$QUERY$"],
    ["!wikt", "Wiktionary", "https://en.wiktionary.org/wiki/$QUERY$"],
    ["!wikin", "Wikinews", "https://en.wikinews.org/wiki/$QUERY$"],
    ["!wikib", "Wikibooks", "https://en.wikibooks.org/wiki/$QUERY$"],
    ["!wikiv", "Wikiversity", "https://en.wikiversity.org/wiki/$QUERY$"],
    ["!wikis", "Wikisource", "https://en.wikisource.org/wiki/$QUERY$"],
    ["!wikivoy", "Wikivoyage", "https://en.wikivoyage.org/wiki/$QUERY$"],
    ["!wikicom", "Wikicommons", "https://commons.wikimedia.org/wiki/$QUERY$"],
    ["!wikidata", "Wikidata", "https://www.wikidata.org/wiki/$QUERY$"],
    ["!wikiq", "Wikiquote", "https://en.wikiquote.org/wiki/$QUERY$"],
    ["!wies", "Wikipedia (Español)", "https://es.wikipedia.org/wiki/$QUERY$"],
    ["!wifr", "Wikipedia (Français)", "https://fr.wikipedia.org/wiki/$QUERY$"],
    ["!wiit", "Wikipedia (Italiano)", "https://it.wikipedia.org/wiki/$QUERY$"],
    ["!wipl", "Wikipedia (Polski)", "https://pl.wikipedia.org/wiki/$QUERY$"],
    ["!wipt", "Wikipedia (Português)", "https://pt.wikipedia.org/wiki/$QUERY$"],
    ["!wiru", "Wikipedia (Русский)", "https://ru.wikipedia.org/wiki/$QUERY$"],
    ["!witr", "Wikipedia (Türkçe)", "https://tr.wikipedia.org/wiki/$QUERY$"],
    ["!wijp", "Wikipedia (日本語)", "https://ja.wikipedia.org/wiki/$QUERY$"],
    ["!wiko", "Wikipedia (한국어)", "https://ko.wikipedia.org/wiki/$QUERY$"],
    ["!wizh", "Wikipedia (中文)", "https://zh.wikipedia.org/wiki/$QUERY$"],
    ["!wiar", "Wikipedia (العربية)", "https://ar.wikipedia.org/wiki/$QUERY$"],
    ["!wisi", "Wikipedia (Simple English)", "https://simple.wikipedia.org/wiki/$QUERY$"],
    ["!wf", "Wolfram Alpha", "https://www.wolframalpha.com/input/?i=$QUERY$"]
];

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const dropdown = document.getElementById("dropdown");
const bangSpan = document.getElementById("bangSpan");

let selectedIndex = -1;

function generateDropdownItems(query) {
    const filteredBangs = bangs.filter(bang => bang[0].startsWith(query) || `!${bang[1].toLowerCase()}`.startsWith(query));

    dropdown.innerHTML = "";
    filteredBangs.forEach((bang, index) => {
        const bangElement = document.createElement("div");
        bangElement.innerHTML = `<strong>${bang[0]}</strong> - ${bang[1]}`;
        bangElement.classList.add("dropdown-item");
        bangElement.dataset.index = index;
        bangElement.addEventListener("click", () => {
            selectBang(bang);
        });
        dropdown.appendChild(bangElement);
    });

    dropdown.style.display = filteredBangs.length > 0 ? "block" : "none";
}

function clearDropdown() {
    dropdown.innerHTML = "";
    dropdown.style.display = "none";
}

searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    if (query.startsWith("!")) {
        generateDropdownItems(query);
    } else {
        clearDropdown();
    }
});

document.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".dropdown-item");

    if (document.activeElement === searchInput) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (e.key === "ArrowDown") {
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            } else {
                selectedIndex = Math.max(selectedIndex - 1, 0);
            }
            items[selectedIndex].focus();
        }

        if (e.key === "Enter") {
            if (selectedIndex !== -1) {
                items[selectedIndex].click();
            } else {
                search();
            }
        }

        if (e.key === "Escape") {
            clearDropdown();
        }
    }
});


function selectBang(bang) {
    bangSpan.textContent = bang[0];
    searchInput.placeholder = `Search on ${bang[1]}`;
    bangSpan.style.display = "inline-block";
    searchInput.value = searchInput.value.slice(bang[0].length).trim();
    clearDropdown();
}

function search() {
    const query = searchInput.value;
    const selectedBang = bangs.find(bang => bang[0] === bangSpan.textContent);
    const url = selectedBang ? selectedBang[2].replace("$QUERY$", encodeURIComponent(query)) : `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    window.location.href = url;
}

searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    const selectedBang = bangs.find(bang => bang[0] === bangSpan.textContent);
    const url = selectedBang ? selectedBang[2].replace("$QUERY$", encodeURIComponent(query)) : `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    window.location.href = url;
});

