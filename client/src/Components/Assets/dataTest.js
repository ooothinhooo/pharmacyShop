const dataTest = [
  {
    id: 1,
    name: "Dandruff",
    image: "http://dummyimage.com/187x100.png/ff4444/ffffff",
    type: "Meijer Distribution",
    old_price: 333482,
    new_price: 550768,
  },
  {
    id: 2,
    name: "Silver Sulfadiazene",
    image: "http://dummyimage.com/106x100.png/cc0000/ffffff",
    type: "Watson Laboratories, Inc.",
    old_price: 401370,
    new_price: 411471,
  },
  {
    id: 3,
    name: "Metoprolol Succinate",
    image: "http://dummyimage.com/244x100.png/dddddd/000000",
    type: "Rebel Distributors Corp",
    old_price: 345085,
    new_price: 426622,
  },
  {
    id: 4,
    name: "Temazepam",
    image: "http://dummyimage.com/151x100.png/5fa2dd/ffffff",
    type: "Unit Dose Services",
    old_price: 109303,
    new_price: 223109,
  },
  {
    id: 5,
    name: "ASPIRIN",
    image: "http://dummyimage.com/177x100.png/cc0000/ffffff",
    type: "Time-Cap Labs, Inc",
    old_price: 239561,
    new_price: 131785,
  },
  {
    id: 6,
    name: "Amlodipine Besylate and Benazepril Hydrochloride",
    image: "http://dummyimage.com/165x100.png/5fa2dd/ffffff",
    type: "PD-Rx Pharmaceuticals, Inc.",
    old_price: 254750,
    new_price: 562648,
  },
  {
    id: 7,
    name: "Torsemide",
    image: "http://dummyimage.com/188x100.png/cc0000/ffffff",
    type: "Apotex Corp.",
    old_price: 135927,
    new_price: 411362,
  },
  {
    id: 8,
    name: "Venlafaxine",
    image: "http://dummyimage.com/235x100.png/cc0000/ffffff",
    type: "Clinical Solutions Wholesale",
    old_price: 266170,
    new_price: 56787,
  },
  {
    id: 9,
    name: "CEFPODOXIME PROXETIL",
    image: "http://dummyimage.com/205x100.png/dddddd/000000",
    type: "Aurobindo Pharma Limited",
    old_price: 63642,
    new_price: 373877,
  },
  {
    id: 10,
    name: "Sore Throat",
    image: "http://dummyimage.com/204x100.png/cc0000/ffffff",
    type: "Deseret Biologicals, Inc.",
    old_price: 164913,
    new_price: 408210,
  },
  {
    id: 11,
    name: "Oxcarbazepine",
    image: "http://dummyimage.com/248x100.png/dddddd/000000",
    type: "Apotex Corp.",
    old_price: 572519,
    new_price: 483685,
  },
  {
    id: 12,
    name: "Pre-Scrub II",
    image: "http://dummyimage.com/133x100.png/ff4444/ffffff",
    type: "BioMed Systems, Inc.",
    old_price: 557505,
    new_price: 570505,
  },
  {
    id: 13,
    name: "Diltiazem Hydrochloride",
    image: "http://dummyimage.com/218x100.png/dddddd/000000",
    type: "American Health Packaging",
    old_price: 104760,
    new_price: 29467,
  },
  {
    id: 14,
    name: "OXYCODONE AND ACETAMINOPHEN",
    image: "http://dummyimage.com/162x100.png/dddddd/000000",
    type: "Bryant Ranch Prepack",
    old_price: 316861,
    new_price: 496798,
  },
  {
    id: 15,
    name: "Cefepime",
    image: "http://dummyimage.com/184x100.png/cc0000/ffffff",
    type: "Apotex Corporation",
    old_price: 38611,
    new_price: 172093,
  },
  {
    id: 16,
    name: "Molds, Rusts and Smuts, Hormodendrum cladosporioides",
    image: "http://dummyimage.com/147x100.png/cc0000/ffffff",
    type: "Jubilant HollisterStier LLC",
    old_price: 299162,
    new_price: 154851,
  },
  {
    id: 17,
    name: "ibuprofen",
    image: "http://dummyimage.com/202x100.png/dddddd/000000",
    type: "Rite Aid Corporation",
    old_price: 87864,
    new_price: 242365,
  },
  {
    id: 18,
    name: "Sertraline Hydrochloride",
    image: "http://dummyimage.com/102x100.png/cc0000/ffffff",
    type: "Legacy Pharmaceutical Packaging",
    old_price: 537898,
    new_price: 378237,
  },
  {
    id: 19,
    name: "Throat Formula",
    image: "http://dummyimage.com/148x100.png/5fa2dd/ffffff",
    type: "Apotheca Company",
    old_price: 436595,
    new_price: 319693,
  },
  {
    id: 20,
    name: "Catapres",
    image: "http://dummyimage.com/168x100.png/cc0000/ffffff",
    type: "Boehringer Ingelheim Pharmaceuticals Inc.",
    old_price: 374622,
    new_price: 478374,
  },
  {
    id: 21,
    name: "Burr Oak",
    image: "http://dummyimage.com/129x100.png/ff4444/ffffff",
    type: "Nelco Laboratories, Inc.",
    old_price: 249594,
    new_price: 90397,
  },
  {
    id: 22,
    name: "Tendon Rescue",
    image: "http://dummyimage.com/164x100.png/dddddd/000000",
    type: "Peaceful Mountain, Inc.",
    old_price: 201784,
    new_price: 495947,
  },
  {
    id: 23,
    name: "Standardized Grass Pollen, Grass Mix 4",
    image: "http://dummyimage.com/233x100.png/ff4444/ffffff",
    type: "Jubilant HollisterStier LLC",
    old_price: 499024,
    new_price: 309256,
  },
  {
    id: 24,
    name: "SQUASH",
    image: "http://dummyimage.com/246x100.png/dddddd/000000",
    type: "ALK-Abello, Inc.",
    old_price: 287979,
    new_price: 324022,
  },
  {
    id: 25,
    name: "Ethambutol",
    image: "http://dummyimage.com/124x100.png/cc0000/ffffff",
    type: "Versa Pharmaceutical",
    old_price: 40269,
    new_price: 310200,
  },
  {
    id: 26,
    name: "Mag-Al Plus",
    image: "http://dummyimage.com/199x100.png/ff4444/ffffff",
    type: "Cardinal Health",
    old_price: 75469,
    new_price: 459190,
  },
  {
    id: 27,
    name: "Tirosint",
    image: "http://dummyimage.com/215x100.png/cc0000/ffffff",
    type: "Akrimax Pharmaceuticals, LLC",
    old_price: 485125,
    new_price: 193382,
  },
  {
    id: 28,
    name: "Givenchy TEINT COUTURE Long Wearing Fluid Foundation with Sunscreen Broad Spectrum SPF 20 ELEGANT BROWN",
    image: "http://dummyimage.com/191x100.png/5fa2dd/ffffff",
    type: "LVMH Fragrance Brands",
    old_price: 379827,
    new_price: 371470,
  },
  {
    id: 29,
    name: "CLEAR DIFFERENCE BB COMPLEXION PERFECTING BB BROAD SPECTRUM SPF 35",
    image: "http://dummyimage.com/217x100.png/cc0000/ffffff",
    type: "ESTEE LAUDER INC",
    old_price: 597883,
    new_price: 49934,
  },
  {
    id: 30,
    name: "Sugar Maple",
    image: "http://dummyimage.com/192x100.png/5fa2dd/ffffff",
    type: "Nelco Laboratories, Inc.",
    old_price: 394932,
    new_price: 164406,
  },
  {
    id: 31,
    name: "Ketorolac Tromethamine",
    image: "http://dummyimage.com/139x100.png/5fa2dd/ffffff",
    type: "Apotex Corp.",
    old_price: 36874,
    new_price: 195064,
  },
  {
    id: 32,
    name: "Doxercalciferol",
    image: "http://dummyimage.com/149x100.png/ff4444/ffffff",
    type: "Roxane Laboratories, Inc.",
    old_price: 367279,
    new_price: 32754,
  },
  {
    id: 33,
    name: "Lucky",
    image: "http://dummyimage.com/139x100.png/ff4444/ffffff",
    type: "Delta Brands Inc.",
    old_price: 89872,
    new_price: 56803,
  },
  {
    id: 34,
    name: "pain relief",
    image: "http://dummyimage.com/151x100.png/cc0000/ffffff",
    type: "Walgreen Company",
    old_price: 47228,
    new_price: 558304,
  },
  {
    id: 35,
    name: "CEFACLOR",
    image: "http://dummyimage.com/179x100.png/ff4444/ffffff",
    type: "West-ward Pharmaceutical Corp",
    old_price: 36260,
    new_price: 508509,
  },
  {
    id: 36,
    name: "Head and Shoulders 2in1",
    image: "http://dummyimage.com/163x100.png/ff4444/ffffff",
    type: "Procter & Gamble Manufacturing Co.",
    old_price: 243971,
    new_price: 146204,
  },
  {
    id: 37,
    name: "Nifedical",
    image: "http://dummyimage.com/121x100.png/cc0000/ffffff",
    type: "Cardinal Health",
    old_price: 486965,
    new_price: 319821,
  },
  {
    id: 38,
    name: "AMITRIPTYLINE HYDROCHLORIDE",
    image: "http://dummyimage.com/197x100.png/5fa2dd/ffffff",
    type: "Accord Healthcare Inc.",
    old_price: 555675,
    new_price: 127332,
  },
  {
    id: 39,
    name: "Warfarin Sodium",
    image: "http://dummyimage.com/229x100.png/5fa2dd/ffffff",
    type: "Aidarex Pharmaceuticals LLC",
    old_price: 82060,
    new_price: 429248,
  },
  {
    id: 40,
    name: "DawnMist Fluoride",
    image: "http://dummyimage.com/242x100.png/ff4444/ffffff",
    type: "Dukal Corporation",
    old_price: 529786,
    new_price: 557073,
  },
  {
    id: 41,
    name: "Olanzapine",
    image: "http://dummyimage.com/158x100.png/ff4444/ffffff",
    type: "Dr.Reddy's laboratories Ltd.",
    old_price: 29892,
    new_price: 386069,
  },
  {
    id: 42,
    name: "MDSolarSciences SPF40 No Touch Body",
    image: "http://dummyimage.com/148x100.png/5fa2dd/ffffff",
    type: "Ecometics, Inc",
    old_price: 592833,
    new_price: 201079,
  },
  {
    id: 43,
    name: "RU-HIST-D",
    image: "http://dummyimage.com/190x100.png/5fa2dd/ffffff",
    type: "CARWIN ASSOCIATES, INC",
    old_price: 192933,
    new_price: 131452,
  },
  {
    id: 44,
    name: "AMBROSIA TENUIFOLIA POLLEN",
    image: "http://dummyimage.com/242x100.png/dddddd/000000",
    type: "ALK-Abello, Inc.",
    old_price: 11922,
    new_price: 171105,
  },
  {
    id: 45,
    name: "Melatonin Forte",
    image: "http://dummyimage.com/214x100.png/cc0000/ffffff",
    type: "Apotheca Company",
    old_price: 395073,
    new_price: 85783,
  },
  {
    id: 46,
    name: "Spironolactone",
    image: "http://dummyimage.com/138x100.png/dddddd/000000",
    type: "UDL Laboratories, Inc.",
    old_price: 445075,
    new_price: 134140,
  },
  {
    id: 47,
    name: "Care One Pain Relief",
    image: "http://dummyimage.com/227x100.png/5fa2dd/ffffff",
    type: "American Sales Company",
    old_price: 475896,
    new_price: 333575,
  },
  {
    id: 48,
    name: "Conney Aspirin Free",
    image: "http://dummyimage.com/180x100.png/5fa2dd/ffffff",
    type: "Conney Safety Products, LLC",
    old_price: 108133,
    new_price: 240306,
  },
  {
    id: 49,
    name: "Micardis HCT",
    image: "http://dummyimage.com/182x100.png/5fa2dd/ffffff",
    type: "Lake Erie Medical & Surgical Supply DBA Quality Care Products LLC",
    old_price: 131428,
    new_price: 491299,
  },
  {
    id: 50,
    name: "Nifedipine",
    image: "http://dummyimage.com/121x100.png/cc0000/ffffff",
    type: "Heritage Pharmaceuticals Inc.",
    old_price: 190094,
    new_price: 188507,
  },
];

export default dataTest;

