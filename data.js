"use strict";
var NABIDKA_KONZOLI = [
    // --- NINTENDO ---
    { id: 1, typ: "handheld", nazev: "Nintendo 3DS XL", vyrobce: "Nintendo", cena: 4500, region: "PAL", stav: "Výborný", foto: "n3ds.png" },
    { id: 2, typ: "handheld", nazev: "GameBoy Color", vyrobce: "Nintendo", cena: 3200, region: "NTSC-J", stav: "Sběratelský", foto: "gbc.png" },
    { id: 3, typ: "handheld", nazev: "Nintendo DS Lite", vyrobce: "Nintendo", cena: 1800, region: "PAL", stav: "Opotřebený", foto: "ndsl.png" },
    { id: 4, typ: "domaci", nazev: "Nintendo GameCube", vyrobce: "Nintendo", cena: 4800, region: "PAL", ovladace: 4, foto: "gamecube.png" },
    { id: 5, typ: "domaci", nazev: "Nintendo Wii", vyrobce: "Nintendo", cena: 1500, region: "PAL", ovladace: 2, foto: "wii.png" },
    { id: 6, typ: "domaci", nazev: "Super Nintendo (SNES)", vyrobce: "Nintendo", cena: 3900, region: "PAL", ovladace: 2, foto: "snes.png" },
    { id: 7, typ: "handheld", nazev: "GameBoy Advance SP", vyrobce: "Nintendo", cena: 2800, region: "NTSC-U", stav: "Jako nový", foto: "gbasp.png" },
    { id: 8, typ: "handheld", nazev: "Nintendo DSi", vyrobce: "Nintendo", cena: 1200, region: "PAL", stav: "Poškrábaný", foto: "ndsi.png" },
    // --- SONY ---
    { id: 9, typ: "domaci", nazev: "PlayStation 2 Slim", vyrobce: "Sony", cena: 2500, region: "PAL", ovladace: 2, foto: "ps2slim.png" },
    { id: 10, typ: "handheld", nazev: "PSP 3000", vyrobce: "Sony", cena: 2200, region: "PAL", stav: "Dobrý", foto: "psp.png" },
    { id: 11, typ: "domaci", nazev: "PlayStation 1 (Fat)", vyrobce: "Sony", cena: 3500, region: "NTSC-U", ovladace: 1, foto: "ps1.png" },
    { id: 12, typ: "handheld", nazev: "PlayStation Vita", vyrobce: "Sony", cena: 3800, region: "PAL", stav: "Výborný", foto: "psvita.png" },
    { id: 13, typ: "domaci", nazev: "PlayStation 3 Fat", vyrobce: "Sony", cena: 2900, region: "PAL", ovladace: 1, foto: "ps3.png" },
    // --- MICROSOFT ---
    { id: 14, typ: "domaci", nazev: "Xbox 360 (Jasper)", vyrobce: "Microsoft", cena: 1900, region: "PAL", ovladace: 2, foto: "xbox360.png" },
    { id: 15, typ: "domaci", nazev: "Původní Xbox", vyrobce: "Microsoft", cena: 4200, region: "PAL", ovladace: 1, foto: "xbox.png" },
    // --- SEGA ---
    { id: 16, typ: "domaci", nazev: "Dreamcast", vyrobce: "Sega", cena: 5900, region: "NTSC-J", ovladace: 1, foto: "dreamcast.png" },
    { id: 17, typ: "domaci", nazev: "Mega Drive II", vyrobce: "Sega", cena: 2100, region: "PAL", ovladace: 2, foto: "megadrive.png" },
    { id: 18, typ: "handheld", nazev: "Game Gear", vyrobce: "Sega", cena: 4500, region: "PAL", stav: "Po repasi", foto: "gamegear.png" },
    { id: 19, typ: "domaci", nazev: "Saturn", vyrobce: "Sega", cena: 5500, region: "NTSC-J", ovladace: 1, foto: "saturn.png" },
    // --- OSTATNÍ ---
    { id: 20, typ: "domaci", nazev: "Atari 2600", vyrobce: "Atari", cena: 4600, region: "PAL", ovladace: 2, foto: "atari2600.png" },
    // --- NOVÉ DOMÁCÍ KONZOLE (10 ks) ---
    { id: 21, typ: "domaci", nazev: "PlayStation 5", vyrobce: "Sony", cena: 18500, region: "Standard", ovladace: 1, foto: "ps5.png" },
    { id: 22, typ: "domaci", nazev: "Xbox Series X", vyrobce: "Microsoft", cena: 12400, region: "Standard", ovladace: 2, foto: "xboxsx.png" },
    { id: 23, typ: "domaci", nazev: "Nintendo 64", vyrobce: "Nintendo", cena: 3200, region: "PAL", ovladace: 1, foto: "n64.png" },
    { id: 24, typ: "domaci", nazev: "NES (Nintendo Entertainment System)", vyrobce: "Nintendo", cena: 4100, region: "NTSC-U", ovladace: 2, foto: "nes.png" },
    { id: 25, typ: "domaci", nazev: "PlayStation 4", vyrobce: "Sony", cena: 5500, region: "Standard", ovladace: 1, foto: "ps4.png" },
    { id: 26, typ: "domaci", nazev: "Xbox One X", vyrobce: "Microsoft", cena: 4800, region: "Standard", ovladace: 1, foto: "xboxonex.png" },
    { id: 27, typ: "domaci", nazev: "Sega Master System", vyrobce: "Sega", cena: 2900, region: "PAL", ovladace: 2, foto: "mastersystem.png" },
    { id: 28, typ: "domaci", nazev: "Panasonic 3DO FZ-1", vyrobce: "Panasonic", cena: 7200, region: "NTSC-U", ovladace: 1, foto: "3do.png" },
    { id: 29, typ: "domaci", nazev: "Neo Geo AES", vyrobce: "SNK", cena: 14900, region: "NTSC-J", ovladace: 1, foto: "neogeo.png" },
    { id: 30, typ: "domaci", nazev: "Amiga CD32", vyrobce: "Commodore", cena: 8900, region: "PAL", ovladace: 1, foto: "amigacd32.png" },
    // --- NOVÉ HANDHELDY / KAPESNÍ KONZOLE (10 ks) ---
    { id: 31, typ: "handheld", nazev: "Switch OLED", vyrobce: "Nintendo", cena: 7800, region: "Standard", stav: "Jako nový", foto: "switch_oled.png" },
    { id: 32, typ: "handheld", nazev: "Steam Deck OLED", vyrobce: "Valve", cena: 13900, region: "Standard", stav: "Rozbaleno", foto: "steamdeck.png" },
    { id: 33, typ: "handheld", nazev: "Game Boy Classic (DMG-01)", vyrobce: "Nintendo", cena: 3900, region: "Standard", stav: "Sběratelský", foto: "gbclassic.png" },
    { id: 34, typ: "handheld", nazev: "Atari Lynx II", vyrobce: "Atari", cena: 5900, region: "Standard", stav: "Po repasi", foto: "atarilynx.png" },
    { id: 35, typ: "handheld", nazev: "ASUS ROG Ally", vyrobce: "ASUS", cena: 14500, region: "Standard", stav: "Výborný", foto: "rogally.png" },
    { id: 36, typ: "handheld", nazev: "Neo Geo Pocket Color", vyrobce: "SNK", cena: 4300, region: "NTSC-J", stav: "Zachovalý", foto: "ngpc.png" },
    { id: 37, typ: "handheld", nazev: "Nintendo Virtual Boy", vyrobce: "Nintendo", cena: 9500, region: "NTSC-U", stav: "Kompletní v krabici", foto: "virtualboy.png" },
    { id: 38, typ: "handheld", nazev: "WonderSwan Color", vyrobce: "Bandai", cena: 2600, region: "NTSC-J", stav: "Dobrý", foto: "wscolor.png" },
    { id: 39, typ: "handheld", nazev: "Sega Nomad", vyrobce: "Sega", cena: 11500, region: "NTSC-U", stav: "Drobné škrábance", foto: "nomad.png" }
];
