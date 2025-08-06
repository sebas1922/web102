-- FIU Off-Campus Housing Data
-- Insert realistic housing listings near Florida International University

INSERT INTO listings (title, content, image_url, address, city, state, zipcode, bedrooms, bathrooms, rent, upvotes) VALUES

-- Westchester/Sweetwater Area (Close to FIU Main Campus)
(
    'Modern 2BR Apartment Near FIU Campus',
    'Spacious 2-bedroom apartment just 5 minutes from FIU main campus. Features updated kitchen with granite countertops, in-unit washer/dryer, and central AC. Gated community with pool and fitness center. Perfect for students or young professionals. Utilities included except electricity.',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
    '10875 SW 8th Street',
    'Miami',
    'FL',
    '33174',
    2,
    2.0,
    1850.00,
    18
),

(
    'Studio Apartment - Walking Distance to FIU',
    'Cozy studio perfect for students! Located within walking distance of FIU campus. Features wood floors, updated bathroom, and kitchenette. Building amenities include laundry facility and covered parking. Great for someone who wants to live close to campus without the dorm experience.',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
    '11200 SW 8th Street',
    'Miami',
    'FL',
    '33174',
    0,
    1.0,
    1200.00,
    8
),

(
    'Spacious 3BR House - Perfect for Roommates',
    'Large 3-bedroom house ideal for students sharing costs. Features tile floors throughout, large living areas, and a fenced backyard perfect for BBQs. Two full bathrooms and plenty of parking. Located in a quiet residential neighborhood just 10 minutes from FIU. Lawn care included.',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop',
    '3401 SW 117th Avenue',
    'Miami',
    'FL',
    '33175',
    3,
    2.0,
    2400.00,
    22
),

-- Doral Area (Popular with FIU students)
(
    'Luxury 1BR in Doral - FIU Shuttle Available',
    'Beautiful 1-bedroom apartment in modern Doral complex. Features stainless steel appliances, quartz countertops, and floor-to-ceiling windows. Resort-style amenities including pool, gym, and study lounges. FIU shuttle service available from nearby stop.',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    '8395 NW 53rd Street',
    'Doral',
    'FL',
    '33166',
    1,
    1.0,
    1650.00,
    14
),

(
    'Budget-Friendly 2BR Near FIU Engineering',
    'Affordable 2-bedroom apartment perfect for engineering students. Located close to FIU Engineering campus. Features include updated kitchen, central air, and on-site laundry. Quiet complex with study-friendly environment. Water and trash included in rent.',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
    '10455 NW 41st Street',
    'Doral',
    'FL',
    '33178',
    2,
    1.5,
    1550.00,
    11
),

-- Kendall Area (South of FIU)
(
    'Kendall 1BR - Close to Metrobus Routes',
    'Charming 1-bedroom apartment in the heart of Kendall. Easy access to multiple Metrobus routes that serve FIU campus. Features include tile floors, updated appliances, and a private balcony. Complex amenities include pool and BBQ area. Perfect for graduate students.',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop',
    '12245 SW 112th Street',
    'Miami',
    'FL',
    '33186',
    1,
    1.0,
    1400.00,
    9
),

(
    'Family-Style 4BR House in Kendall',
    'Large 4-bedroom house perfect for multiple students or a family. Features include updated kitchen with island, spacious living areas, and a two-car garage. Located in a safe, quiet neighborhood with easy access to FIU. Great for students who want more space and privacy.',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=500&fit=crop',
    '14230 SW 88th Street',
    'Miami',
    'FL',
    '33183',
    4,
    3.0,
    3200.00,
    16
),

-- Westchester Area
(
    'Cozy 1BR Near FIU Medical Campus',
    'Comfortable 1-bedroom apartment close to both main and medical campuses. Features include hardwood floors, updated bathroom, and eat-in kitchen. Building has controlled access and assigned parking. Great for medical or nursing students who need easy access to both campuses.',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop',
    '1455 SW 107th Avenue',
    'Miami',
    'FL',
    '33174',
    1,
    1.0,
    1300.00,
    7
),

-- Sweetwater Area
(
    'Modern 2BR Condo in Sweetwater',
    'Recently renovated 2-bedroom condo in gated Sweetwater community. Features granite counters, stainless appliances, and in-unit washer/dryer. Community amenities include clubhouse, pool, and tennis court. Only 15 minutes to FIU campus via Turnpike.',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
    '1180 NW 112th Avenue',
    'Sweetwater',
    'FL',
    '33172',
    2,
    2.0,
    1750.00,
    13
),

