const units = {
  "TFT13_Red": "https://cdn.lolchess.gg/upload/images/champions/Violet_1731058155-Violet.jpg",
  "TFT13_Lieutenant": "https://cdn.lolchess.gg/upload/images/champions/Sevika_1731058172-Sevika.jpg",
  "TFT13_Jinx": "https://cdn.lolchess.gg/upload/images/champions/Jinx_1731058201-Jinx.png",
  "TFT13_Garen": "https://cdn.lolchess.gg/upload/images/champions/Garen_1731058172-Garen.png",
  "TFT13_Vi": "	https://cdn.lolchess.gg/upload/images/champions/Vi_1731058374-Vi.png",
  "TFT13_Prime": "https://cdn.lolchess.gg/upload/images/champions/Vander_1731058270-Vander.jpg",
  "TFT13_Draven": "https://cdn.lolchess.gg/upload/images/champions/Draven_1731058141-Draven.png",
  "TFT13_Blue": "https://cdn.lolchess.gg/upload/images/champions/Powder_1731058254-Powder.jpg",
  "TFT13_Gangplank": "https://cdn.lolchess.gg/upload/images/champions/Gangplank_1731058166-Gangplank.png",
  "TFT13_Darius": "https://cdn.lolchess.gg/upload/images/champions/Darius_1731058129-Darius.png",
  "TFT13_Heimerdinger": "https://cdn.lolchess.gg/upload/images/champions/Heimerdinger_1731058177-Heimerdinger.png",
  "TFT13_RenataGlasc": "https://cdn.lolchess.gg/upload/images/champions/Renata_1731058281-RenataGlasc.png",
  "TFT13_Illaoi": "https://cdn.lolchess.gg/upload/images/champions/Illaoi_1731058183-Illaoi.png",
  "TFT13_Elise": "https://cdn.lolchess.gg/upload/images/champions/Elise_1731058154-Elise.png",
  "tft13_elise": "https://cdn.lolchess.gg/upload/images/champions/Elise_1731058154-Elise.png",
  "TFT13_NunuWillump": "https://cdn.lolchess.gg/upload/images/champions/Nunu_1731058262-NunuWillump.png",
  "TFT13_Vladimir": "https://cdn.lolchess.gg/upload/images/champions/Vladimir_1731058382-Vladimir.png",
  "TFT13_Rell": "https://cdn.lolchess.gg/upload/images/champions/Rell_1731058269-Rell.png",
  "TFT13_Morgana": "https://cdn.lolchess.gg/upload/images/champions/Morgana_1731058248-Morgana.png",
  "TFT13_Sion": "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sion.png",
  "TFT13_Rumble": "https://cdn.lolchess.gg/upload/images/champions/Rumble_1731058291-Rumble.png",
  "TFT13_Ekko": "https://cdn.lolchess.gg/upload/images/champions/Ekko_1731058147-Ekko.png",
  "TFT13_DrMundo": "https://cdn.lolchess.gg/upload/images/champions/DrMundo_1731058135-DrMundo.png",
  "TFT13_Twitch": "https://cdn.lolchess.gg/upload/images/champions/Twitch_1731058349-Twitch.png",
  "TFT13_Chainsaw": "https://cdn.lolchess.gg/upload/images/champions/Renni_1731058306-Renni.png",
  "TFT13_Sett": "https://cdn.lolchess.gg/upload/images/champions/Sett_1731058298-Sett.png",
  "TFT13_Trundle": "https://cdn.lolchess.gg/upload/images/champions/Trundle_1731058338-Trundle.png",
  "TFT13_Fish": "https://cdn.lolchess.gg/upload/images/champions/Steb_1731058204-Steb.jpg",
  "TFT13_Shooter": "https://cdn.lolchess.gg/upload/images/champions/Maddie_1731058145-Maddie.jpg",
  "TFT13_Zoe": "https://cdn.lolchess.gg/upload/images/champions/Zoe_1731058401-Zoe.png",
  "TFT13_Nami": "https://cdn.lolchess.gg/upload/images/champions/Nami_1731058255-Nami.png",
  "TFT13_Akali": "https://cdn.lolchess.gg/upload/images/champions/Akali_1731058073-Akali.png",
  "TFT13_Ezreal": "https://cdn.lolchess.gg/upload/images/champions/Ezreal_1731058160-Ezreal.png",
  "TFT13_FlyGuy": "https://cdn.lolchess.gg/upload/images/champions/Scar_1731058197-Scar.jpg",
  "TFT13_Swain": "https://cdn.lolchess.gg/upload/images/champions/Swain_1731058325-Swain.png",
  "tft13_swain": "https://cdn.lolchess.gg/upload/images/champions/Swain_1731058325-Swain.png",
  "TFT13_Urgot": "https://cdn.lolchess.gg/upload/images/champions/Urgot_1731058357-Urgot.png",
  "TFT13_Beardy": "https://cdn.lolchess.gg/upload/images/champions/Loris_1731058129-Loris.jpg",
  "TFT13_Zeri": "https://cdn.lolchess.gg/upload/images/champions/Zeri_1731058388-Zeri.png",
  "TFT13_Ambessa": "https://cdn.lolchess.gg/upload/images/champions/Ambessa_1731058093-Ambessa.png",
  "TFT13_Camille": "https://cdn.lolchess.gg/upload/images/champions/Camille_1731058112-Camille.png",
  "TFT13_Leona": "https://cdn.lolchess.gg/upload/images/champions/Leona_1731058220-Leona.png",
  "TFT13_Corki": "https://cdn.lolchess.gg/upload/images/champions/Corki_1731058123-Corki.png",
  "TFT13_Tristana": "https://cdn.lolchess.gg/upload/images/champions/Tristana_1731058331-Tristana.png",
  "TFT13_Lux": "https://cdn.lolchess.gg/upload/images/champions/Lux_1731058228-Lux.png",
  "TFT13_Gremlin": "https://cdn.lolchess.gg/upload/images/champions/Smeech_1731058189-Smeech.jpg",
  "TFT13_Silco": "https://cdn.lolchess.gg/upload/images/champions/Silco_1731058214-Silco.jpg",
  "TFT13_Mordekaiser": "https://cdn.lolchess.gg/upload/images/champions/Mordekaiser_1731058242-Mordekaiser.png",
  "TFT13_Cassiopeia": "https://cdn.lolchess.gg/upload/images/champions/Cassiopeia_1731058118-Cassiopeia.png",
  "TFT13_Ziggs": "https://cdn.lolchess.gg/upload/images/champions/Ziggs_1731058394-Ziggs.png",
  "TFT13_KogMaw": "https://cdn.lolchess.gg/upload/images/champions/KogMaw_1731058209-KogMaw.png",
  "TFT13_Blitzcrank": "https://cdn.lolchess.gg/upload/images/champions/Blitzcrank_1731058100-Blitzcrank.png",
  "TFT13_Zyra": "https://cdn.lolchess.gg/upload/images/champions/Zyra_1731058407-Zyra.png",
  "TFT13_Malzahar": "https://cdn.lolchess.gg/upload/images/champions/Malzahar_1731058235-Malzahar.png",
  "TFT13_LeBlanc": "https://cdn.lolchess.gg/upload/images/champions/Leblanc_1731058215-LeBlanc.png",
  "TFT13_Jayce": "https://cdn.lolchess.gg/upload/images/champions/Jayce_1731058195-Jayce.png",
  "TFT13_Caitlyn": "https://cdn.lolchess.gg/upload/images/champions/Caitlyn_1731058105-Caitlyn.png",

}

module.exports = {
  units
}