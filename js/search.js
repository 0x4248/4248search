let bangs = [];

fetch("data/bangs.json")
    .then(response => response.json())
    .then(data => {
        bangs = data;
});

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

