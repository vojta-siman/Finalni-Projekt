abstract class Konzole {
    protected marzeEshopu: number = 1.15;
    public fotoUrl: string = "";

    constructor(
        private _nazev: string,
        private _vyrobce: string,
        protected _zakladniCena: number,
        public region: string
    ) {}

    get nazev(): string { return this._nazev; }
    get vyrobce(): string { return this._vyrobce; }

    abstract vypocitejKonecnouCenu(): number;
}

class Handheld extends Konzole {
    private priplatekPouzdro: number = 300;
    constructor(nazev: string, vyrobce: string, cena: number, region: string, public stavDispleje: string) {
        super(nazev, vyrobce, cena, region);
    }
    vypocitejKonecnouCenu(): number {
        return Math.round((this._zakladniCena + this.priplatekPouzdro) * this.marzeEshopu);
    }
}

class DomaciKonsole extends Konzole {
    private cenaZaOvladac: number = 500;
    constructor(nazev: string, vyrobce: string, cena: number, region: string, public pocetOvladacu: number) {
        super(nazev, vyrobce, cena, region);
    }
    vypocitejKonecnouCenu(): number {
        const cenaOvladacu = this.pocetOvladacu * this.cenaZaOvladac;
        return Math.round((this._zakladniCena + cenaOvladacu) * this.marzeEshopu);
    }
}

function vytvorKartu(konzole: any): string {
    const konecnaCena = konzole.vypocitejKonecnouCenu();
    let specinfo = "";
    
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
                <button class="buy-btn">KOUPIT</button>
            </div>
        </div>
    `;
}

function inicializujEshop() {
    console.log("Eshop se inicializuje...");

    const domesticContainer = document.getElementById('domestic-list');
    const handheldContainer = document.getElementById('handheld-list');

    // Kontrola, zda data existují (přichází z data.js)
    if (typeof NABIDKA_KONZOLI === 'undefined') {
        console.error("Data nebyla nalezena! Zkontroluj, zda je v HTML načten data.js před app.js");
        return;
    }

    // Vyčistíme kontejnery, než začneme kreslit
    if (domesticContainer) domesticContainer.innerHTML = "";
    if (handheldContainer) handheldContainer.innerHTML = "";

    NABIDKA_KONZOLI.forEach(item => {
        let novaKonzole: any;

        if (item.typ === "handheld") {
            novaKonzole = new Handheld(item.nazev, item.vyrobce, item.cena, item.region, item.stav || "Neznámý");
            novaKonzole.fotoUrl = `obrazky/${item.foto || 'placeholder.png'}`;
            if (handheldContainer) {
                handheldContainer.innerHTML += vytvorKartu(novaKonzole);
            }
        } else {
            novaKonzole = new DomaciKonsole(item.nazev, item.vyrobce, item.cena, item.region, item.ovladace || 1);
            novaKonzole.fotoUrl = `obrazky/${item.foto || 'placeholder.png'}`;
            if (domesticContainer) {
                domesticContainer.innerHTML += vytvorKartu(novaKonzole);
            }
        }
    });
}

// SPUŠTĚNÍ - Čeká, až se načte celá stránka
window.addEventListener('load', inicializujEshop);