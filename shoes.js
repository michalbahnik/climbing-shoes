// Climbing shoe dataset. Specs are compiled from manufacturer descriptions and reviews;
// subjective values (width, volume, stiffness) are approximate and fit varies by foot.
//
// Row format:
// [brand, model, gender, closure, width, volume, asymmetry, downturn, stiffness, rubber, uses, priceEUR]
//   gender:    U = unisex, MW = separate men's and women's versions, M = men's, W = women's
//   closure:   L = lace, V = velcro / strap, S = slipper
//   width:     N = narrow, M = medium, W = wide
//   volume:    L = low, M = standard, H = high
//   asymmetry: 0 none, 1 slight, 2 moderate, 3 strong
//   downturn:  0 flat, 1 slight, 2 moderate, 3 aggressive
//   stiffness: 1 very soft .. 5 very stiff
//   uses:      space-separated tags
//   price:     approximate list price in EUR
window.SHOES_RAW = [
  // La Sportiva
  ["La Sportiva","Solution","MW","V","M","M",3,3,3,"Vibram XS Grip2","bouldering sport",175],
  ["La Sportiva","Solution Comp","MW","V","M","L",3,3,2,"Vibram XS Grip2","bouldering competition gym",185],
  ["La Sportiva","Skwama","MW","V","M","M",2,2,2,"Vibram XS Grip2","bouldering sport",175],
  ["La Sportiva","Skwama Vegan","U","V","M","M",2,2,2,"Vibram XS Grip2","bouldering sport vegan",175],
  ["La Sportiva","Theory","MW","V","M","L",3,3,1,"Vibram XS Grip2","bouldering competition gym",185],
  ["La Sportiva","Ondra Comp","U","V","M","L",1,3,1,"Vibram XS Grip2","bouldering competition gym",199],
  ["La Sportiva","Python","U","S","N","L",2,2,1,"Vibram XS Grip2","bouldering gym sport",150],
  ["La Sportiva","Futura","MW","V","N","L",2,2,2,"Vibram XS Grip2","sport bouldering",180],
  ["La Sportiva","Genius","U","L","N","M",2,2,2,"Vibram XS Grip2","sport bouldering",185],
  ["La Sportiva","Testarossa","U","V","N","L",3,3,4,"Vibram XS Edge","sport bouldering",185],
  ["La Sportiva","Miura","MW","L","N","L",2,2,4,"Vibram XS Edge","sport trad",175],
  ["La Sportiva","Miura VS","MW","V","N","M",3,2,4,"Vibram XS Edge","sport bouldering",180],
  ["La Sportiva","Otaki","MW","V","M","M",2,2,3,"Vibram XS Edge","sport bouldering",175],
  ["La Sportiva","Katana","MW","V","M","M",2,1,4,"Vibram XS Edge","sport multipitch trad",175],
  ["La Sportiva","Katana Laces","MW","L","M","M",2,1,4,"Vibram XS Edge","trad multipitch sport",175],
  ["La Sportiva","Mantra","U","V","W","H",1,2,1,"Vibram XS Grip2","bouldering gym",175],
  ["La Sportiva","Kubo","MW","V","W","H",1,0,3,"Vibram XS Edge","gym multipitch all-round",160],
  ["La Sportiva","TC Pro","U","L","M","M",1,0,5,"Vibram XS Edge","trad multipitch crack",215],
  ["La Sportiva","Mythos","MW","L","W","H",0,0,3,"Vibram XS Edge","trad multipitch crack beginner",160],
  ["La Sportiva","Mythos Eco","MW","L","W","H",0,0,3,"Vibram XS Edge","trad multipitch vegan",165],
  ["La Sportiva","Finale","MW","L","W","H",1,0,3,"Vibram XS Edge","beginner gym trad",110],
  ["La Sportiva","Finale VS","MW","V","W","H",1,0,3,"Vibram XS Edge","beginner gym",115],
  ["La Sportiva","Aragon","MW","V","M","M",1,1,3,"Vibram XS Grip2","gym sport all-round",125],
  ["La Sportiva","Cobra","U","S","M","M",1,1,1,"Vibram XS Grip2","gym bouldering",125],
  ["La Sportiva","Cobra Eco","U","S","M","M",1,1,1,"Vibram XS Grip2","gym bouldering vegan",130],
  ["La Sportiva","Tarantula","MW","V","W","H",0,0,4,"FriXion RS","beginner gym",95],
  ["La Sportiva","Tarantulace","MW","L","W","H",0,0,4,"FriXion RS","beginner gym",90],
  ["La Sportiva","Oxygym","MW","V","W","H",0,0,3,"FriXion RS","beginner gym",95],

  // Scarpa
  ["Scarpa","Instinct VS","MW","V","M","M",2,2,3,"Vibram XS Edge","sport bouldering",180],
  ["Scarpa","Instinct VSR","MW","V","M","M",2,2,1,"Vibram XS Grip2","bouldering competition gym",185],
  ["Scarpa","Instinct VSR LV","U","V","M","L",2,2,1,"Vibram XS Grip2","bouldering competition gym",185],
  ["Scarpa","Instinct Lace","U","L","M","M",2,2,3,"Vibram XS Edge","sport",180],
  ["Scarpa","Instinct S","U","S","M","M",2,2,1,"Vibram XS Grip2","bouldering gym",160],
  ["Scarpa","Drago","U","V","N","L",2,3,1,"Vibram XS Grip2","bouldering competition",185],
  ["Scarpa","Drago LV","U","V","N","L",2,3,1,"Vibram XS Grip2","bouldering competition",185],
  ["Scarpa","Drago XT","U","V","N","L",2,3,1,"Vibram XS Grip2","bouldering competition",205],
  ["Scarpa","Furia Air","U","V","N","L",2,2,1,"Vibram XS Grip2","bouldering sport",199],
  ["Scarpa","Furia S","U","V","N","L",3,3,1,"Vibram XS Grip2","bouldering sport",199],
  ["Scarpa","Chimera","U","V","M","M",3,3,2,"Vibram XS Grip2","bouldering sport",199],
  ["Scarpa","Booster","U","V","M","M",3,3,3,"Vibram XS Edge","sport",189],
  ["Scarpa","Mago","U","V","N","L",3,3,4,"Vibram XS Edge","sport",190],
  ["Scarpa","Vapor V","MW","V","M","M",2,2,3,"Vibram XS Edge","sport gym bouldering",165],
  ["Scarpa","Vapor Lace","U","L","M","M",2,2,3,"Vibram XS Edge","sport gym",165],
  ["Scarpa","Vapor S","U","S","M","M",2,2,2,"Vibram XS Grip2","bouldering gym",160],
  ["Scarpa","Veloce","MW","V","M","M",1,1,2,"Vibram XS Grip2","gym bouldering",140],
  ["Scarpa","Veloce L","MW","L","M","M",1,1,2,"Vibram XS Grip2","gym sport",140],
  ["Scarpa","Generator V","MW","V","M","M",1,1,3,"Vibram XS Grip2","gym sport",145],
  ["Scarpa","Arpia V","MW","V","M","M",1,1,3,"Vibram XS Grip2","gym sport beginner",135],
  ["Scarpa","Velocity","MW","V","M","H",1,1,3,"Vibram XS Grip2","gym beginner",130],
  ["Scarpa","Maestro Mid Eco","MW","L","M","M",1,0,4,"Vibram XS Edge","trad multipitch crack vegan",199],
  ["Scarpa","Force V","MW","V","W","H",0,0,4,"Vibram XS Edge","beginner gym trad",110],
  ["Scarpa","Origin","MW","V","W","H",0,0,3,"Vibram XS Grip","beginner gym",99],
  ["Scarpa","Reflex V","MW","V","W","H",0,0,4,"Vision","beginner gym",85],

  // Tenaya
  ["Tenaya","Mastia","U","V","N","L",3,3,2,"Vibram XS Grip2","bouldering sport",180],
  ["Tenaya","Iati","U","V","N","M",2,2,3,"Vibram XS Grip2","sport bouldering",175],
  ["Tenaya","Oasi","U","V","N","M",2,2,3,"Vibram XS Grip2","sport bouldering",180],
  ["Tenaya","Oasi LV","U","V","N","L",2,2,3,"Vibram XS Grip2","sport bouldering",180],
  ["Tenaya","Indalo","U","V","M","M",1,1,3,"Vibram XS Grip2","gym sport all-round",165],
  ["Tenaya","Mundaka","U","V","M","M",1,1,1,"Vibram XS Grip2","bouldering gym slab",160],
  ["Tenaya","Tanta","U","L","M","M",1,1,4,"Vibram XS Edge","trad multipitch",165],
  ["Tenaya","Ra","U","V","W","H",0,0,3,"Vibram XS Grip2","gym beginner",145],
  ["Tenaya","Arai","U","V","W","H",0,0,3,"Vibram XS Grip2","beginner gym",115],

  // Ocun
  ["Ocun","Ozone","MW","V","M","M",2,2,3,"Ocun CAT","sport bouldering",145],
  ["Ocun","Ozone QC","U","V","M","M",2,2,3,"Ocun CAT","sport bouldering",140],
  ["Ocun","Ozone LU","U","L","M","M",2,2,3,"Ocun CAT","sport",140],
  ["Ocun","Bullit","U","V","M","M",3,3,3,"Ocun CAT","sport bouldering",159],
  ["Ocun","Diamond","U","V","M","L",2,3,1,"Ocun CAT","bouldering competition gym",159],
  ["Ocun","Havoc","U","V","M","M",2,2,2,"Ocun CAT","bouldering gym",139],
  ["Ocun","Oxi","U","V","M","M",2,2,2,"Ocun CAT","bouldering sport",145],
  ["Ocun","Jett QC","U","V","M","M",1,1,2,"Ocun CAT","gym bouldering all-round",135],
  ["Ocun","Jett LU","U","L","M","M",1,1,2,"Ocun CAT","gym sport all-round",135],
  ["Ocun","Jett Crack","U","L","M","M",0,0,4,"Ocun CAT","trad crack multipitch",145],
  ["Ocun","Striker QC","U","V","W","H",1,1,3,"Ocun CAT","gym sport",125],
  ["Ocun","Striker LU","U","L","W","H",1,1,3,"Ocun CAT","gym sport",125],
  ["Ocun","Advancer QC","U","V","W","H",1,1,3,"Ocun CAT","gym beginner",115],
  ["Ocun","Advancer LU","U","L","W","H",1,1,3,"Ocun CAT","gym beginner",115],
  ["Ocun","Crest QC","U","V","W","H",0,0,4,"Ocun CAT","beginner gym",95],
  ["Ocun","Crest LU","U","L","W","H",0,0,4,"Ocun CAT","beginner gym",95],
  ["Ocun","Rival QC","U","V","W","H",0,0,4,"Ocun CAT","beginner gym",85],

  // Five Ten
  ["Five Ten","Hiangle","MW","V","M","M",2,3,2,"Stealth C4","bouldering sport",165],
  ["Five Ten","Hiangle Pro","U","V","M","L",3,3,2,"Stealth Mi6","bouldering competition",199],
  ["Five Ten","Dragon","U","V","M","M",2,3,3,"Stealth HF","sport bouldering",180],
  ["Five Ten","Aleon","U","V","M","M",2,2,3,"Stealth C4","sport bouldering",185],
  ["Five Ten","NIAD VCS","MW","V","M","M",1,1,3,"Stealth C4","gym sport all-round",160],
  ["Five Ten","NIAD Lace","MW","L","M","M",1,1,3,"Stealth C4","sport trad all-round",160],
  ["Five Ten","NIAD Moccasym","U","S","W","H",0,0,2,"Stealth C4","gym crack trad",130],
  ["Five Ten","Crawe","U","L","M","M",1,1,4,"Stealth C4","trad multipitch sport",170],
  ["Five Ten","Anasazi VCS","U","V","M","M",1,0,4,"Stealth C4","sport trad",160],
  ["Five Ten","Kirigami","MW","V","W","H",0,0,3,"Stealth C4","beginner gym",95],

  // Black Diamond
  ["Black Diamond","Shadow","U","V","M","M",3,3,2,"Neo Fuse","bouldering sport",190],
  ["Black Diamond","Shadow LV","U","V","M","L",3,3,2,"Neo Fuse","bouldering sport",190],
  ["Black Diamond","Zone","U","V","M","M",2,2,3,"Neo Fuse","sport bouldering",180],
  ["Black Diamond","Zone LV","U","V","M","L",2,2,3,"Neo Fuse","sport bouldering",180],
  ["Black Diamond","Aspect","U","L","M","M",1,1,4,"Neo Fuse","trad multipitch",180],
  ["Black Diamond","Aspect Pro","U","L","M","M",2,1,4,"Neo Fuse","trad sport multipitch",190],
  ["Black Diamond","Method","MW","V","M","M",1,1,3,"NeoFriction","gym sport",140],
  ["Black Diamond","Method S","MW","V","M","M",1,1,2,"NeoFriction","gym bouldering",145],
  ["Black Diamond","Momentum","MW","V","W","H",0,0,3,"NeoFriction","beginner gym vegan",100],
  ["Black Diamond","Momentum Lace","MW","L","W","H",0,0,3,"NeoFriction","beginner gym trad vegan",100],

  // Evolv
  ["Evolv","Shaman","U","V","W","H",2,2,3,"TRAX SAS","sport bouldering vegan",175],
  ["Evolv","Shaman LV","U","V","M","L",2,2,3,"TRAX SAS","sport bouldering vegan",175],
  ["Evolv","Shaman Pro","U","V","M","M",3,3,3,"TRAX SAS","sport bouldering vegan",190],
  ["Evolv","Phantom","U","V","M","M",3,3,2,"TRAX SAS","bouldering sport vegan",185],
  ["Evolv","Phantom LV","U","V","M","L",3,3,2,"TRAX SAS","bouldering sport vegan",185],
  ["Evolv","Zenist","U","V","M","M",2,2,1,"TRAX XE","bouldering gym vegan",175],
  ["Evolv","Zenist Pro","U","V","M","M",2,3,1,"TRAX XE","bouldering competition vegan",185],
  ["Evolv","Agro","U","V","M","M",3,3,2,"TRAX SAS","bouldering vegan",180],
  ["Evolv","Kronos","U","V","W","H",1,1,3,"TRAX SAS","sport gym vegan",160],
  ["Evolv","V6","U","V","W","H",1,1,3,"TRAX SAS","gym all-round vegan",150],
  ["Evolv","Elektra","W","V","M","L",1,1,3,"TRAX SAS","gym sport vegan",150],
  ["Evolv","Defy","MW","V","W","H",0,0,4,"TRAX XE","beginner gym vegan",99],
  ["Evolv","Yosemite Bum","U","V","W","H",0,0,4,"TRAX SAS","trad crack vegan",150],

  // Butora
  ["Butora","Acro (narrow fit)","U","V","N","L",3,3,3,"NEO Fuse","sport bouldering",185],
  ["Butora","Acro (wide fit)","U","V","W","H",3,3,3,"NEO Fuse","sport bouldering",185],
  ["Butora","Narsha","U","V","M","M",2,2,3,"NEO Fuse","sport bouldering",165],
  ["Butora","Comet","U","V","M","M",1,2,1,"NEO Fuse","bouldering gym",160],
  ["Butora","Endeavor (narrow fit)","U","L","N","L",1,1,3,"NEO Fuse","trad sport",165],
  ["Butora","Endeavor (wide fit)","U","L","W","H",1,1,3,"NEO Fuse","trad sport",165],
  ["Butora","Altura","U","L","W","H",0,0,4,"NEO Fuse","trad multipitch crack",175],
  ["Butora","Brava","U","V","W","H",0,0,3,"NEO Fuse","beginner gym",95],

  // Mad Rock
  ["Mad Rock","Drone 2.0 LV","U","V","N","L",2,2,3,"Science Friction 3.0","sport bouldering",165],
  ["Mad Rock","Drone 2.0 HV","U","V","W","H",2,2,3,"Science Friction 3.0","sport bouldering",165],
  ["Mad Rock","Shark 2.0","U","V","M","M",3,3,2,"Science Friction 3.0","bouldering",160],
  ["Mad Rock","Remora","U","V","W","H",1,1,3,"Science Friction 3.0","gym trad all-round",145],
  ["Mad Rock","Remora LV","U","V","M","L",1,1,3,"Science Friction 3.0","gym trad all-round",145],
  ["Mad Rock","Haywire","U","V","W","H",1,1,3,"Science Friction 3.0","gym all-round",130],
  ["Mad Rock","Drifter","U","V","W","H",0,0,4,"Science Friction 3.0","beginner gym",85],

  // Unparallel
  ["Unparallel","Souped Up","U","V","M","M",2,2,3,"Unparallel RH","sport bouldering",175],
  ["Unparallel","Souped Up LV","U","V","M","L",2,2,3,"Unparallel RH","sport bouldering",175],
  ["Unparallel","Regulus","U","S","M","M",2,2,1,"Unparallel RS","bouldering gym",165],
  ["Unparallel","Regulus LV","U","S","M","L",2,2,1,"Unparallel RS","bouldering gym",165],
  ["Unparallel","Flagship LV","U","L","N","L",2,1,4,"Unparallel RH","sport trad",180],
  ["Unparallel","UP-Lace","U","L","M","M",1,1,3,"Unparallel RH","trad sport all-round",170],
  ["Unparallel","TN Pro","U","L","M","M",1,0,5,"Unparallel RH","trad multipitch crack",210],

  // Red Chili
  ["Red Chili","Voltage 2","U","V","M","M",2,2,3,"Vibram XS Grip2","sport bouldering",165],
  ["Red Chili","Fusion VCR","U","V","M","M",1,1,3,"RX1","gym sport",140],
  ["Red Chili","Durango VCR","U","V","W","H",1,1,3,"RX1","gym beginner",120],
  ["Red Chili","Ventic Air","U","V","W","H",0,0,3,"RX1","beginner gym",105],

  // Boreal
  ["Boreal","Satori","U","V","M","M",2,2,3,"Zenith","sport bouldering",140],
  ["Boreal","Joker","MW","V","W","H",0,0,4,"Zenith","beginner gym",90],
  ["Boreal","Joker Lace","U","L","W","H",0,0,4,"Zenith","beginner gym trad",90],

  // So iLL
  ["So iLL","Free Range","U","V","M","M",1,1,2,"So iLL Dark","gym bouldering",150],
  ["So iLL","Free Range Pro","U","V","M","M",2,2,2,"So iLL Dark","bouldering gym",170],
  ["So iLL","Street","U","V","W","H",1,1,3,"So iLL Dark","gym all-round",140],

  // Wild Climb
  ["Wild Climb","Pantera 2.0","U","V","M","M",2,2,3,"Vibram XS Grip2","sport bouldering",165],
];
