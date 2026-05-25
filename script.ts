/**
 * ZÁKLADNÍ ABSTRAKTNÍ TŘÍDA PRO VŠECHNY KONZOLE
 */
abstract class Konzole {
    protected marzeEshopu: number = 1.15; // Marže 15% pro eshop
    public fotoUrl: string = "";          // Cesta k obrázku
    public id: number = 0;                // ID přímo ve třídě, aby ho šlo přečíst

    constructor(
        private _nazev: string,
        private _vyrobce: string,
        protected _zakladniCena: number,
        public region: string
    ) {}

    // Gettery pro přístup k soukromým vlastnostem
    get nazev(): string { return this._nazev; }
    get vyrobce(): string { return this._vyrobce; }

    // Abstraktní metoda, kterou si každá podtřída spočítá po svém
    abstract vypocitejKonecnouCenu(): number;
}

/**
 * TŘÍDA PRO KAPESNÍ KONZOLE (HANDHELDY)
 */
class Handheld extends Konzole {
    private priplatekPouzdro: number = 300; // Každý handheld má v ceně pouzdro

    constructor(nazev: string, vyrobce: string, cena: number, region: string, public stavDispleje: string) {
        super(nazev, vyrobce, cena, region);
    }

    // Výpočet ceny: (základ + pouzdro) * marže eshopu
    vypocitejKonecnouCenu(): number {
        return Math.round((this._zakladniCena + this.priplatekPouzdro) * this.marzeEshopu);
    }
}

/**
 * TŘÍDA PRO DOMÁCÍ KONZOLE NA DOMA
 */
class DomaciKonsole extends Konzole {
    private cenaZaOvladac: number = 500; // Příplatek za ovladače navíc

    constructor(nazev: string, vyrobce: string, cena: number, region: string, public pocetOvladacu: number) {
        super(nazev, vyrobce, cena, region);
    }

    // Výpočet ceny: (základ + ovladače) * marže eshopu
    vypocitejKonecnouCenu(): number {
        const cenaOvladacu = this.pocetOvladacu * this.cenaZaOvladac;
        return Math.round((this._zakladniCena + cenaOvladacu) * this.marzeEshopu);
    }
}

/**
 * FUNKCE PRO GENEROVÁNÍ HTML KARTY PRODUKTU
 */
