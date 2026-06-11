"use strict";
/**
 * ZÁKLADNÍ ŠABLONA (TŘÍDA) PRO VŠECHNY KONZOLE
 * 'abstract' znamená, že z této třídy nemůžeme vyrobit produkt přímo,
 * ale slouží jako společný herní plán pro ostatní podtřídy.
 */
class Konzole {
    _nazev;
    _vyrobce;
    _zakladniCena;
    region;
    // Chráněná schránka na číslo. Drží základní 15% marži obchodu (násobí cenu * 1.15)
    marzeEshopu = 1.15;
    // Veřejná schránka na text, kam si později uložíme cestu k fotce produktu
    fotoUrl = "";
    // Veřejná schránka na číslo pro jedinečné ID číslo produktu
    id = 0;
    // Konstruktor je 'továrna', která se spustí při zrodu každé nové konzole a naloží do ní data
    constructor(_nazev, // Soukromé: jméno (např. "Switch")
    _vyrobce, // Soukromé: značka (např. "Nintendo")
    _zakladniCena, // Chráněné: nákupní cena z fabriky v Kč
    region // Veřejné: odkud konzole pochází (např. "PAL")
    ) {
        this._nazev = _nazev;
        this._vyrobce = _vyrobce;
        this._zakladniCena = _zakladniCena;
        this.region = region;
    }
    // Gettery jsou 'otevřená okénka', přes která si kdokoli zvenčí může bezpečně přečíst soukromé jméno a výrobce
    get nazev() { return this._nazev; }
    get vyrobce() { return this._vyrobce; }
}
/**
 * TŘÍDA PRO KAPESNÍ KONZOLE (HANDHELDY)
 * 'extends Konzole' znamená, že dědí všechny vlastnosti z hlavní šablony nahoře
 */
class Handheld extends Konzole {
    stavDispleje;
    // Každá přenosná konzole dostane automaticky příplatek 300 Kč za pouzdro do batohu
    priplatekPouzdro = 300;
    // Továrna na handheldy – vezme základní data, předá je dál tátovi (super) a přidá stav displeje
    constructor(nazev, vyrobce, cena, region, stavDispleje) {
        super(nazev, vyrobce, cena, region); // Posílá data do hlavní třídy 'Konzole'
        this.stavDispleje = stavDispleje;
    }
    // Výpočet ceny pro kapesní konzoli: (nákupní cena + 300 Kč pouzdro) * marže 1.15. Výsledek zaokrouhlí.
    vypocitejKonecnouCenu() {
        return Math.round((this._zakladniCena + this.priplatekPouzdro) * this.marzeEshopu);
    }
}
/**
 * TŘÍDA PRO DOMÁCÍ KONZOLE NA DOMA
 */
class DomaciKonsole extends Konzole {
    pocetOvladacu;
    // Domácí konzole potřebuje ovladače k TV, jeden kus navíc stojí 500 Kč
    cenaZaOvladac = 500;
    // Továrna na domácí konzole – navíc zjišťuje, kolik ovladačů je v balení
    constructor(nazev, vyrobce, cena, region, pocetOvladacu) {
        super(nazev, vyrobce, cena, region); // Posílá data do hlavní třídy 'Konzole'
        this.pocetOvladacu = pocetOvladacu;
    }
    // Výpočet ceny pro TV konzoli: nákupní cena + (počet ovladačů * 500 Kč) a to celé krát marže 1.15
    vypocitejKonecnouCenu() {
        const cenaOvladacu = this.pocetOvladacu * this.cenaZaOvladac;
        return Math.round((this._zakladniCena + cenaOvladacu) * this.marzeEshopu);
    }
}
/**
 * FUNKCE PRO VYTVOŘENÍ HTML KÓDU (KARTY PRODUKTU) PRO WEBOVOU STRÁNKU
 */
function vytvorKartu(konzole) {
    const konecnaCena = konzole.vypocitejKonecnouCenu(); // Spustíme výpočet ceny pro danou konzoli
    let specinfo = ""; // Prázdná schránka na text, kam dáme informaci podle typu konzole
    // Podle toho, z jaké šablony konzole je, vytvoříme popisek na kartu
    if (konzole instanceof Handheld) {
        specinfo = `Stav: ${konzole.stavDispleje}`; // U handheldu ukážeme stav displeje
    }
    else if (konzole instanceof DomaciKonsole) {
        specinfo = `Ovladačů: ${konzole.pocetOvladacu} ks`; // U domácí ukážeme počet ovladačů
    }
    // Vrátíme kus HTML kódu (krabičku s textem, obrázkem a tlačítkem), který se vloží do webu
    return `
        <div class="console-card">
            <img src="${konzole.fotoUrl}" class="console-img-file" alt="${konzole.nazev}" 
                 onerror="this.src='obrazky/placeholder.png';"> <div class="console-info">
                <h3>${konzole.vyrobce} ${konzole.nazev}</h3>
                <p class="spec">Region: ${konzole.region}</p>
                <p class="spec">${specinfo}</p>
                <span class="price">${konecnaCena} Kč</span>
                <button class="buy-btn" onclick="pridejDoKosiku(${konzole.id})">KOUPIT</button>
            </div>
        </div>
    `;
}
/**
 * FUNKCE, KTERÁ SPUSTÍ CELÝ E-SHOP A VYKRESLÍ PRODUKTY NA OBRAZOVKU
 */
