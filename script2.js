"use strict";
/**
 * ČISTÝ SKRIPT PRO STRÁNKU KOŠÍKU (index4.html)
 */
function vykresliKosik() {
    // 1. Najdeme HTML elementy, do kterých budeme vypisovat data
    const kontejner = document.getElementById('cart-items-container');
    const mezisoucetElement = document.getElementById('summary-subtotal');
    const marzeElement = document.getElementById('summary-margin'); // PŘIDÁNO: Element pro zobrazení marže
    const celkemElement = document.getElementById('cart-total-price');
    // 2. Vytáhneme produkty uložené v paměti prohlížeče
    const kosik = JSON.parse(localStorage.getItem('mujKosik') || '[]');
    if (!kontejner) {
        console.error("Chyba: Element #cart-items-container nebyl na stránce nalezen!");
        return;
    }
    // Vyčistíme kontejner, abychom produkty neduplikovali
    kontejner.innerHTML = '';
    // Pokud je košík prázdný, vypíšeme informaci uživateli
    if (kosik.length === 0) {
        kontejner.innerHTML = `<p class="empty-cart-msg" style="text-align: center; padding: 20px; color: #a0a5c1;">Tvůj košík je zatím prázdný.</p>`;
        if (mezisoucetElement)
            mezisoucetElement.innerText = '0 Kč';
        if (marzeElement)
            marzeElement.innerText = '0 Kč'; // Vynulování marže při prázdném košíku
        if (celkemElement)
            celkemElement.innerText = '0 Kč';
        return;
    }
    let mezisoucetCena = 0;
    // 3. Projdeme každý produkt v košíku a vygenerujeme pro něj HTML kartu
    kosik.forEach((produkt, index) => {
        mezisoucetCena += produkt.cena;
        kontejner.innerHTML += `
            <div class="cart-item-card">
                <div class="cart-item-img">
                    <img src="obrazky/${produkt.foto}" alt="${produkt.nazev}" onerror="this.src='obrazky/placeholder.png';">
                </div>
                <div class="cart-item-details">
                    <h3>${produkt.vyrobce} ${produkt.nazev}</h3>
                    <p class="cart-item-spec">${produkt.spec}</p>
                </div>
                <div class="cart-item-price">${produkt.cena} Kč</div>
                <button class="remove-item-btn" onclick="odebratZKosiku(${index})" title="Odebrat z košíku">&times;</button>
            </div>
        `;
    });
    // VÝPOČET: Spočítáme čistých 5 % marže a zaokrouhlíme ji na celé koruny
    const hodnotaMarze = Math.round(mezisoucetCena * 0.05);
    // Celková cena je mezisoučet + tato marže
    const konecnaCelkovaCena = mezisoucetCena + hodnotaMarze;
    // 4. Propíšeme výsledné ceny do pravého panelu shrnutí
    if (mezisoucetElement)
        mezisoucetElement.innerText = `${mezisoucetCena} Kč`;
    if (marzeElement)
        marzeElement.innerText = `${hodnotaMarze} Kč`; // Zápis samotné marže v Kč
    if (celkemElement)
        celkemElement.innerText = `${konecnaCelkovaCena} Kč`;
}
/**
 * FUNKCE PRO ODEBRÁNÍ PRODUKTU Z KOŠÍKU
 */
window.odebratZKosiku = function (indexProSmazani) {
    let kosik = JSON.parse(localStorage.getItem('mujKosik') || '[]');
    kosik.splice(indexProSmazani, 1);
    localStorage.setItem('mujKosik', JSON.stringify(kosik));
    vykresliKosik();
};
// Spustíme vykreslení košíku hned po načtení stránky index4.html
window.addEventListener('load', vykresliKosik);
