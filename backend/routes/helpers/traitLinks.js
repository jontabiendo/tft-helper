const traits = {
  "TFT5_Draconic": "https://cdn.lolchess.gg/upload/images/traits/Set5Draconic_black_1727055068-Draconic.svg",
  "TFT5_Victorious" : "https://cdn.lolchess.gg/upload/images/traits/Set5Victorious_black_1727055046-Victorious.svg",
  "TFT5_Cannoneer": "https://cdn.lolchess.gg/upload/images/traits/Set5Cannoneer_black_1727055181-Cannoneer.svg",
  "TFT5_Caretaker": "https://cdn.lolchess.gg/upload/images/traits/Set5Caretaker_black_1727055141-Caretaker.svg",
  "TFT5_Ironclad": "https://cdn.lolchess.gg/upload/images/traits/Set5Ironclad_black_1727055074-Ironclad.svg",
  "TFT5_Knight": "https://cdn.lolchess.gg/upload/images/traits/Set5Knight_black_1727055103-Knight.svg",
  "TFT5_Sentinel": "https://cdn.lolchess.gg/upload/images/traits/Set5Sentinel_black_1727054956-Sentinel.svg",
  "TFT5_Assassin": "https://cdn.lolchess.gg/upload/images/traits/Set5Assassin_black_1727055134-Assassin.svg",
  "TFT5_Nightbringer": "https://cdn.lolchess.gg/upload/images/traits/Set5Nightbringer_black_1727055061-Nightbringer.svg",
  "TFT5_Cavalier": "https://cdn.lolchess.gg/upload/images/traits/Set5Cavalier_black_1727055097-Cavalier.svg",
  "TFT5_Brawler": "https://cdn.lolchess.gg/upload/images/traits/Set5Brawler_black_1727055126-Brawler.svg",
  "TFT5_Skirmisher": "https://cdn.lolchess.gg/upload/images/traits/Set5Skirmisher_black_1727055175-Skirmisher.svg",
  "TFT5_Cruel": "https://cdn.lolchess.gg/upload/images/traits/Set5Cruel_black_1727055090-Cruel.svg",
  "TFT5_Hellion": "https://cdn.lolchess.gg/upload/images/traits/Set5Hellion_black_1727055052-Hellion.svg",
  "TFT5_Spellweaver": "https://cdn.lolchess.gg/upload/images/traits/Set5Spellweaver_black_1727055168-Spellweaver.svg",
  "TFT_Ranger": "https://cdn.lolchess.gg/upload/images/traits/Set5Ranger_black_1727055160-Ranger.svg",
  "TFT5_Inanimate": "https://cdn.lolchess.gg/upload/images/traits/Set5Inanimate_black_1727055029-Inanimate.svg",
  "TFT5_Forgotten": "https://cdn.lolchess.gg/upload/images/traits/Set5Forgotten_black_1727055012-Forgotten.svg",
  "TFT5_Legionaire": "https://cdn.lolchess.gg/upload/images/traits/Set5Legionnaire_black_1727055083-Legionnaire.svg",
  "TFT13_Hoverboard": "https://cdn.lolchess.gg/upload/images/traits/Firelight_black_1731044903-Firelight.svg",
  "TFT13_HighRoller": "https://cdn.lolchess.gg/upload/images/traits/HighRoller_black_1731045617-HighRoller.svg",
  "TFT13_Watcher": 	"https://cdn.lolchess.gg/upload/images/traits/Watcher_black_1731045790-Watcher.svg",
  "TFT13_Ambassador": "https://cdn.lolchess.gg/upload/images/traits/Emissary_black_1731045378-Emissary.svg",
  "TFT13_Ambusher": "https://cdn.lolchess.gg/upload/images/traits/Ambusher_black_1731045834-Ambusher.svg",
  "TFT13_Hextech": "https://cdn.lolchess.gg/upload/images/traits/Automata_black_1731045428-Automata.svg",
  "TFT13_Sniper": "https://cdn.lolchess.gg/upload/images/traits/Sniper_black_1731045886-Sniper.svg",
  "TFT13_Rebel": "https://cdn.lolchess.gg/upload/images/traits/Rebel_black_1731044495-Rebel.svg",
  "TFT13_Scrap": "https://cdn.lolchess.gg/upload/images/traits/Scrap_black_1731044470-Scrap.svg",
  "TFT13_Squad": "https://cdn.lolchess.gg/upload/images/traits/Enforcer_black_1731045576-Enforcer.svg",
  "TFT13_Titan": "https://cdn.lolchess.gg/upload/images/traits/Sentinel_black_1731045721-Sentinel.svg",
  "TFT13_Bruiser": "https://cdn.lolchess.gg/upload/images/traits/Bruiser_black_1731045867-Bruiser.svg",
  "TFT13_JunkerKing": "https://cdn.lolchess.gg/upload/images/traits/JunkerKing_black_1731045468-junkerKing.svg",
  "TFT13_FormSwapper": "https://cdn.lolchess.gg/upload/images/traits/FormSwapper_black_1731045938-Swapper.svg",
  "TFT13_Martialist": "https://cdn.lolchess.gg/upload/images/traits/Artillerist_black_1731045912-Artillerist.svg",
  "TFT13_Academy": "https://cdn.lolchess.gg/upload/images/traits/Acamedy_black_1731045414-Academy.svg",
  "TFT13_Invoker": "https://cdn.lolchess.gg/upload/images/traits/Visionary_black_1731045850-Visonary.svg",
  "TFT13_Family": "https://cdn.lolchess.gg/upload/images/traits/Family_black_1731043808-Family.svg",
  "TFT13_Pugilist": "https://cdn.lolchess.gg/upload/images/traits/PitFighter_black_1731045747-PitFighter.svg",
  "TFT13_Warband": "https://cdn.lolchess.gg/upload/images/traits/Conqueror_black_1731045441-Conqueror.svg",
  "TFT13_Cabal": "https://cdn.lolchess.gg/upload/images/traits/BlackRose_black_1731044449-Blackrose.svg",
  "TFT13_Experiment": "https://cdn.lolchess.gg/upload/images/traits/Experiment_black_1731045402-Experiment.svg",
  "TFT13_Sorcerer": "	https://cdn.lolchess.gg/upload/images/traits/Sorcerer_black_1731045823-Sorcerer.svg",
  "TFT13_Teamup_Geniuses": "https://cdn.lolchess.gg/upload/images/traits/Geniuses_black_1731912519-Geniuses.svg",
  "TFT13_Infused": "https://cdn.lolchess.gg/upload/images/traits/Dominator_black_1731045899-Dominator.svg",
  "TFT13_Teamup_UnlikelyDuo": "https://cdn.lolchess.gg/upload/images/traits/UnlikelyDuo_black_1731912448-Unlikely%20Duo.svg",
  "TFT13_Challenger": "https://cdn.lolchess.gg/upload/images/traits/Quickstriker_black_1731045806-QuickStriker.svg",
  "TFT13_Crime": "https://cdn.lolchess.gg/upload/images/traits/ChemBaron_black_1731045675-ChemBaron.svg",
  "TFT13_MissMageTrait": "https://cdn.lolchess.gg/upload/images/traits/BanishedMage_black_1732695186-banishedmage.svg",
  "TFT13_MachineHerald": "https://cdn.lolchess.gg/upload/images/traits/MachineHerald_black_1732695097-machineherald.svg",
  "tft13_teamup_sisters": "https://cdn.lolchess.gg/upload/images/traits/Sisters_black_1731912487-Sisters.svg",
  "tft13_teamup_menaces": "https://cdn.lolchess.gg/upload/images/traits/Menaces_black_1731912471-Menaces.svg"
}

let newTraits = {}

Object.entries(traits).map(([key, value]) => {
  newTraits[key.toLowerCase()] =  value
})

module.exports = {
  newTraits
}