-- Flagami Area (East of FIU)
(
    'Affordable Studio in Flagami',
    'Budget-friendly studio apartment perfect for students. Features include tile floors, updated kitchenette, and window AC unit. Located on a bus route that goes directly to FIU. Laundry facility on-site. Great option for students who want to live independently on a budget.',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    '6789 W Flagler Street',
    'Miami',
    'FL',
    '33144',
    0,
    1.0,
    950.00,
    5
),

-- Coral Gables (Upscale option)
(
    'Luxury 1BR in Coral Gables',
    'Upscale 1-bedroom apartment in beautiful Coral Gables, close to University of Miami and FIU. Features high-end finishes, marble bathrooms, and city views. Building amenities include concierge, rooftop pool, and valet parking. Perfect for graduate students or professionals.',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
    '301 Altara Avenue',
    'Coral Gables',
    'FL',
    '33146',
    1,
    1.5,
    2200.00,
    21
),

-- Tamiami Area
(
    'Shared 3BR House - Rooms Available',
    'Large 3-bedroom house with rooms available for rent. Perfect for students who want to share expenses. House features include full kitchen, living room, backyard, and parking. Located in a quiet residential area just 12 minutes from FIU campus. Utilities split among roommates.',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop',
    '7850 SW 24th Street',
    'Miami',
    'FL',
    '33155',
    3,
    2.0,
    2100.00,
    19
),

-- Fontainebleau Area
(
    'Convenient 2BR Near FIU',
    'Well-maintained 2-bedroom apartment in the Fontainebleau area. Features include updated kitchen, ceramic tile floors, and central air. Complex has gated entry and pool. Located near shopping centers and restaurants, with easy highway access to FIU campus.',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop',
    '8234 NW 7th Street',
    'Miami',
    'FL',
    '33126',
    2,
    1.5,
    1675.00,
    12
),

-- Bird Road Area
(
    'Bright 1BR on Bird Road',
    'Cheerful 1-bedroom apartment on Bird Road with easy access to FIU via Metrobus. Features include wood laminate floors, updated appliances, and large windows for natural light. Building has elevator and assigned parking. Perfect for students who prefer public transportation.',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop',
    '9876 SW 40th Street',
    'Miami',
    'FL',
    '33165',
    1,
    1.0,
    1250.00,
    6
),

-- Hialeah Gardens (Affordable option)
(
    'Budget 2BR in Hialeah Gardens',
    'Affordable 2-bedroom apartment perfect for students on a budget. Features include tile floors, eat-in kitchen, and window AC units. On-site laundry and plenty of parking. About 20 minutes to FIU campus by car. Great option for students who want more space for less money.',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    '6543 NW 186th Street',
    'Hialeah Gardens',
    'FL',
    '33015',
    2,
    1.0,
    1350.00,
    8
);

-- Add some sample comments for the listings
INSERT INTO comments (listing_id, content, author_name) VALUES

-- Comments for the Modern 2BR Apartment Near FIU Campus
(
    (SELECT id FROM listings WHERE title = 'Modern 2BR Apartment Near FIU Campus' LIMIT 1),
    'Is parking included? I have a car and really need guaranteed parking for my classes.',
    'Carlos M.'
),
(
    (SELECT id FROM listings WHERE title = 'Modern 2BR Apartment Near FIU Campus' LIMIT 1),
    'Do you allow pets? I have a small dog that is well-trained.',
    'Maria Rodriguez'
),

-- Comments for the Studio Apartment
(
    (SELECT id FROM listings WHERE title = 'Studio Apartment - Walking Distance to FIU' LIMIT 1),
    'Perfect for my graduate studies! Is there good WiFi in the building?',
    'Ahmed Hassan'
),

-- Comments for the 3BR House
(
    (SELECT id FROM listings WHERE title = 'Spacious 3BR House - Perfect for Roommates' LIMIT 1),
    'My friends and I are interested! When is this available for move-in?',
    'Jessica Chen'
),
(
    (SELECT id FROM listings WHERE title = 'Spacious 3BR House - Perfect for Roommates' LIMIT 1),
    'Is the backyard big enough for studying outside? I prefer outdoor study spaces.',
    'Roberto Silva'
),

-- Comments for Doral apartment
(
    (SELECT id FROM listings WHERE title = 'Luxury 1BR in Doral - FIU Shuttle Available' LIMIT 1),
    'The shuttle service sounds great! How often does it run to campus?',
    'Priya Patel'
),

-- Comments for budget-friendly options
(
    (SELECT id FROM listings WHERE title = 'Budget-Friendly 2BR Near FIU Engineering' LIMIT 1),
    'This is exactly what I need as an engineering student! Is it available for fall semester?',
    'David Kim'
),

(
    (SELECT id FROM listings WHERE title = 'Affordable Studio in Flagami' LIMIT 1),
    'Great price! Is the bus route reliable for getting to campus for 8am classes?',
    'Ana Gonzalez'
);