function vytvorKartu(konzole: any): string {
    const konecnaCena = konzole.vypocitejKonecnouCenu();
    let specinfo = "";
    
    // Zjistíme typ konzole a podle toho vytvoříme doplňující text
    if (konzole instanceof Handheld) {
        specinfo = `Stav: ${konzole.stavDispleje}`;
    } else if (konzole instanceof DomaciKonsole) {
        specinfo = `Ovladačů: ${konzole.pocetOvladacu} ks`;
    }

    return `
        <div class="console-card">
            <img src="${konzole.fotoUrl}" class="console-img-file" alt="${konzole.nazev}" 
                 onerror="this.src='obrazky/placeholder.png';">
            <div class="console-info">
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
 * FUNKCE PRO INICIALIZACI A VYKRESLENÍ E-SHOPU
 */
function inicializujEshop() {
    console.log("Eshop se inicializuje...");

    // OPRAVA: Data čteme bezpečně až tady, když víme, že prohlížeč načetl okno a data.js existuje!
    // @ts-ignore
    const NABIDKA_KONZOLI: any[] = (window as any).NABIDKA_KONZOLI;

    const domesticContainer = document.getElementById('domestic-list');
    const handheldContainer = document.getElementById('handheld-list');

    // Kontrola, zda data z data.js vůbec dorazila
    if (typeof NABIDKA_KONZOLI === 'undefined' || !NABIDKA_KONZOLI) {
        console.error("Data nebyla nalezena! Zkontroluj, zda je v HTML načten data.js před app.js");
        return;
    }

    // Vyčištění starého obsahu z HTML stránek
    if (domesticContainer) domesticContainer.innerHTML = "";
    if (handheldContainer) handheldContainer.innerHTML = "";

    // Projdeme pole dat a vyrobíme z nich objekty (instance tříd)
    NABIDKA_KONZOLI.forEach((item: any) => {
        let novaKonzole: any;

        if (item.typ === "handheld") {
            novaKonzole = new Handheld(item.nazev, item.vyrobce, item.cena, item.region, item.stav || "Neznámý");
            novaKonzole.id = item.id;
            novaKonzole.fotoUrl = `obrazky/${item.foto || 'placeholder.png'}`;
            
            if (handheldContainer) {
                handheldContainer.innerHTML += vytvorKartu(novaKonzole);
            }
        } else {
            novaKonzole = new DomaciKonsole(item.nazev, item.vyrobce, item.cena, item.region, item.ovladace || 1);
            novaKonzole.id = item.id;
            novaKonzole.fotoUrl = `obrazky/${item.foto || 'placeholder.png'}`;
            
            if (domesticContainer) {
                domesticContainer.innerHTML += vytvorKartu(novaKonzole);
            }
        }
    });
}

// Spustíme eshop ve chvíli, kdy prohlížeč načte celé okno
window.addEventListener('load', inicializujEshop);

/**
 * GLOBÁLNÍ FUNKCE PRO PŘIDÁNÍ DO KOŠÍKU A PŘESMĚROVÁNÍ
 */
(window as any).pridejDoKosiku = function(idKonzole: number) {
    // OPRAVA: Vytáhneme si čerstvá data přímo z globálního okna prohlížeče
    // @ts-ignore
    const NABIDKA_KONZOLI: any[] = (window as any).NABIDKA_KONZOLI;

    if (!NABIDKA_KONZOLI) {
        console.error("Nelze přidat do košíku, data nejsou načtená!");
        return;
    }

    // 1. Vyhledáme položku v surových datech podle ID
    const vybranaPolozka = NABIDKA_KONZOLI.find((k: any) => k.id === idKonzole);
    
    if (vybranaPolozka) {
        // 2. Vytáhneme starý košík z localStorage, nebo vytvoříme prázdné pole []
        let aktualniKosik = JSON.parse(localStorage.getItem('mujKosik') || '[]');
        
        // Zjistíme si finální cenu pro košík podle toho, co je to za typ
        let docasnyObjekt = vybranaPolozka.typ === "handheld" 
            ? new Handheld(vybranaPolozka.nazev, vybranaPolozka.vyrobce, vybranaPolozka.cena, vybranaPolozka.region, vybranaPolozka.stav || "Neznámý")
            : new DomaciKonsole(vybranaPolozka.nazev, vybranaPolozka.vyrobce, vybranaPolozka.cena, vybranaPolozka.region, vybranaPolozka.ovladace || 1);
        
        // Do ukládaného objektu přidáme vypočtenou cenu, abychom ji v košíku hned viděli
        const ukladanyProdukt = {
            id: vybranaPolozka.id,
            nazev: vybranaPolozka.nazev,
            vyrobce: vybranaPolozka.vyrobce,
            cena: docasnyObjekt.vypocitejKonecnouCenu(), // Vypočtená cena s marží a doplňky
            foto: vybranaPolozka.foto || 'placeholder.png',
            typ: vybranaPolozka.typ,
            spec: vybranaPolozka.typ === "handheld" ? `Stav: ${vybranaPolozka.stav}` : `Ovladačů: ${vybranaPolozka.ovladace} ks`
        };

        // 3. Přidáme upravený produkt do pole košíku
        aktualniKosik.push(ukladanyProdukt);
        
        // 4. Uložíme celý nový seznam zpět do paměti prohlížeče
        localStorage.setItem('mujKosik', JSON.stringify(aktualniKosik));
        
        // 5. Přesměrováváme na správný soubor index4.html
        window.location.href = "index4.html";
    } else {
        console.error("Konzole s ID " + idKonzole + " nebyla nalezena!");
    }
};