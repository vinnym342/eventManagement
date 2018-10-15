const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()
let venues = [
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/005/827/medium/Napoleon-Food-and-Wine-Bar-Restaurant-Tanjong-Pagar-Singapore-Party-Corporate-Wedding-Venuerific-1.jpg?1399260681",
        "tagline": "Napoleon Food & Wine Bar",
        "location": "Tanjong Pagar",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "Whether you are a wine connoisseur or just the occasional wine lover, at Napoleon you will be able to enjoy wines at your pace and comfort, in a cosy atmosphere."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/005/918/medium/The-Beast-Bar-Restaurant-Interior-Bugis-Singapore-Party-Corporate-Wedding-Venuerific-2.jpg?1399262063",
        "tagline": "The Beast",
        "location": "Bugis",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "The Beast has 2 levels which can be used for private events, networking, product launches, birthday parties and more."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/005/930/medium/Little-Olde-Gallery-Event-Space-Private-Estate-Katong-Singapore-Party-Corporate-Wedding-Others-Venuerific-1.jpg?1399262146",
        "tagline": "Little Olde Gallery",
        "location": "Katong",
        "eventType": [
            "Event space",
            " Private estate"
        ],
        "description": "A 1950s, early 60s event space tucked away in e east (Tanjong Katong)."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/005/995/medium/Wine-Universe-Restaurant-and-Wine-Bar-Restaurant-Cafe-Suntec-Singapore-Party-Wedding-Others-Venuerific-4.jpeg?1399263115",
        "tagline": "Wine Universe Restaurant & Wine Bar",
        "location": "Esplanade",
        "eventType": [
            "Bar",
            " Café",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Welcome to Wine Universe, where a treasury of wines from all over the world await you! Located in a corner of Millenia Walk in Singapore, our restaurant glassy exterior with its sidewalk alfresco lounge invites guests to step into its dynamic space incorporating a restaurant, a wine bar and retail-cellar."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/033/medium/Sevens-Yacht-Sentosa-Singapore-Party-Corporate-Wedding-Others-Venuerific-1.jpg?1399263602",
        "tagline": "Sevens Yacht",
        "location": "Sentosa",
        "eventType": [
            "Yacht"
        ],
        "description": "Ideal for a weekend soirée or corporate getaway with Sevens.Possess the ultimate luxurious motor yachts for short charters in Singapore to Nongsa Point Marina & Resort, and Montigo Resorts Nongsa within the island of Batam."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/051/medium/Mikanna-Luxury-Yacht-Sentosa-Singapore-Party-Corporate-Wedding-Others-Venuerific-3.jpg?1399263714",
        "tagline": "Mikanna Luxury Yacht",
        "location": "Sentosa",
        "eventType": [
            "Yacht"
        ],
        "description": "Designed by architects Morrelli & Melvin and built by award winning SA boat builder Robertson & Caine, Mikanna features ground breaking innovations in comfort, safety, and performance."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/070/medium/SG-Yacht-Sentosa-Singapore-Party-Corporate-Wedding-Others-Venuerific-1.jpg?1399263901",
        "tagline": "SG Yacht",
        "location": "Sentosa",
        "eventType": [
            "Yacht"
        ],
        "description": "Ideal for a weekend soirée or corporate getaway, Sgyacht and Sevens possess the ultimate luxurious motor yachts for short charters in Singapore to Nongsa Point Marina & Resort, and Montigo Resorts Nongsa within the island of Batam."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/259/medium/White-Sails-Yacht-StarGazer-Sentosa-Singapore-Party-Wedding-Others-Venuerific-1.jpg?1399265384",
        "tagline": "White Sails Yacht - StarGazer",
        "location": "Sentosa",
        "eventType": [
            "Yacht"
        ],
        "description": "A luxury yacht with full facilities onboard."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/508/medium/Into-the-woods-birthday-party.jpg?1522163989",
        "tagline": "Into The Woods",
        "location": "Chinatown",
        "eventType": [
            "Co-working space",
            " Event space",
            " Gallery",
            " Halal Venue",
            " Meeting Room/Space",
            " MICE",
            " Solemnisation",
            " Studio",
            " Unique venue"
        ],
        "description": "Host you event in a unique rustic environment right in the heart of a Heritage loft shop house in Chinatown."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/293/medium/mcgettigans_event_space_venuerific_singapore.jpg?1528367987",
        "tagline": "McGettigan's Clarke Quay",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "McGettigan’s Clarke Quay is the perfect venue for events from Dinner & Dance, Product launches, Corporate gatherings/parties/celebration to even that special birthday."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/585/medium/Cali-Cafe-Lunch-Venue.jpg?1523172265",
        "tagline": "Cali @ Rochester",
        "location": "Buona Vista",
        "eventType": [
            "Bar",
            " Café",
            " Kids & Recreational",
            " Event space",
            " Halal Venue",
            " Restaurant"
        ],
        "description": "PROMOTION: Spend S$2400 and above on the event booking at Cali and we will give S$300 cash dining voucher to use at any of the Cali Outlet."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/967/medium/IMG_0863.jpg?1516086957",
        "tagline": "Auditorium @ MOX, Katong Point",
        "location": "Joo Chiat",
        "eventType": [
            "Auditorium",
            " Co-working space",
            " Meeting Room/Space"
        ],
        "description": "Hold your talks, team brainstorming workshops and more at the MOX auditorium."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/883/medium/Arcadian-Mansion-Sentosa-Singapore.jpg?1514386225",
        "tagline": "Larkhill Mansion",
        "location": "Sentosa",
        "eventType": [
            "Event space",
            " Outdoors",
            " Private estate"
        ],
        "description": "Nestled in the scenic and beautiful area of Sentosa Island, Larkhill Mansion is the perfect event space to host celebrations such as corporate luncheons, dinner, seminars, cocktail parties, solemnization and even small intimate weddings."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/311/medium/Yan-Solemnisation.jpg?1528903213",
        "tagline": "Yàn",
        "location": "City Hall",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Restaurant"
        ],
        "description": "Drawing inspiration from the restaurant’s Chinese name ‘宴’ — the experience at Yàn is reminiscent of convivial gatherings and feelings of togetherness."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/452/medium/Alter_Ego_Venuerific_Singapore_Beer_Party_Venuerific.jpg?1510242498",
        "tagline": "Alter Ego",
        "location": "Esplanade",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Alter Ego is a beautiful event space which can cater to corporate events, birthdays and more."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/809/medium/KARA_Dessert_Bar_Cafe_Singapore_Seminar_Venue.jpeg?1512984308",
        "tagline": "KARA Cafe & Dessert Bar",
        "location": "Bukit Timah",
        "eventType": [
            "Café",
            " Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Restaurant"
        ],
        "description": "\"KARA MOMENTS\" is a warm, bright, and cozy space for all thing celebratory."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/799/medium/4.png?1512631637",
        "tagline": "Community Cove by PA Water-Venture",
        "location": "Kallang",
        "eventType": [
            "Club",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "Located at iconic beachfronts and waterfronts, Community Cove by PA Water-Venture offers you endless customisable options for your corporate function requirements."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/426/medium/CINCIN-EVENT-SPACE.jpg?1509961060",
        "tagline": "CIN CIN",
        "location": "Tanjong Pagar",
        "eventType": [
            "Bar",
            " Outdoors"
        ],
        "description": "CIN CIN with its stylish art décor interior is a specialist Gin bar."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/521/medium/Butter_Studio_Singapore_Venuerific_Party_Space.jpeg?1510629016",
        "tagline": "Butter Studio",
        "location": "Jalan Besar",
        "eventType": [
            "Café",
            " Halal Venue"
        ],
        "description": "“There is always room for cake.” Butter Studio is a homegrown artisan bakery dedicated to honor the craft of home baking while infusing a playful spin on familiar comforting bakes."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/922/medium/Laughing-Juice-Private-Event.jpg?1526574428",
        "tagline": "Laughing Juice ",
        "location": "Orchard Road",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Unique venue"
        ],
        "description": "Laughing Juice is an exclusive venue, suitable for private luncheons/dinners, birthday parties, gatherings and product launches."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/712/medium/Come-And-Say-Hello-Studio-Solemenisation-Venue.jpg?1538971208",
        "tagline": "Come and say hello studio",
        "location": "Tiong Bahru",
        "eventType": [
            "Co-working space",
            " Event space",
            " Meeting Room/Space",
            " Studio",
            " Unique venue"
        ],
        "description": "Nestled in a cosy neighbourhood filled with architectural, cultural and historic significance, our studio at Tiong Bahru is great for inspiring and creative events, workshops and private gatherings."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/623/medium/Meeting-Room-Rental-district6.jpg?1538463260",
        "tagline": "Meeting Room @ District 6",
        "location": "City Hall",
        "eventType": [
            "Co-working space",
            " Meeting Room/Space"
        ],
        "description": "District6 is a newly opened co-working space in the heart of Singapore, in City Hall."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/638/medium/Dinner-Setting-Pump-Room-Singapore.jpg?1538495165",
        "tagline": "The Pump Room",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Club",
            " Event space",
            " Restaurant",
            " Unique venue"
        ],
        "description": "The latest nightlife trailblazer to make waves in Singapore, The Pump Room is a unique dining, event space and entertainment venue occupying a prime spot in Clarke Quay - Singapore’s coveted F&B and lifestyle destination."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/703/medium/Latteria_Mozzarella-reception-event-venue.jpg?1538905385",
        "tagline": "Latteria Mozzarella",
        "location": "Duxton Hill",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Tucked away in a tranquil corner of the vibrant Duxton Hill, Latteria Mozzarella Bar invites you to enjoy a genuine, laid-back Italian dining experience."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/189/medium/Sprmrkt-unique-seminar-venue.jpg?1507305369",
        "tagline": "SPRMRKT Daily & SPRMRKT Kitchen + Bar",
        "location": "Robertson Quay",
        "eventType": [
            "Bar",
            " Café",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Located just outside of Singapore’s Central Business District and nestled in the idyllic Robertson Quay neighbourhood, SPRMRKT Daily and SPRMRKT Kitchen & Bar were officially opened to the public on 31 August 2016, occupying 2 floors within STPI — Creative Workshop & Gallery."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/478/medium/OTC-Cafe-Venue.jpg?1521775714",
        "tagline": "OTC Cafe",
        "location": "Bugis",
        "eventType": [
            "Café",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "Looking for an event space? Tucked away in a tranquil corner on Level 3 of the National Library, OTC Cafe is the perfect venue for your next private event, birthday bash, baby shower, corporate workshop, seminar, movie night and more!."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/677/medium/El-mero-mero-mexican-restaurant.jpg?1538646514",
        "tagline": "El Mero Mero",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "El Mero Mero, which means ‘the best of the best’ in Mexican slang, aims to excite and delight diners with the very best in contemporary Mexican cuisine."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/124/medium/Senor_Taco_Clarke_Quay_Dinners_Networking_Venuerific_Singapore.jpg?1485320656",
        "tagline": "Senor Taco @ Clarke Quay",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Club",
            " Restaurant"
        ],
        "description": "Señor Taco invokes the atmosphere of a typical mexican bar, rustic wooden- metal style of furniture; Señor Taco offers a great experience of how is a casual dinner in the streets of Mexico; we have a seating area and dance floor."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/396/medium/Jones-The-Grocer-Solemnization.jpg?1536736714",
        "tagline": "jones the grocer",
        "location": "Dempsey",
        "eventType": [
            "Café",
            " Event space",
            " Restaurant"
        ],
        "description": "A unique concept situated in the heart of Dempsey Hill."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/341/medium/Superyacht-Megaway-128-Event-Venue.jpg?1536572371",
        "tagline": "Superyacht Megaway 128",
        "location": "Sentosa",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Solemnisation",
            " Unique venue",
            " Yacht"
        ],
        "description": "The Megaway 128 is a luxury superyacht that offers four decks for lounging, relaxing and all-round unwinding."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/412/medium/PSB-Academy-STEM-Campus-Event-Venue.jpg?1536918083",
        "tagline": "PSB Academy STEM Campus",
        "location": "Toa Payoh",
        "eventType": [
            "Auditorium",
            " Event space",
            " Meeting Room/Space",
            " MICE"
        ],
        "description": "As one of Singapore's leading private education providers, our spaces are purpose-built for immersive learning, experimentation, and interactive discussion."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/406/medium/PSB-Academy-City-Campus-Lecture-Theatre.jpg?1536910726",
        "tagline": "PSB Academy City Campus",
        "location": "Marina Square",
        "eventType": [
            "Auditorium",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "As one of Singapore's leading private education providers, our spaces are purpose-built for immersive learning, experimentation, and interactive discussion."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/518/medium/Offsite-Meeting-Venue-Vertex-uno.jpg?1537849622",
        "tagline": "Vertex Uno",
        "location": "Ubi",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Unique venue"
        ],
        "description": "Vertex Uno is a newly established unique event space located in Ubi, Singapore."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/160/medium/Urban-Tavern-north-Meeting-Event-Venue.jpg?1535721161",
        "tagline": "Urban Tavern North",
        "location": "Admiralty",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "The perfect venue for all private parties, weddings & corporate events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/028/medium/Distrii-Conference-Hall-Rental.jpg?1534863485",
        "tagline": "Distrii Singapore Republic Plaza",
        "location": "Raffles Place",
        "eventType": [
            "Auditorium",
            " Co-working space",
            " Conference Hall",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "Distrii Singapore spans 7 floors in Republic Plaza and is home to private offices, meeting rooms, team spaces, hot desks, and a conference/event hall."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/961/medium/The-Nest-Birthday-Event-Venue.jpg?1533451730",
        "tagline": "The Nest, Laguna National Golf and Country Club",
        "location": "Upper East Coast",
        "eventType": [
            "Country Club",
            " Outdoors",
            " Restaurant",
            " Unique venue"
        ],
        "description": "The Nest is a casual dining restaurant located in the prestigious Laguna National Golf and Country Club."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/548/medium/Urban-Tavern-Birthday-Venue-Events.jpg?1538045183",
        "tagline": "Urban Tavern Okio",
        "location": "Novena",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "The perfect venue for all private parties, weddings & corporate events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/775/medium/Cocktail-Event-Venue-Hardrock-Cafe.jpg?1501143327",
        "tagline": "Hard Rock Cafe Singapore",
        "location": "Orchard Road",
        "eventType": [
            "Bar",
            " Event space",
            " Meeting Room/Space",
            " Restaurant"
        ],
        "description": "Hard Rock Cafe Singapore, sporting a new sleek contemporary look, adorned a refreshed collection of memorabilia, and an all-American food favourites! Singapore’s flagship outlet opened in February 1990 in the trendy Orchard Road area and has been rocking ever since, hosting events from the Asian Television Awards to The New Paper’s World Cup Finals’ screening."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/503/medium/IMG_9664.JPG?1537775294",
        "tagline": "Control Space by Parallel",
        "location": "Katong",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Studio",
            " Unique venue"
        ],
        "description": "Located in the heart of Katong, Parallel is proud to present our 2nd venue, Control Space."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/815/medium/District10-Dry-Aged-Steak-Restaurant.jpg?1501429158",
        "tagline": "District 10 Bar & Grill (Suntec)",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "Donning its new title of District 10 Bar & Grill of Suntec within Bonta Group, the small and neat 1,800 square-foot restaurant comes complete with a European Meat Showcase and Chiller for its Dry Aged Meat to cater to its Gourmet Loyalists."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/830/medium/Seminar-Setting-Venue-District10.jpg?1501429312",
        "tagline": "District 10 Bar & Restaurant (UE Square)",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Kids & Recreational",
            " Restaurant"
        ],
        "description": "The District 10 concept exudes an uninhibited, casual and fun dining energy with its brand of authentic classic European cuisine, beers, and a small menu of local flavors to serve the growing middle class of professionals, managers, executives and business specialists."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/676/medium/The-Arts-House-Facade-4.jpg?1459499483",
        "tagline": "The Arts House",
        "location": "City Hall",
        "eventType": [
            "Ballroom",
            " Conference Hall",
            " Event space",
            " Gallery",
            " Halal Venue",
            " Meeting Room/Space",
            " Museum",
            " Theater",
            " Unique venue"
        ],
        "description": "Occupying the almost 200-year-old building that was Singapore's first Parliament House, The Arts House has been offering its audiences a broad range of arts and culture programmes since its opening in 2004."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/541/medium/Aliwal-Arts-Centre.jpg?1498112270",
        "tagline": "Aliwal Arts Centre",
        "location": "Beach Road",
        "eventType": [
            "Event space",
            " Gallery",
            " Halal Venue",
            " Studio",
            " Unique venue"
        ],
        "description": "A versatile range of spaces that cater to various needs – from product launches to performances, workshops to workstations, set in the historical Kampong Gelam district."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/001/medium/Yumcha-Changi-Product-Lunch.jpg?1533894470",
        "tagline": "YC Events Space Changi ",
        "location": "Changi",
        "eventType": [
            "Event space",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Yum Cha [Changi] at UE Bizhub East is the latest addition to the Yum Cha Group and is one of the most suitable venues for your corporate event like a meeting, presentations, workshops, D&D etc or social event like weddings, birthday, baby shower, Engagement etc."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/890/medium/BoCHINche-Bar-Restaurant-River-Valley-Singapore-Party-Corporate-Wedding-Others-Venuerific-1.jpg?1401444211",
        "tagline": "boCHINche",
        "location": "River Valley",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Bochinche is a vibrant expression of enthusiasm, fuelled by chef Diego Jacquet’s knack for putting together bold flavours with quality products."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/680/medium/Dancing-Crab-Main-Hall-Restaurant-Bukit-Timah-Singapoere-Party-Corporate-Wedding-Venuerific-1.jpg?1399890313",
        "tagline": " Dancing Crab",
        "location": "Bukit Timah",
        "eventType": [
            "Restaurant"
        ],
        "description": "Welcome to Dancing Crab, serving a mix of robust, country-style Cajun seafood and the distinctive richness of Creole cuisine."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/008/477/medium/alforno-restaurant-italian-event-venues-east-coast-facet_edited-1.jpg?1420129593",
        "tagline": "Al Forno Restaurant",
        "location": "Katong",
        "eventType": [
            "Restaurant"
        ],
        "description": "Al Forno is one of the oldest restaurant in Singapore since 1995 which specializes in Italian food and pizzeria."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/005/638/medium/Noti-Restaurant-Bar-section-chinatown-singapore-restaurant-party-corporate-wedding-others-venuerific-1.jpg?1399027342",
        "tagline": "Noti Restaurant & Bar",
        "location": "Chinatown",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "Brought up in a family of successful restaurateurs in his hometown in the south of Italy, owner and chef Toni Rossetti brings to his very own restaurant – NOTI Restaurant & Bar, a taste of home, tradition and warmth of authentic Italian food from cherished family recipes and the flavours from this bountiful region."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/356/medium/Alaska-45-Motor-Yacht-West-Coast-Singapore-PArty-Corporate-Venuerific-1.jpg?1399266195",
        "tagline": "Alaska 45 Motor Yacht",
        "location": "West Coast",
        "eventType": [
            "Yacht"
        ],
        "description": "Brand new to the Singapore charter scene and managed by Lloyd Marine, this clipper-style, 45-foot motor yacht is 45 is ideal for fishing trips or entertaining up to 12 guests."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/357/medium/Lagoon-400-Tahnee-Yacht-Keppel-Singapore-Party-Corporate-Venuerific-1.jpg?1399266216",
        "tagline": "Lagoon 400 ‘Tahnee’",
        "location": "Keppel",
        "eventType": [
            "Yacht"
        ],
        "description": "Owned by Lloyd Marine, this beautiful Lagoon 400 sailing catamaran is ideal for intimate gatherings of up to 18 people."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/358/medium/Lagoon-450-Elysium-Yacht-Keppel-Singapore-Party-Corporate-Venuerific-1.jpg?1399266243",
        "tagline": "Lagoon 450 ‘Elysium’",
        "location": "Keppel",
        "eventType": [
            "Yacht"
        ],
        "description": "Owned by Lloyd Marine, this luxurious Lagoon 450 sailing catamaran offers the perfect venue for corporate or private events of up to 27 people."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/005/707/medium/Salt-Tapas-and-Bar-Restaurant-city-hall-singapore-party-corporate-wedding-venuerific-1.jpg?1399257974",
        "tagline": "Salt tapas & bar",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Restaurant",
            " Unique venue"
        ],
        "description": "Salt tapas & bar is an extension on the existing ‘Salt’ brand and creates a vibrant space that celebrates friendship, good wine and great food."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/851/medium/G-bar-and-grill-party.jpg?1532932171",
        "tagline": "G Bar & Grill",
        "location": "Bukit Merah",
        "eventType": [
            "Bar",
            " Café",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Rooftop",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "The Space: You'll be spoilt for choice."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/247/medium/Origin-Bar-Restaurant-Shangrila.jpg?1528093931",
        "tagline": "Origin Grill",
        "location": "Tanglin Road",
        "eventType": [
            "Bar",
            " Hotel",
            " Meeting Room/Space",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Origin Grill & Bar is inspired by the origin of flavours, travel adventures and Singapore’s illustrious history of bountiful trade, colonial charm and tropical splendour."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/274/medium/Origin-Bar-Party.jpg?1528362553",
        "tagline": "Origin Bar",
        "location": "Tanglin Road",
        "eventType": [
            "Bar",
            " Hotel"
        ],
        "description": "Origin Bar is one of the best venues to host cocktail networking, casual business meetings, chic birthday parties & dinner and dances."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/183/medium/Coffeemin-ClarkeQuay-Meeting.jpg?1527847792",
        "tagline": "Coffeemin",
        "location": "Clarke Quay",
        "eventType": [
            "Café",
            " Kids & Recreational",
            " Event space"
        ],
        "description": "Coffeemin offers a flexible event space & fun entertainment for all of your guests."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/712/medium/Come-And-Say-Hello-Studio-Solemenisation-Venue.jpg?1538971208",
        "tagline": "Come and say hello studio",
        "location": "Tiong Bahru",
        "eventType": [
            "Co-working space",
            " Event space",
            " Meeting Room/Space",
            " Studio",
            " Unique venue"
        ],
        "description": "Nestled in a cosy neighbourhood filled with architectural, cultural and historic significance, our studio at Tiong Bahru is great for inspiring and creative events, workshops and private gatherings."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/623/medium/Meeting-Room-Rental-district6.jpg?1538463260",
        "tagline": "Meeting Room @ District 6",
        "location": "City Hall",
        "eventType": [
            "Co-working space",
            " Meeting Room/Space"
        ],
        "description": "District6 is a newly opened co-working space in the heart of Singapore, in City Hall."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/638/medium/Dinner-Setting-Pump-Room-Singapore.jpg?1538495165",
        "tagline": "The Pump Room",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Club",
            " Event space",
            " Restaurant",
            " Unique venue"
        ],
        "description": "The latest nightlife trailblazer to make waves in Singapore, The Pump Room is a unique dining, event space and entertainment venue occupying a prime spot in Clarke Quay - Singapore’s coveted F&B and lifestyle destination."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/703/medium/Latteria_Mozzarella-reception-event-venue.jpg?1538905385",
        "tagline": "Latteria Mozzarella",
        "location": "Duxton Hill",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Tucked away in a tranquil corner of the vibrant Duxton Hill, Latteria Mozzarella Bar invites you to enjoy a genuine, laid-back Italian dining experience."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/189/medium/Sprmrkt-unique-seminar-venue.jpg?1507305369",
        "tagline": "SPRMRKT Daily & SPRMRKT Kitchen + Bar",
        "location": "Robertson Quay",
        "eventType": [
            "Bar",
            " Café",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Located just outside of Singapore’s Central Business District and nestled in the idyllic Robertson Quay neighbourhood, SPRMRKT Daily and SPRMRKT Kitchen & Bar were officially opened to the public on 31 August 2016, occupying 2 floors within STPI — Creative Workshop & Gallery."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/478/medium/OTC-Cafe-Venue.jpg?1521775714",
        "tagline": "OTC Cafe",
        "location": "Bugis",
        "eventType": [
            "Café",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "Looking for an event space? Tucked away in a tranquil corner on Level 3 of the National Library, OTC Cafe is the perfect venue for your next private event, birthday bash, baby shower, corporate workshop, seminar, movie night and more!."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/677/medium/El-mero-mero-mexican-restaurant.jpg?1538646514",
        "tagline": "El Mero Mero",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "El Mero Mero, which means ‘the best of the best’ in Mexican slang, aims to excite and delight diners with the very best in contemporary Mexican cuisine."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/124/medium/Senor_Taco_Clarke_Quay_Dinners_Networking_Venuerific_Singapore.jpg?1485320656",
        "tagline": "Senor Taco @ Clarke Quay",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Club",
            " Restaurant"
        ],
        "description": "Señor Taco invokes the atmosphere of a typical mexican bar, rustic wooden- metal style of furniture; Señor Taco offers a great experience of how is a casual dinner in the streets of Mexico; we have a seating area and dance floor."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/396/medium/Jones-The-Grocer-Solemnization.jpg?1536736714",
        "tagline": "jones the grocer",
        "location": "Dempsey",
        "eventType": [
            "Café",
            " Event space",
            " Restaurant"
        ],
        "description": "A unique concept situated in the heart of Dempsey Hill."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/341/medium/Superyacht-Megaway-128-Event-Venue.jpg?1536572371",
        "tagline": "Superyacht Megaway 128",
        "location": "Sentosa",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Solemnisation",
            " Unique venue",
            " Yacht"
        ],
        "description": "The Megaway 128 is a luxury superyacht that offers four decks for lounging, relaxing and all-round unwinding."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/412/medium/PSB-Academy-STEM-Campus-Event-Venue.jpg?1536918083",
        "tagline": "PSB Academy STEM Campus",
        "location": "Toa Payoh",
        "eventType": [
            "Auditorium",
            " Event space",
            " Meeting Room/Space",
            " MICE"
        ],
        "description": "As one of Singapore's leading private education providers, our spaces are purpose-built for immersive learning, experimentation, and interactive discussion."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/406/medium/PSB-Academy-City-Campus-Lecture-Theatre.jpg?1536910726",
        "tagline": "PSB Academy City Campus",
        "location": "Marina Square",
        "eventType": [
            "Auditorium",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "As one of Singapore's leading private education providers, our spaces are purpose-built for immersive learning, experimentation, and interactive discussion."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/477/medium/I-Am-private-Event.jpeg?1537529346",
        "tagline": "I am... HAJI LANE ",
        "location": "Bugis",
        "eventType": [
            "Café",
            " Event space",
            " Halal Venue",
            " Meeting Room/Space"
        ],
        "description": "We believed that location and ambience is the most important first impression of your event."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/642/medium/Kloud-Meeting-Space.jpg?1531812277",
        "tagline": "KLOUD Keppel Bay Tower",
        "location": "Harbourfront",
        "eventType": [
            "Bar",
            " Co-working space",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "For both thriving businesses and growing start-ups, KLOUD Keppel Bay Tower offers work space that inspires and grows with you."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/569/medium/Jurong_Town_Hall_Venuerific_Singapore_Meeting_Hall_Rental_Seminar.png?1531119176",
        "tagline": "Jurong Town Hall",
        "location": "Jurong East",
        "eventType": [
            "Auditorium",
            " Conference Hall",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Theater"
        ],
        "description": "Strategically located in the heart of Jurong with excellent connectivity to other parts of Singapore, as well as a wide range of amenities nearby, Jurong Town hall served as JTC’s first permanent headquarters from 1974 to 2000 and is key landmark that symbolises Singapore’s successful industrialisation programme during the nation-building years."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/469/medium/Pico-Creative-Centre-Corporate-Meeting.jpg?1530634612",
        "tagline": "PICO CREATIVE CENTRE ",
        "location": "Kallang",
        "eventType": [
            "Auditorium",
            " Conference Hall",
            " Meeting Room/Space",
            " Rooftop"
        ],
        "description": "Pico Creative Centre offers great flexible event spaces ,with the option of multi-function auditorium, green rooftop with pond, pop-up store space to cater different type of organizers."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/444/medium/The-Villa-Weddings.JPG?1530168822",
        "tagline": "The Villa, Singapore Botanic Garden ",
        "location": "Botanic Gardens",
        "eventType": [
            "Ballroom",
            " Conference Hall",
            " Event space",
            " Halal Venue",
            " Meeting Room/Space",
            " Solemnisation"
        ],
        "description": "Nestled in the Singapore's first UNESCO World Heritage Site - Singapore Botanic Gardens, The Villa has played host to product launches, board meetings, business dining, annual dinner & dance parties, birthdays, networking sessions, creative brainstorming sessions and seminars."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/527/medium/Webp.net-compress-image.jpg?1530980868",
        "tagline": "Urban Tavern Bugis",
        "location": "Bugis",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Solemnisation"
        ],
        "description": "The perfect venue for all private parties, weddings & corporate events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/289/medium/mcgettigans_event_space_hens_party_venuerific_singapore.png?1528366787",
        "tagline": "The Malt Room @ McGettigan's",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Event space",
            " Restaurant"
        ],
        "description": "The Malt Room at McGettigan’s Clarke Quay is the perfect venue."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/453/medium/Miaja_Aps_1.jpg?1537508923",
        "tagline": "Maison Miaja (at gallery)",
        "location": "Clarke Quay",
        "eventType": [
            "Event space",
            " Gallery",
            " Meeting Room/Space",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "Miaja Gallery (MG) is one of Singapore’s newest art and design spaces, housed on the second floor of the APS Building, this 4000 square foot space is located, walking distance from Robertson Quay and Clarke Quay, in River Valley."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/181/medium/British-Club-Meeting.jpg?1527845787",
        "tagline": "The British Club, Singapore",
        "location": "Bukit Timah",
        "eventType": [
            "Ballroom",
            " Club",
            " Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Rooftop",
            " Solemnisation"
        ],
        "description": "Magnificent setting from our Awards winning venue Treetops Terrace with lush greenery bringing unsurpassed photographic opportunities to the elegance of our Elizabeth Suite Ballroom, you special day is bound to impress one and all"
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/196/medium/Wedding-Venue-Singapore-Grand-Park-Orchard.jpg?1527917955",
        "tagline": "Grand Park Orchard",
        "location": "Orchard Road",
        "eventType": [
            "Bar",
            " Event space",
            " Hotel",
            " Meeting Room/Space",
            " MICE",
            " Outdoors",
            " Restaurant",
            " Rooftop",
            " Solemnisation"
        ],
        "description": "Awarded as Asia's Leading Design Hotel and one of Singapore's trendiest hotels, Grand Park Orchard is a lifestyle destination on Orchard Road."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/522/medium/cargo39-warehouse-event-space.jpg?1530849963",
        "tagline": "Cargo39",
        "location": "Tanjong Pagar",
        "eventType": [
            "Event space",
            " Unique venue"
        ],
        "description": "Set against the panoramic backdrop of Singapore’s industrial waterfront, Cargo39’s 4000-square-foot warehouse boasts an industrial-chic interior with exposed ceiling trusses, gleaming chandeliers and concrete floors."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/946/medium/Beast-Butterfly-Event-Hall.jpg?1526634797",
        "tagline": "Beast & Butterflies, Level II",
        "location": "Robertson Quay",
        "eventType": [
            "Co-working space",
            " Event space",
            " Hotel",
            " Meeting Room/Space"
        ],
        "description": "MySpace, an event venue that comfortably houses 50 to 70 people, with full natural daylight; an unconventional setting, also designed by Phillip Starck that is Ideal for a meeting or social event."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/955/medium/Kallang-Theatre-Corporate-Event.jpg?1526830616",
        "tagline": "Kallang Theatre",
        "location": "Kallang",
        "eventType": [
            "Auditorium",
            " Ballroom",
            " Conference Hall",
            " Event space",
            " Halal Venue",
            " Outdoors",
            " Rooftop",
            " Solemnisation",
            " Studio",
            " Theater"
        ],
        "description": "Currently located centrally right next to Stadium MRT."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/660/medium/KidZania-Conference.png?1538633357",
        "tagline": "KidZania Singapore",
        "location": "Sentosa",
        "eventType": [
            "Conference Hall",
            " Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "Finding a unique place for a function? Look no further! At KidZania Singapore, we offer a range of unique thematic venues, customized event spaces and a talented team of event professionals to create a memorable experience."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/082/medium/Loof_Singapore_Bar_Venue_Parties_Birthday_Drinks.jpg?1485242607",
        "tagline": "Loof",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Rooftop"
        ],
        "description": "Loof is Singapore’s first standalone rooftop bar, serving up quality whimsy, fresh nostalgia and unbridled playfulness in an urban garden atop Odeon Towers in downtown CBD."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/686/medium/Cozy-Banana-Seminar-Space.jpg?1524500436",
        "tagline": "Cozy Bananas",
        "location": "Tanjong Pagar",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Studio",
            " Unique venue"
        ],
        "description": "Cozy Bananas was founded with the purpose of providing an out-of- the-office space for all who are looking to explore and expand their creative minds, whilst being close to nature; an experience like no other."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/718/medium/Colonial-Estate-Novena.jpg?1524581295",
        "tagline": "The Garden Mansion",
        "location": "Novena",
        "eventType": [
            "Club",
            " Event space",
            " Gallery",
            " Outdoors",
            " Private estate",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "A truly one of a kind black and white colonial mansion suitable for corporate events, product launches & luxury private events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/027/medium/Oakwood-Studio-Lounge.jpg?1526893598",
        "tagline": "Oakwood Studios Singapore",
        "location": "Orchard Road",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Rooftop"
        ],
        "description": "Oakwood Studios Singapore is the first Oakwood-branded serviced apartment in Singapore that features 98 stylish apartments with tech-enabled spaces curated for guests to work, live, host events and connect in."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/073/medium/Tanjong_Beach_Club_Venuerific_Corporate_Marketing_Functions_Birhtdays.jpg?1485234111",
        "tagline": "Tanjong Beach Club",
        "location": "Sentosa",
        "eventType": [
            "Bar",
            " Café",
            " Club",
            " Co-working space",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Restaurant",
            " Unique venue"
        ],
        "description": "Lauded by Condé Nast Traveller as one of the World's Best Beach Clubs, Tanjong Beach Club is a serene sanctuary located on the finest sun-soaked stretch of sand in Sentosa."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/820/medium/Coastes_-_Beach_Wedding-min.jpg?1525232588",
        "tagline": "C Side - Coastes, Bikini Bar, Sand Bar & Flame",
        "location": "Sentosa",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "Opening hours for various outlets are subjected to requirements of events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/020/771/medium/Lumen-Room-Solemnisation.png?1532243322",
        "tagline": "The Lumen Room",
        "location": "Bugis",
        "eventType": [
            "Event space",
            " Meeting Room/Space",
            " Solemnisation",
            " Studio",
            " Unique venue"
        ],
        "description": "The Lumen Room is a cozy 1,140sq ft studio in a conservation shop-house which is centrally located (opposite Bugis MRT), perfect for corporate meetings and private events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/838/medium/Smoke-Mirror-Lunch-Corporate-Venue.jpg?1525273391",
        "tagline": "Smoke & Mirrors",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Event space",
            " Rooftop"
        ],
        "description": "Located atop the National Gallery Singapore, Smoke & Mirrors is a stylish cocktail bar with a spectacular panoramic view of Singapore's skyline."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/639/medium/City-of-Tomorrow-Birthday-Party.jpg?1524217302",
        "tagline": "City of Tomorrow",
        "location": "City Hall",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Gallery",
            " Meeting Room/Space",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "City of Tomorrow Singapore is a one-stop retail and events concept company that aims to introduce the creative use of space for experiential shopping and events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/929/medium/Artichoke-Solemnisation-Venue.jpg?1526575381",
        "tagline": "Artichoke Singapore",
        "location": "Bras Basah",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Artichoke is a Middle Eastern-inspired restaurant in the same cool compound with Objectifs; a non-profit arts space dedicated to photography and film, in the heart of Singapore’s Arts and Heritage district."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/273/medium/Tampopo-Loft-Birthday-Party-Space.jpg?1508831256",
        "tagline": "Tampopo LOFT",
        "location": "Clarke Quay",
        "eventType": [
            "Ballroom",
            " Conference Hall",
            " Kids & Recreational",
            " Event space",
            " Studio"
        ],
        "description": "Tampopo LOFT is a multi-purpose event hall and culinary studio with fully equipped kitchen."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/472/medium/21st_birthday_party_event_spaces_hopheads_bar_singapore_venuerific.jpg?1510243114",
        "tagline": "Hopheads Bar",
        "location": "Dhoby Ghaut",
        "eventType": [
            "Bar",
            " Club",
            " Event space"
        ],
        "description": "Hopheads is an underground bar that believes that a nice pint of beer will solve life's greatest problems."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/487/medium/beautiful-private-event-venue-faber-peak.jpg?1537774503",
        "tagline": " Faber Peak Singapore",
        "location": "Mount Faber",
        "eventType": [
            "Ballroom",
            " Bar",
            " Café",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Restaurant",
            " Rooftop"
        ],
        "description": "Get away from the stuffy meeting room, and bring your events and meetings to new heights at Faber Peak Singapore – where the vibrant venues are a breath of fresh air and the views are invigorating! The only top-of-hill event location in Singapore with a bird's eye view of the harbour, Sentosa and the city skyline - Faber Peak Singapore is a perfect venue for company events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/218/medium/5685_RT.jpg?1517986663",
        "tagline": "The Joyden Hall",
        "location": "Bugis",
        "eventType": [
            "Ballroom",
            " Conference Hall",
            " Event space",
            " Halal Venue",
            " Theater"
        ],
        "description": "The Joyden Hall is a creative space that provides the opportunity for limitless event possibilities and the materialization of innovative ideas."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/473/medium/Blujazz-Venue-Private-Rental.jpg?1537514166",
        "tagline": "BLU JAZ CAFE",
        "location": "Bugis",
        "eventType": [
            "Bar",
            " Café",
            " Club",
            " Event space",
            " Restaurant"
        ],
        "description": "ONE STOP FOR ALL THE PARTIES Blu Jaz & Piedra Negra offers 3 Cozy venues located at Bali Lane (Arab Street) to organize your special event with us."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/461/medium/Arab-Street-Party-Venue.jpg?1537513813",
        "tagline": "Piedra Negra",
        "location": "Beach Road",
        "eventType": [
            "Bar",
            " Club",
            " Event space",
            " Halal Venue",
            " Restaurant"
        ],
        "description": "ONE STOP FOR ALL THE PARTIES Blu Jaz & Piedra Negra offers 3 Cozy venues located at Bali Lane (Arab Street) to organize your special event with us."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/529/medium/Flexible-event-space-Recognize-Studio.jpg?1510645112",
        "tagline": "Recognize Studios",
        "location": "Shenton Way",
        "eventType": [
            "Event space",
            " Restaurant",
            " Studio"
        ],
        "description": "Recognize Studios is a hub that consistently provides event consultancy services and venue spaces fit for a wide array of events and activities that is backed with logistical support and the capacity to provide Food & Beverage Provisions."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/973/medium/District6-Coworking-Space-Singapore.jpg?1503651273",
        "tagline": "District6 - Coworking + Offices",
        "location": "City Hall",
        "eventType": [
            "Café",
            " Co-working space",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "District6 is a newly opened co-working space in the heart of Singapore, in City Hall."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/770/medium/HUNGRY_HEROES_LEVEL_2_COMMUNAL.jpg?1501138353",
        "tagline": "HUNGRY HEROES",
        "location": "Farrer Park",
        "eventType": [
            "Bar",
            " Event space",
            " Restaurant"
        ],
        "description": "Hungry Heroes is the first superhero theme cafe and restaurant in Singapore."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/539/medium/Tree-Lizard-Venue-Hire.jpg?1537953658",
        "tagline": "Tree Lizard Restaurant & Bar",
        "location": "Dempsey",
        "eventType": [
            "Bar",
            " Café",
            " Kids & Recreational",
            " Event space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Tree Lizards is beautifully nestled across botanical gardens at Dempsey Hill surrounded by huge tall trees each at least 50 years old! Tree Lizards is a perfect venue to hold all types of events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/556/medium/Miska-Cafe-Sentosa.jpg?1498211836",
        "tagline": "Miska Cafe",
        "location": "Sentosa",
        "eventType": [
            "Café",
            " Outdoors",
            " Restaurant"
        ],
        "description": "With influences from the Mediterranean, Miska Cafe is dedicated to provide a relaxed gathering place for friends and families, with a breathtaking view of the marina."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/922/medium/amethyst2.jpg?1493880823",
        "tagline": "Amethyst",
        "location": "Keppel",
        "eventType": [
            "Unique venue",
            " Yacht"
        ],
        "description": "The Amethyst was developed to set a new standard as the state-of-the-art, pure-bred Aquila 48 Power Catamaran1 with a perfect balance between luxurious comfort and performance."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/149/medium/Kombi_Rocks_Diner_Venuerific_Singapore_Kids_Birthday_Parties_Venues.jpg?1486022630",
        "tagline": "Kombi Rocks Diner",
        "location": "Serangoon",
        "eventType": [
            "Café",
            " Restaurant"
        ],
        "description": "Kombi Rocks Diner is the new name and look, since 2012, of Koon Kee Restaurant circa 1971."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/228/medium/Polliwogs-Vivocity-Birthday-Party-Packages.jpg?1496130637",
        "tagline": "The Polliwogs @ Vivocity",
        "location": "Harbourfront",
        "eventType": [
            "Kids & Recreational"
        ],
        "description": "The Polliwogs @ Vivocity Mall offers seriously FUN memories in a safe and hygienic environment."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/374/medium/Polliwogs_Suntec_Venuerific_Singapore_Fun_Kids_Venue.jpg?1496937734",
        "tagline": "The Polliwogs @ Suntec City",
        "location": "Esplanade",
        "eventType": [
            "Kids & Recreational"
        ],
        "description": "The Polliwogs @ Suntec City offers seriously FUN memories in a safe and hygienic environment."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/359/medium/Simei_Venuerific_Singapore_Baby_Shower_Venue.jpg?1496937428",
        "tagline": "The Polliwogs @ Eastpoint Mall",
        "location": "Simei",
        "eventType": [
            "Kids & Recreational"
        ],
        "description": "The Polliwogs @ Eastpoint Mall offers seriously FUN memories in a safe and hygienic environment."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/120/medium/Kuro_Izakaya_Singapore_Suntec_Event_Space_Venuerific_Corporate_Networking.jpg?1485315029",
        "tagline": "Kuro Izakaya - Event Space",
        "location": "Esplanade",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Located in the epicentre of Suntec City, KURO Izakaya is a Japanese gastrobar; firing up Robatayaki and Kushiyaki it also houses a great selection of Whisky and Sake."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/795/medium/Tongkang_Riverboat_Singapore_Venuerific_Events_Venue_Night_View.jpg?1493092381",
        "tagline": "TongKang Riverboat Dining Event Space",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Unique venue",
            " Yacht"
        ],
        "description": "TongKang Riverboat Dining at Clarke Quay presents experiential dining on the last surviving pair of tongkangs (light boats for carrying goods) in Singapore."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/823/medium/Gathering-Venue-Hire-Talay-Thai-Singapore.jpg?1493115923",
        "tagline": "Talay Thai",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Talay Thai serves authentic Thai food with an urban twist – it’s a modern, warm and avant-garde “drinking hole” where suits and food collide."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/816/medium/Ferretti630-Yacht.jpg?1478505851",
        "tagline": "RuLin Ferretti 630",
        "location": "Sentosa",
        "eventType": [
            "Unique venue",
            " Yacht"
        ],
        "description": "Imagine hosting your intimate private event at a luxury yacht."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/734/medium/Earl-client-lunch-dinner-venue.jpg?1476265488",
        "tagline": "Earl Of Hindh",
        "location": "Sentosa",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "Earl of Hindh is the brainchild of a team of enterprising expat Indian entrepreneurs."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/281/medium/Senso-Ristorante-Bar-Courtyard-Restaurant-Chinatown-Singapore-Party-Corporate-Wedding-Venuerific-1.jpg?1399265542",
        "tagline": "Senso Ristorante & Bar",
        "location": "Chinatown",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "An established and popular Italian dining destination which continues to dish out the finest in contemporary cucina italiana (Italian cuisine)."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/034/medium/Rooftop_3.jpg?1468382760",
        "tagline": "Kinki Restaurant + Bar",
        "location": "Raffles Place",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Rooftop"
        ],
        "description": "A modern-Japanese restaurant set within the centre of a heritage building overlooking Singapore’s beautiful Marina Bay waterfront, Kinki Restaurant serves up unique non-conventional Japanese dishes using the freshest ingredients and the most creative of flavour combinations – all served at the highest quality."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/911/medium/FYR_Private_Birthdays_Parties_Corporate.jpg?1466757404",
        "tagline": "FYR Cycene Ond Drinc",
        "location": "Raffles Place",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "FYR Cycene Ond Drinc (pronounced as FIRE Kitchen and Drink) is a casual dining restaurant and bar located at 19, Boon Tat Street."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/579/medium/Beer-Live-Band-Bar-SG.jpg?1459149688",
        "tagline": "Highlander Restaurant & Bar at Chijmes",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Highlander at Chijmes is sitting on almost four thousand square feet area, with a total of 180 seating capacity."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/009/429/medium/Bistro-Cafe-GTCoffee.jpg?1425869132",
        "tagline": "Group Therapy Duxton",
        "location": "Duxton Hill",
        "eventType": [
            "Café",
            " Event space"
        ],
        "description": "Housed on the second storey of a restored conservation shophouse in Tanjong Pagar, Group Therapy Duxton is an intimate and charming space with a loft-like ceiling that affords you the flexibility to host your events in comfort and style."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/127/medium/Projector-Indie-Cinema-Unique-Space.jpg?1469157813",
        "tagline": "The Projector",
        "location": "Beach Road",
        "eventType": [
            "Auditorium",
            " Event space",
            " Halal Venue",
            " Theater"
        ],
        "description": "This is not your average cinema, The Projector is a genuine alternative to the conventional cineplex."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/008/218/medium/Deck-Unique-Event-Venues-Art-Space-Corporate-Wedding-Product-Launch-Ideas-Bugis-Interesting-Venuerific11?1416913040",
        "tagline": "Deck",
        "location": "Bugis",
        "eventType": [
            "Event space",
            " Gallery",
            " Halal Venue",
            " Outdoors",
            " Unique venue"
        ],
        "description": "Deck is a Groundbreaking Art Space & Unique Event Space launched with the mission to support and nurture the community of photography enthusiasts in Singapore and Southeast Asia."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/008/036/medium/The-Muffinry-Bakery-and-Cafe-Event-Space-Raffles-Place-Party-Corporate-WEdding-Others-Venuerific-1.jpg?1412160716",
        "tagline": "The Muffinry Bakery and Cafe",
        "location": "Raffles Place",
        "eventType": [
            "Café",
            " Event space"
        ],
        "description": "In the wee hours of 4th Aug 2011, we baked our first batches of muffins on the ground floor of a little yellow shophouse along Telok Ayer Street."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/007/527/medium/Rang-Mahal-Restaurant-Marina-Square-Singapore-Party-Coporate-Wedding-Others-Venuerific-4.jpg?1404818215",
        "tagline": "Rang Mahal",
        "location": "Marina Square",
        "eventType": [
            "Restaurant"
        ],
        "description": "Since its inception in 1971, fine dining Indian restaurant Rang Mahal at Pan Pacific Singapore represents a legacy of gastronomic excellence of over four decades in visionary culinary dedication."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/007/762/medium/DSC_0440.jpg?1406685984",
        "tagline": "My Private Pantry",
        "location": "Tanjong Pagar",
        "eventType": [
            "Event space",
            " Studio"
        ],
        "description": "Situated right in the heart of Singapore's Central Business District, My Private Pantry is the perfect venue for any type of event or gathering! Located on Tras St, the trendiest area of Tanjong Pagar, our studio is adaptable to suit your needs."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/886/medium/Da-Paolo-Bistro-Bar-Restaurant-Bar-Rochester-Park-Singapore-Party-Corporate-Wedding-Others-Venuerific-3.jpeg?1401443509",
        "tagline": "Da Paolo BistroBar",
        "location": "Rochester Park",
        "eventType": [
            "Bar",
            " Event space",
            " Restaurant"
        ],
        "description": "Alfresco dining at BistroBar is exceptional cuisine in a stylishly laid-back environment."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/796/medium/Ice-Cold-Beer-Bar-Orchard-Road-Singapore-Corporate-Others-Venuerific-2.jpg?1400754562",
        "tagline": "Ice-Cold Beer ",
        "location": "Orchard Road",
        "eventType": [
            "Bar"
        ],
        "description": "Ice-Cold Beer opened its doors in 1994."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/785/medium/SuperTree-By-IndoChine-Bar-Restaurant-Marina-Bay-Singapore-Party-Corporate-Wedding-Venuerific-4.jpg?1400667000",
        "tagline": "SuperTree By IndoChine",
        "location": "Marina Bay",
        "eventType": [
            "Bar",
            " Restaurant",
            " Rooftop"
        ],
        "description": "As the only establishment atop the SuperTree Grove, SuperTree by IndoChine is situated perfectly on the tallest structure, so guests will be able to sip martinis and enjoy intimate dinners under the starlit skies."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/769/medium/No.5-Emerald-Hill-Cocktail-Bar-Orchard-Road-Singapore-Corporate-Others-Venuerific-1.jpg?1400580312",
        "tagline": "No.5 Emerald Hill Cocktail Bar ",
        "location": "Orchard Road",
        "eventType": [
            "Bar"
        ],
        "description": "Affectionately known as No.5, this bar has become the favorite “watering hole” for many locals, expatriates and tourists since 1991."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/006/744/medium/Gunther's_Interior1.jpg?1400213060",
        "tagline": "Gunther's Modern French Cuisine ",
        "location": "Bugis",
        "eventType": [
            "Restaurant"
        ],
        "description": "Residing at the swanky Purvis Street, Gunther’s bring about sophisticated French fare to the chic fine dining scene."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/567/medium/SMU-Law-School.jpg?1522776880",
        "tagline": "SMU Event Spaces",
        "location": "Bras Basah",
        "eventType": [
            "Auditorium",
            " Conference Hall",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Theater",
            " Unique venue"
        ],
        "description": "SMU is a premier university renown for its world-class research and distinguished teaching."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/628/medium/Cloud9-Affordable-Event-Space.jpeg?1523933959",
        "tagline": "Cloud9 Events ",
        "location": "Kallang",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Studio"
        ],
        "description": "Cloud9 is an event space that has various amenities to cater to different events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/427/medium/Corporate-Event-Space-Zafferano.jpg?1537274545",
        "tagline": "Zafferano Italian Restaurant & Lounge",
        "location": "Raffles Place",
        "eventType": [
            "Bar",
            " Club",
            " Event space",
            " Meeting Room/Space",
            " Restaurant",
            " Rooftop",
            " Solemnisation"
        ],
        "description": "Crowning the Ocean Financial Centre, 43 storeys above bustling Collyer Quay with 270 degrees panoramic view of the Marina Bay skyline conveniently located in the heart of Singapore’s CBD."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/405/medium/villa-paradiso-swimming-pool-party-space.jpg?1457759469",
        "tagline": "Villa Paradiso",
        "location": "Botanic Gardens",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Private estate",
            " Unique venue"
        ],
        "description": "\"Celebrate your destination event in Singapore\" Tucked away behind a stone wall near the Botanical Garden, Villa Paradiso is a unique, private sanctuary of exotic beauty and comfort."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/487/medium/Atmastel-Beautiful-Event-Venue-Esplanade.jpg?1522048716",
        "tagline": "Atmastel",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Experience an Italian affair without having to leave Singapore."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/595/medium/Gateway-Theatre-Solemnization.jpg?1523438027",
        "tagline": "Gateway Theatre",
        "location": "Bukit Merah",
        "eventType": [
            "Auditorium",
            " Conference Hall",
            " Event space",
            " Rooftop",
            " Solemnisation",
            " Studio",
            " Theater"
        ],
        "description": "Gateway Theatre is a new multi-theatre venue located in the heart of Bukit Merah Central."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/550/medium/2mm_Inside_2-min.jpg?1522758385",
        "tagline": "2mm Talent Hub",
        "location": "Dhoby Ghaut",
        "eventType": [
            "Bar",
            " Event space"
        ],
        "description": "Looking to bond with your team? Need some creative sparks? 2mm is an intimate studio located at the heart of Singapore's art district, where we uncover budding talents."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/068/medium/Picotin-Express-Celebration.jpg?1535354919",
        "tagline": "Picotin Express",
        "location": "Bukit Timah",
        "eventType": [
            "Bar",
            " Café",
            " Kids & Recreational",
            " Outdoors",
            " Restaurant",
            " Unique venue"
        ],
        "description": "Experience a unique atmosphere under the shade of heritage trees and fine breeze at Picotin Express."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/552/medium/Pelican_Upper-Deck-Wedding-Set-Up.jpg?1522772754",
        "tagline": "The Pelican",
        "location": "Marina Bay",
        "eventType": [
            "Bar",
            " Meeting Room/Space",
            " Outdoors",
            " Restaurant"
        ],
        "description": "A chic and laidback dining spot along One Fullerton overlooking a spectacular view of the Marina Bay waterfront, The Pelican serves luxurious yet comforting East Coast American cuisine grounded in the freshest seafood prepped skillfully by its culinary team."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/016/527/medium/Dining-Event-Singapore-Picnic.jpg?1490010499",
        "tagline": "Picnic Urban Food Park",
        "location": "Orchard Road",
        "eventType": [
            "Bar",
            " Café",
            " Event space",
            " Meeting Room/Space",
            " Restaurant"
        ],
        "description": "Picnic is an international food park showcasing unique and delicious flavors with interesting stories from around the world."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/412/medium/Happen-Private-Venue.jpg?1520823254",
        "tagline": "Happen",
        "location": "Jalan Besar",
        "eventType": [
            "Bar",
            " Event space",
            " Gallery",
            " Meeting Room/Space",
            " Solemnisation",
            " Studio",
            " Unique venue"
        ],
        "description": "HAPPEN @ Jalan Besar is a creative space that is designed for work and plays under one roof which will create an unforgettable experience for you and your guests."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/247/medium/pizzaexpress-marina-bay.jpg?1518960256",
        "tagline": "Pizza Express",
        "location": "Marina Bay",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "PizzaExpress Marina One East Tower is the perfect venue for hosting meetings, seminars and other corporate events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/374/medium/Workcentral-Conference-Venue.jpg?1536736097",
        "tagline": "Workcentral",
        "location": "Dhoby Ghaut",
        "eventType": [
            "Auditorium",
            " Co-working space",
            " Conference Hall",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "Workcentral is co-working space based in the heard of Orchard Road, Singapore and comprises of entrepreneurial community and venue for events, seminars, corporate workshops, cocktails, and product launches."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/266/medium/Dallas-Restaurant-And-Bar-Wedding-Setup.jpeg?1536032918",
        "tagline": "Dallas Restaurant and Bar",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Event space",
            " Outdoors",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Nestled within the luscious greenery of the Sky Garden, Dallas offers a private open space against the landscape of Singapore’s city centre."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/211/medium/The-Garage-Event-Venue.jpg?1535950713",
        "tagline": "Botanico at The Garage",
        "location": "Botanic Gardens",
        "eventType": [
            "Bar",
            " Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " MICE",
            " Outdoors",
            " Restaurant",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "Housed within a beautiful 1920s Art Deco conserved architecture, Botanico is snugged right in the center of Singapore Botanic Gardens, a UNESCO inscribed world heritage site and is a perfect destination for those seeking for an enchanting experience."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/206/medium/The-Summerhouse-Event-Venue.jpg?1535950392",
        "tagline": "The Summerhouse",
        "location": "Seletar",
        "eventType": [
            "Bar",
            " Café",
            " Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Private estate",
            " Restaurant",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "Housed in idyllic English countryside of picturesque landscape and expansive greenery, The Summerhouse provides a unique garden and nature themed wedding or event experience in the splendor of its heritage bungalow."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/188/medium/1-Altitude-Celebration.jpg?1535949647",
        "tagline": "1-Altitude",
        "location": "Raffles Place",
        "eventType": [
            "Bar",
            " Club",
            " Event space",
            " Meeting Room/Space",
            " Outdoors",
            " Restaurant",
            " Rooftop",
            " Solemnisation",
            " Unique venue"
        ],
        "description": "1-Altitude is a multi-concept lifestyle destination that caters to an extensive range of corporate and wedding events through its in-house professional planners and stunning venue."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/176/medium/Peony-Jade-Keppel-Club-Meeting-Venue.jpg?1535824208",
        "tagline": "Peony Jade",
        "location": "Clarke Quay",
        "eventType": [
            "Event space",
            " Restaurant",
            " Solemnisation"
        ],
        "description": "Peony Jade Clarke Quay - a proud winner of Her World Brides’ 2017 Venue Awards for Best Wedding Setting & Ambience, and Best Wedding Dinner Venue (Chinese Restaurant), overlooks the Singapore River from its second floor setting in a converted godown that’s a heritage building."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/096/medium/FOC-PIM-PAM-Meeting.JPG?1535356079",
        "tagline": "FOC PIM PAM",
        "location": "Orchard Road",
        "eventType": [
            "Bar",
            " Café",
            " Event space",
            " Restaurant"
        ],
        "description": "FOC PIM PAM is a buzzing Tapas Bar & Restaurant with a distinct Barcelona flair, in a laid-back nook of Orchard Road."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/041/medium/Pickleville-birthday-venue.jpg?1535079198",
        "tagline": "Pickleville",
        "location": "Tanjong Pagar",
        "eventType": [
            "Café",
            " Co-working space",
            " Event space",
            " Meeting Room/Space"
        ],
        "description": "A hidden gem downtown brought to you by the folks behind Sarnies."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/021/225/medium/Alittle-Tashi-Corporate-Venue.jpg?1535957079",
        "tagline": "alittle tashi",
        "location": "Jalan Besar",
        "eventType": [
            "Restaurant",
            " Solemnisation"
        ],
        "description": "Family name ‘alittle', given name ‘tashi' (meaning ‘blessings' and ‘welcome' in Tibetan), tashi counts its deep Asian roots as its blessing, while readily welcoming diverse influences of the world."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/019/352/medium/Chuntsubakinew1.jpg?1519830166",
        "tagline": "Chun Tsubaki",
        "location": "Tai Seng",
        "eventType": [
            "Co-working space",
            " Kids & Recreational",
            " Event space",
            " Gallery",
            " Meeting Room/Space",
            " Solemnisation",
            " Studio",
            " Unique venue"
        ],
        "description": "Combining the concepts of Danish 'Hygge' and Japanese 'Wabi-Sabi', our studio combines the natural beauty of organic aesthetics and bliss in simplicity."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/569/medium/Zouk_Phuture_Venuerific_Venue_Celebrations_Space.jpg?1498558000",
        "tagline": "Zouk Clarke Quay",
        "location": "Clarke Quay",
        "eventType": [
            "Bar",
            " Club",
            " Event space",
            " Unique venue"
        ],
        "description": "An iconic 27-year-old dance music institution with 5 unique spaces, catering to different events needs."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/018/029/medium/Plentyfull-Decor-Wedding.jpg?1504528182",
        "tagline": "Plentyfull",
        "location": "Esplanade",
        "eventType": [
            "Café",
            " Event space",
            " Restaurant"
        ],
        "description": "Plentyfull offers a versatile and unique space at Millenia Walk, with a capacity of 130 seats, featuring a designer setting and cosy atmosphere to suit a variety of occasions."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/612/medium/Main-Dining-Hall-1.jpg?1473849867",
        "tagline": "Kai Garden",
        "location": "Marina Bay",
        "eventType": [
            "Meeting Room/Space",
            " Restaurant"
        ],
        "description": "Evoking the decadence of an emperor’s courtyard and seating up to 200 diners, Kai Garden is the premier dining destination in Marina Square headed by Owner and Executive Chef Fung Chi Keung, an award-winning chef whose inimitable style and sumptuous Cantonese dishes have placed him among the elite of Chinese chefs in Singapore."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/355/medium/original-sin-sunset-event.jpg?1463377934",
        "tagline": "Original Sin",
        "location": "Holland",
        "eventType": [
            "Bar",
            " Café",
            " Outdoors",
            " Restaurant"
        ],
        "description": "We are a Mediterranean Restaurant with a menu catered for all lovers of Mediterranean and vegetarian food with a wide selection of wines and beverages."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/143/medium/Sen_of_Japan_Networking_Meetings_Corporate.jpg?1461731927",
        "tagline": "Sen of Japan",
        "location": "Marina Bay",
        "eventType": [
            "Bar",
            " Restaurant"
        ],
        "description": "Sen of Japan is a casual dining Japanese restaurant and bar."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/017/525/medium/Baja-Fresh-Event-Space.jpg?1498111838",
        "tagline": "Baja Fresh Mexican Grill - Event Space",
        "location": "Marina Bay",
        "eventType": [
            "Café",
            " Event space",
            " Restaurant"
        ],
        "description": "Nestled in the heart of the city – Baja Fresh Mexican Grill offers two event spaces for your perfect Mexican fiesta."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/403/medium/cook-and-brew-birthday.jpg?1463458801",
        "tagline": "Cook & Brew",
        "location": "Marina Bay",
        "eventType": [
            "Bar",
            " Event space",
            " Restaurant"
        ],
        "description": "Located at Level 33, Cook & Brew is The Westin Singapore’s latest branded concept restaurant."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/747/medium/DingDong_Venuerific_Singapore_DD_Event_Space.jpg?1476265584",
        "tagline": "Ding Dong",
        "location": "Telok Ayer",
        "eventType": [
            "Bar",
            " Event space",
            " Restaurant"
        ],
        "description": "A unique dining concept from Open Door Policy, where the rustic flavours of Southeast Asia are celebrated in the signature refinement of Ryan Clift from Tippling Club."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/961/medium/Tippling_Club.jpg?1460521027",
        "tagline": "BIN 38 @ Tippling Club",
        "location": "Tanjong Pagar",
        "eventType": [
            "Bar",
            " Event space",
            " Meeting Room/Space",
            " Restaurant",
            " Unique venue"
        ],
        "description": "BIN 38 - the ultimate experience in private dining."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/357/medium/Mr-Punch-Bar-Events-Space.jpg?1457269821",
        "tagline": "Mr Punch Public House",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Café",
            " Gallery",
            " Meeting Room/Space",
            " Restaurant",
            " Rooftop"
        ],
        "description": "Best known for his work in the puppet show, ‘Punch & Judy’, Mr Punch now introduces his latest venture at 26 Seah Street: Mr Punch Public House."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/104/medium/Team-Bonding-Activities-CulinaryON.jpg?1454387039",
        "tagline": "CulinaryON",
        "location": "Raffles Place",
        "eventType": [
            "Kids & Recreational",
            " Event space",
            " Meeting Room/Space",
            " Studio"
        ],
        "description": "Located in the heart of CBD, the studio is just a few steps away from the Raffles Place MRT Station."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/350/medium/Solemnization-Unique-Venue-SG-Emint.jpg?1457269508",
        "tagline": "Mint Museum of Toys",
        "location": "City Hall",
        "eventType": [
            "Event space",
            " Gallery",
            " Halal Venue",
            " Meeting Room/Space",
            " Museum"
        ],
        "description": "MINT Museum of Toy’s contemporary building, located in Singapore’s Civic District, offers unique spaces to host both corporate & private events."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/013/830/medium/pietrasanta-restaurant-private-event-room.jpg?1459827086",
        "tagline": "Ristorante Pietrasanta",
        "location": "Buona Vista",
        "eventType": [
            "Event space",
            " Gallery",
            " Meeting Room/Space",
            " MICE",
            " Outdoors",
            " Restaurant",
            " Unique venue"
        ],
        "description": "Ristorante Pietrasanta is a dining outlet which embraces the concept of a Family Restaurant in Tuscany Style."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/737/medium/OSG-bar-event-venue.jpg?1440410313",
        "tagline": "OSG-Our Simple Goodness",
        "location": "Esplanade",
        "eventType": [
            "Bar",
            " Café",
            " Event space",
            " Meeting Room/Space",
            " Restaurant",
            " Unique venue"
        ],
        "description": "OSG-Our Simple Goodness is a multi-cuisine live music bar at Suntec City with a mission of spreading LOVE through Our Simple act of Goodness."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/697/medium/Charisma-Dvenue-Events-Venue2.jpg?1439780876",
        "tagline": "Charisma D'Venue",
        "location": "Joo Chiat",
        "eventType": [
            "Event space",
            " Halal Venue",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Charisma D’Venue is a Halal semi-fine dining restaurant offering a unique gastronomy experience."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/112/medium/Venue-Hire-Lifelonglearning.jpg?1469157342",
        "tagline": "Lifelong Learning Academy",
        "location": "Macpherson",
        "eventType": [
            "Auditorium",
            " Event space",
            " Halal Venue",
            " Meeting Room/Space"
        ],
        "description": "Learning Studios @ Lifelong Learning Academy, the ideal venue for all sorts of training, meetings and seminars."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/791/medium/onthetable-birthday-venue.jpg?1465873704",
        "tagline": "On the Table",
        "location": "Pasir Panjang",
        "eventType": [
            "Café",
            " Restaurant"
        ],
        "description": "We know that good times only begin in the presence of great food and amazing company."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/771/medium/cookyn-entrance-a.jpg?1465871405",
        "tagline": "Cookyn Inc",
        "location": "Balestier",
        "eventType": [
            "Event space",
            " Studio"
        ],
        "description": "Cookyn Inc believes in Making Food Fun by fostering interactions amongst people, be it in a social group or a corporate department."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/681/medium/Royal-Albatross-events-venue.jpg?1439349744",
        "tagline": "The Royal Albatross",
        "location": "Sentosa",
        "eventType": [
            "Event space",
            " Outdoors",
            " Unique venue",
            " Yacht"
        ],
        "description": "For a truly memorable affair, enjoy the lavishness of a wedding ceremony onboard The Royal Albatross."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/358/medium/chijmes-event-space-giardino-pizza.jpg?1434623599",
        "tagline": "Giardino Pizza Bar & Grill (Chijmes)",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Outdoors",
            " Restaurant"
        ],
        "description": "Pizzeria Giardino! Was established at Chijmes in 2004, we have re-opened at our new location at CHIJMES under the name Giardino Pizza Bar & Grill."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/014/821/medium/hero-boat-quay-sg-bar.jpg?1465892391",
        "tagline": "Hero's",
        "location": "Boat Quay",
        "eventType": [
            "Bar",
            " Club",
            " Restaurant"
        ],
        "description": "Hero’s is a sprawling 2,500 sq-ft saloon style venue with a fully-stocked bar, full menu (burgers, kebabs, pizzas, mixed platters and other pub grub) and live band set-up."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/322/medium/Dining-Indoor-Wedding-Venue.jpg?1434522787",
        "tagline": "Gardens by the Bay",
        "location": "Marina Bay",
        "eventType": [
            "Ballroom",
            " Event space",
            " Halal Venue",
            " Meeting Room/Space",
            " Outdoors",
            " Rooftop"
        ],
        "description": "With four different locations, Flower Field Hall, Waterview Room, Silver Leaf and The Meadow, Gardens by the Bay would certainly leave every guest with a lasting impression of the place."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/162/medium/prive-chijmes-wedding-events-venue.jpg?1432894185",
        "tagline": "Prive Chijmes",
        "location": "City Hall",
        "eventType": [
            "Bar",
            " Café",
            " Restaurant"
        ],
        "description": "Located in the midst of CHIJMES’ lush garden setting, Privé is an oasis of relaxation for urbanites who are looking for a little respite from the hustle and bustle of the city."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/081/medium/bangbang-club-corporate-party-venue.jpg?1469092545",
        "tagline": "Bang Bang",
        "location": "Esplanade",
        "eventType": [
            "Club"
        ],
        "description": "Housed in a 5,000 square foot venue at the 5 Star Pan Pacific Hotel located at Marina Bay, Bang Bang draws its inspiration from the world’s top high-energy nightclubs and brings it into an intimate setting with a capacity of 400 revelers."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/010/091/medium/East-Manhattan-events-venues.jpg?1432009320",
        "tagline": "East Manhattan",
        "location": "Bukit Timah",
        "eventType": [
            "Café",
            " Restaurant"
        ],
        "description": "Situated in a cozy corner in a row of vintage shop house along Lorong Kilat, East Manhattan Café's nicely decorated interior with hipster rustic theme undoubtedly would bring back memories of the good old days."
    },
    {
        "image": "https://s3-production.venuerific.com/venue_photos/photos/000/015/058/medium/Chye-Seng-Huat-cafe-spaces.JPG?1469090916",
        "tagline": "iNCOGNiTO Bar",
        "location": "Jalan Besar",
        "eventType": [
            "Bar",
            " Café",
            " Outdoors"
        ],
        "description": "Located in the up and coming Jalan Besar precinct, iNCOGNiTO is a collaboration with the good folks from Chye Seng Huat Hardware."
    }
]

router
.route('/event')
// Get logged in user’s details
.post(async (req, res) => {
    venues.forEach('/createVenues',async (key,i)=>{
        console.log(key)
        if(i > 0){
            await global.Venue.create({
                name: key.tagline,
                theme: key.eventType,
                description: key.description,
                location: key.location,
                location: key.location,
                image: key.image,
            })
        }
    })
    
    console.log(req.body)
    res.json({test: 'works'})
})
.post(async (req, res) => {
    venues.forEach('/createVenues',async (key,i)=>{
        console.log(key)
        if(i > 0){
            await global.Venue.create({
                name: key.tagline,
                theme: key.eventType,
                description: key.description,
                location: key.location,
                location: key.location,
                image: key.image,
            })
        }
    })
    
    console.log(req.body)
    res.json({test: 'works'})
})

module.exports = router