function inicializujEshop() {
    console.log("Eshop se inicializuje...");
    // Vytáhneme surová data (seznam z data.js), která jsou schovaná v globálním okně prohlížeče (window)
    const NABIDKA_KONZOLI = window.NABIDKA_KONZOLI;
    // Najdeme na webové stránce místa (podle ID), kam budeme ty konzole skládat
    const domesticContainer = document.getElementById('domestic-list'); // Místo pro domácí konzole
    const handheldContainer = document.getElementById('handheld-list'); // Místo pro handheldy
    // Záchranná brzda: Pokud se data.js nenačetl, vypíšeme chybu do konzole a stopneme program
    if (typeof NABIDKA_KONZOLI === 'undefined' || !NABIDKA_KONZOLI) {
        console.error("Data nebyla nalezena! Zkontroluj, zda je v HTML načten data.js před app.js");
        return;
    }
    // Promážeme text na webu, aby tam nezůstaly nějaké staré ukázkové texty
    if (domesticContainer)
        domesticContainer.innerHTML = "";
    if (handheldContainer)
        handheldContainer.innerHTML = "";
    // Projdeme surová data jedno po druhém a vyrobíme z nich reálné objekty
    NABIDKA_KONZOLI.forEach((item) => {
        let novaKonzole; // Schránka na hotový objekt
        if (item.typ === "handheld") {
            // Pokud je to handheld, vyrobíme ho pomocí továrny 'Handheld'
            novaKonzole = new Handheld(item.nazev, item.vyrobce, item.cena, item.region, item.stav || "Neznámý");
            novaKonzole.id = item.id;
            novaKonzole.fotoUrl = `obrazky/${item.foto || 'placeholder.png'}`;
            // Pokud na webu existuje místo pro handheldy, přihodíme tam vygenerovanou kartu
            if (handheldContainer) {
                handheldContainer.innerHTML += vytvorKartu(novaKonzole);
            }
        }
        else {
            // Pokud to není handheld, je to domácí konzole. Vyrobíme ji přes továrnu 'DomaciKonsole'
            novaKonzole = new DomaciKonsole(item.nazev, item.vyrobce, item.cena, item.region, item.ovladace || 1);
            novaKonzole.id = item.id;
            novaKonzole.fotoUrl = `obrazky/${item.foto || 'placeholder.png'}`;
            // Pokud na webu existuje místo pro domácí konzole, přihodíme ji tam
            if (domesticContainer) {
                domesticContainer.innerHTML += vytvorKartu(novaKonzole);
            }
        }
    });
}
// Čekáme: Jakmile prohlížeč načte celé okno, obrázky a skripty, spustí se funkce 'inicializujEshop'
window.addEventListener('load', inicializujEshop);
/**
 * GLOBÁLNÍ FUNKCE, KTERÁ SE SPUSTÍ PŘI KLIKNUTÍ NA TLAČÍTKO "KOUPIT"
 */
window.pridejDoKosiku = function (idKonzole) {
    // Vytáhneme si čerstvá surová data z okna prohlížeče
    const NABIDKA_KONZOLI = window.NABIDKA_KONZOLI;
    if (!NABIDKA_KONZOLI) {
        console.error("Nelze přidat do košíku, data nejsou načtená!");
        return;
    }
    // 1. Podle ID čísla najdeme v seznamu přesně tu konzoli, na kterou uživatel kliknul
    const vybranaPolozka = NABIDKA_KONZOLI.find((k) => k.id === idKonzole);
    if (vybranaPolozka) {
        // 2. Vytáhneme z tajné schránky prohlížeče (localStorage) starý košík. Pokud tam nic není, uděláme prázdný seznam []
        let aktualniKosik = JSON.parse(localStorage.getItem('mujKosik') || '[]');
        // Vytvoříme si rychlý dočasný objekt, abychom z něj vytáhli správně spočítanou cenu s maržemi
        let docasnyObjekt = vybranaPolozka.typ === "handheld"
            ? new Handheld(vybranaPolozka.nazev, vybranaPolozka.vyrobce, vybranaPolozka.cena, vybranaPolozka.region, vybranaPolozka.stav || "Neznámý")
            : new DomaciKonsole(vybranaPolozka.nazev, vybranaPolozka.vyrobce, vybranaPolozka.cena, vybranaPolozka.region, vybranaPolozka.ovladace || 1);
        // Zabalíme balíček informací, které chceme odeslat do košíku
        const ukladanyProdukt = {
            id: vybranaPolozka.id,
            nazev: vybranaPolozka.nazev,
            vyrobce: vybranaPolozka.vyrobce,
            cena: docasnyObjekt.vypocitejKonecnouCenu(), // Použije se finální cena (příplatky + marže)
            foto: vybranaPolozka.foto || 'placeholder.png',
            typ: vybranaPolozka.typ,
            // Uložíme správný popisek podle typu
            spec: vybranaPolozka.typ === "handheld" ? `Stav: ${vybranaPolozka.stav}` : `Ovladačů: ${vybranaPolozka.ovladace} ks`
        };
        // 3. Přihodíme tento nový zabalený produkt do seznamu košíku
        aktualniKosik.push(ukladanyProdukt);
        // 4. Celý upravený seznam košíku uložíme zpět do dlouhodobé paměti prohlížeče pod jménem 'mujKosik'
        localStorage.setItem('mujKosik', JSON.stringify(aktualniKosik));
        // 5. Přesměrujeme uživatele z hlavní stránky rovnou na stránku košíku (index4.html)
        window.location.href = "index4.html";
    }
    else {
        // Pokud by se stala chyba a ID neexistovalo, nahlásíme to
        console.error("Konzole s ID " + idKonzole + " nebyla nalezena!");
    }
};
