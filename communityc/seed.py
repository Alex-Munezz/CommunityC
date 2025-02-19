from models import db, Pricing
from app import app

pricing_data = [
    # Writing Services (service_id: 2)
    {"service_id": 2, "subcategory_id": 1, "price": 5000.00},  # Blog Writing
    {"service_id": 2, "subcategory_id": 2, "price": 7000.00},  # Copywriting
    {"service_id": 2, "subcategory_id": 3, "price": 8000.00},  # Technical Writing

    # Plumbing Services (service_id: 3)
    {"service_id": 3, "subcategory_id": 4, "price": 4000.00},  # Leak Repairs
    {"service_id": 3, "subcategory_id": 5, "price": 6000.00},  # Pipe Installation
    {"service_id": 3, "subcategory_id": 6, "price": 3500.00},  # Drain Cleaning

    # Electrical Services (service_id: 4)
    {"service_id": 4, "subcategory_id": 7, "price": 7000.00},  # Home Wiring
    {"service_id": 4, "subcategory_id": 8, "price": 5000.00},  # Electrical Repairs
    {"service_id": 4, "subcategory_id": 9, "price": 6000.00},  # Lighting Installation

    # Fitness Services (service_id: 5)
    {"service_id": 5, "subcategory_id": 10, "price": 10000.00}, # Personal Training
    {"service_id": 5, "subcategory_id": 11, "price": 8000.00},  # Group Fitness
    {"service_id": 5, "subcategory_id": 12, "price": 12000.00}, # Weight Loss Programs

    # Hair Services (service_id: 6)
    {"service_id": 6, "subcategory_id": 13, "price": 3000.00}, # Box Braids
    {"service_id": 6, "subcategory_id": 14, "price": 2500.00}, # Cornrows
    {"service_id": 6, "subcategory_id": 15, "price": 2800.00}, # Twists

    # Cleaning Services (service_id: 7)
    {"service_id": 7, "subcategory_id": 16, "price": 4500.00}, # Residential Cleaning
    {"service_id": 7, "subcategory_id": 17, "price": 5000.00}, # Office Cleaning
    {"service_id": 7, "subcategory_id": 18, "price": 6000.00}, # Deep Cleaning

    # Nail Services (service_id: 8)
    {"service_id": 8, "subcategory_id": 19, "price": 1500.00}, # Manicure
    {"service_id": 8, "subcategory_id": 20, "price": 2000.00}, # Pedicure
    {"service_id": 8, "subcategory_id": 21, "price": 2500.00}, # Nail Art

    # Gardening Services (service_id: 9)
    {"service_id": 9, "subcategory_id": 22, "price": 3000.00}, # Lawn Mowing
    {"service_id": 9, "subcategory_id": 23, "price": 5000.00}, # Tree Trimming
    {"service_id": 9, "subcategory_id": 24, "price": 4000.00}, # Garden Maintenance

    # Pest Control (service_id: 10)
    {"service_id": 10, "subcategory_id": 25, "price": 7000.00}, # Termite Control
    {"service_id": 10, "subcategory_id": 26, "price": 6500.00}, # Rodent Control
    {"service_id": 10, "subcategory_id": 27, "price": 6000.00}, # Insect Extermination

    # Tutoring (service_id: 11)
    {"service_id": 11, "subcategory_id": 28, "price": 5000.00}, # Math Tutoring
    {"service_id": 11, "subcategory_id": 29, "price": 5500.00}, # Science Tutoring
    {"service_id": 11, "subcategory_id": 30, "price": 6000.00}, # Language Tutoring

    # Auto Repair (service_id: 12)
    {"service_id": 12, "subcategory_id": 31, "price": 8000.00}, # Engine Repair
    {"service_id": 12, "subcategory_id": 32, "price": 4000.00}, # Brake Service
    {"service_id": 12, "subcategory_id": 33, "price": 3000.00}, # Oil Change

    # Painting Services (service_id: 13)
    {"service_id": 13, "subcategory_id": 34, "price": 6000.00}, # Wall Painting
    {"service_id": 13, "subcategory_id": 35, "price": 5000.00}, # Furniture Painting
    {"service_id": 13, "subcategory_id": 36, "price": 7000.00}, # Outdoor Painting

    # Web Development (service_id: 14)
    {"service_id": 14, "subcategory_id": 37, "price": 25000.00}, # Website/Portfolio Development
    {"service_id": 14, "subcategory_id": 38, "price": 40000.00}, # E-commerce Website
    {"service_id": 14, "subcategory_id": 39, "price": 60000.00}, # System Development

    # Graphic Design (service_id: 15)
    {"service_id": 15, "subcategory_id": 40, "price": 5000.00}, # Logo Design
    {"service_id": 15, "subcategory_id": 41, "price": 10000.00}, # Brand Identity
    {"service_id": 15, "subcategory_id": 42, "price": 15000.00}, # UI/UX Design

    # Event Planning (service_id: 16)
    {"service_id": 16, "subcategory_id": 43, "price": 50000.00}, # Wedding Planning
    {"service_id": 16, "subcategory_id": 44, "price": 80000.00}, # Corporate Events
    {"service_id": 16, "subcategory_id": 45, "price": 30000.00}, # Private Parties

    # Photography (service_id: 17)
    {"service_id": 17, "subcategory_id": 46, "price": 8000.00}, # Portrait Photography
    {"service_id": 17, "subcategory_id": 47, "price": 15000.00}, # Event Photography
    {"service_id": 17, "subcategory_id": 48, "price": 12000.00}, # Product Photography

    # Pet Services (service_id: 18)
    {"service_id": 18, "subcategory_id": 49, "price": 3000.00}, # Dog Walking
    {"service_id": 18, "subcategory_id": 50, "price": 5000.00}, # Pet Grooming
    {"service_id": 18, "subcategory_id": 51, "price": 7000.00}, # Pet Boarding

    # Catering (service_id: 19)
    {"service_id": 19, "subcategory_id": 52, "price": 50000.00}, # Wedding Catering
    {"service_id": 19, "subcategory_id": 53, "price": 70000.00}, # Corporate Catering
    {"service_id": 19, "subcategory_id": 54, "price": 40000.00}, # Private Event Catering

    # Translation Services (service_id: 20)
    {"service_id": 20, "subcategory_id": 55, "price": 10000.00}, # Document Translation
    {"service_id": 20, "subcategory_id": 56, "price": 15000.00}, # Live Interpretation
    {"service_id": 20, "subcategory_id": 57, "price": 20000.00}, # Website Localization
]

with app.app_context():
  for data in pricing_data:
    pricing_entry = Pricing(**data)
    db.session.add(pricing_entry)

  db.session.commit()
print("Pricing data seeded successfully!")

# services = [
#     {
#         "name": "Freelance Writing Services",
#         "description": "Professional writing services for blogs, articles, and copywriting.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iwriter.com%2Fblog%2Fwhat-is-a-freelance-writer-and-how-does-freelance-writing-work%2F&psig=AOvVaw37f5OrM0whqK6Rd-n_or8z&ust=1740052886816000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKi94aXYz4sDFQAAAAAdAAAAABAE",
#         "category": "Writing & Content"
#     },
#     {
#         "name": "Plumbing Services",
#         "description": "Expert plumbing solutions for leaks, installations, and maintenance.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.robinsonsplumbingservice.com%2Fplumbing-services%2Fmidlothian-va%2F&psig=AOvVaw2_X96NwQ0kIC6hT0f-zRii&ust=1740052929310000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCd-dLYz4sDFQAAAAAdAAAAABAE",
#         "category": "Home Services"
#     },
#     {
#         "name": "Electrical Services",
#         "description": "Qualified electricians for home and commercial electrical repairs and installations.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fissuu.com%2Fdgroose89%2Fdocs%2Fev_charging_stations%2Fs%2F28695845&psig=AOvVaw01dMzdlR7ag9S6Yu2d-Xui&ust=1740053025966000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDqj_LYz4sDFQAAAAAdAAAAABAR",
#         "category": "Home Services"
#     },
#     {
#         "name": "Fitness Training Services",
#         "description": "Personalized fitness coaching and workout plans to achieve your health goals.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnurecreation.com%2Fnews%2F2019%2F7%2F1%2Fpersonal-training-services.aspx&psig=AOvVaw3vsjmxyVtoiAYeyoK0xchT&ust=1740053118943000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIC3vMPZz4sDFQAAAAAdAAAAABAE",
#         "category": "Health & Wellness"
#     },
#     {
#         "name": "Braiding/Plaiting Services",
#         "description": "Professional braiding and hair styling services for all hair types.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.privatelabelextensions.com%2Fblogs%2Fbraids%2Fprofessional-braiding-services&psig=AOvVaw0w1CdiHprJNztZuSCqpi2f&ust=1740053251032000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjFyOHZz4sDFQAAAAAdAAAAABAE",
#         "category": "Beauty & Personal Care"
#     },
#     {
#         "name": "Cleaning Services",
#         "description": "Reliable residential and commercial cleaning services.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcleanbuddies.com.ng%2Fwhy-hire-a-professional-cleaner%2F&psig=AOvVaw0PGJlZqyyhpEpf2_UMngcK&ust=1740053341930000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiTyITaz4sDFQAAAAAdAAAAABAE",
#         "category": "Home Services"
#     },
#     {
#         "name": "Nail Services",
#         "description": "Manicure, pedicure, and nail art services for a stunning look.",
#         "image": "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.kuzabiashara.co.ke%2Fblog%2Fnail-parlor-business-in-kenya-how-to-start-small-and-build-your-beauty-empire%2F&psig=AOvVaw23u3qyOxdUpcTaNPpj2SCb&ust=1740053387358000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiW66Daz4sDFQAAAAAdAAAAABAE",
#         "category": "Beauty & Personal Care"
#     },
#     {
#         "name": "Gardening Services",
#         "description": "Lawn care, landscaping, and plant maintenance services.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftitossycleaning.co.ke%2Flandscaping-and-gardening-services%2F&psig=AOvVaw3lBOz6NuCbLJwJ3RY9mPQ7&ust=1740053444331000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIiW9bXaz4sDFQAAAAAdAAAAABAE",
#         "category": "Home Services"
#     },
#     {
#         "name": "Pest Control Services",
#         "description": "Safe and effective pest extermination for homes and businesses.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jopestkil.com%2F&psig=AOvVaw2Uz-N7sa4AAKN5RUFax4OP&ust=1740053488683000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiVxsPaz4sDFQAAAAAdAAAAABAE",
#         "category": "Home Services"
#     },
#     {
#         "name": "Tutoring Services",
#         "description": "One-on-one and group tutoring for various subjects and levels.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscc.spokane.edu%2FFor-Our-Students%2FGetting-Help%2FTutoring&psig=AOvVaw14kMCUG5WEtTdvHEIEsKVq&ust=1740053514144000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCjx9zaz4sDFQAAAAAdAAAAABAJ",
#         "category": "Education"
#     },
#     {
#         "name": "Auto Repair Services",
#         "description": "Car maintenance, repairs, and diagnostics from experienced mechanics.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgaugemagazine.com%2Fthe-benefits-of-auto-repair-services-for-your-vehicle%2F&psig=AOvVaw3qH5ZAYuywHfVsAjOYTEUw&ust=1740053588269000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDE74bbz4sDFQAAAAAdAAAAABAE",
#         "category": "Automotive"
#     },
#     {
#         "name": "Painting Services",
#         "description": "Interior and exterior painting services for homes and businesses.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fdeluxepainterskenya%2F&psig=AOvVaw3eREFDJYysqzk9gFspbO9Y&ust=1740053656659000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPj6xpLbz4sDFQAAAAAdAAAAABAE",
#         "category": "Home Services"
#     },
#     {
#         "name": "Web Development Services",
#         "description": "Custom website design and development for businesses and individuals.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Finceptor.co.ke%2Fwebsite-design-and-development%2F&psig=AOvVaw3Yf5wljFh5npW-dI9Fd8vG&ust=1740053684879000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPC_-Z_bz4sDFQAAAAAdAAAAABAE",
#         "category": "Tech & IT"
#     },
#     {
#         "name": "Graphic Design Services",
#         "description": "Logos, branding, and design work tailored to your business needs.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fopenlink.co.ke%2Fservice%2Fgraphics-design%2F&psig=AOvVaw0Yf2xqUbryY9QNi-6AMebN&ust=1740053727331000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD95LTbz4sDFQAAAAAdAAAAABAE",
#         "category": "Tech & IT"
#     },
#     {
#         "name": "Event Planning Services",
#         "description": "Full-service event planning and coordination for any occasion.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fevent-planning-services-2850810954362.html&psig=AOvVaw1fTbjseL9p0Q4cIFICW-fE&ust=1740053764654000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiIvsvbz4sDFQAAAAAdAAAAABAE",
#         "category": "Entertainment"
#     },
#     {
#         "name": "Photography Services",
#         "description": "Professional photography for events, portraits, and commercial use.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonicmarketingagency.com%2Fphotography-and-videography-services%2F&psig=AOvVaw0IQkH85kUfrXsxSN0aCbNd&ust=1740053801841000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDQiOnbz4sDFQAAAAAdAAAAABAE",
#         "category": "Entertainment"
#     },
#     {
#         "name": "Pet Sitting Services",
#         "description": "Trusted pet care and sitting services while you’re away.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fabwerrands.com%2F&psig=AOvVaw3uhcnlHYXPJSpdBkN12tT2&ust=1740053867493000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCe6Yvcz4sDFQAAAAAdAAAAABAE",
#         "category": "Pet Services"
#     },
#     {
#         "name": "Catering Services",
#         "description": "Delicious catering options for events, weddings, and gatherings.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbestcare.co.ke%2Fcatering-services-nairobi-kenya%2F&psig=AOvVaw0D3bQuL0LBAlNfh6Bjeo4R&ust=1740053935233000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKihmpjcz4sDFQAAAAAdAAAAABAJ",
#         "category": "Food & Beverage"
#     },
#     {
#         "name": "Translating Services",
#         "description": "Accurate translation services for multiple languages.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsitc-tvet.ac.ke%2Ftranslation-and-interpretation-services%2F&psig=AOvVaw0v7beskiImxScMQ53zuHks&ust=1740053972992000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjG_Kncz4sDFQAAAAAdAAAAABAE",
#         "category": "Business Services"
#     },
#     {
#         "name": "Interior Designing Services",
#         "description": "Creative and functional interior design solutions for homes and offices.",
#         "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fincrestconstruction.com%2Finterior-design-services-in-kenya&psig=AOvVaw1qLkZJO5FGcjGLEFP5f1ya&ust=1740053998884000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiPqLjcz4sDFQAAAAAdAAAAABAE",
#         "category": "Home Services"
#     }
# ]


# subcategories = [
#     {"name": "Blog Writing", "service_id": 2},
#     {"name": "Copywriting", "service_id": 2},
#     {"name": "Technical Writing", "service_id": 2},

#     {"name": "Leak Repairs", "service_id": 3},
#     {"name": "Pipe Installation", "service_id": 3},
#     {"name": "Drain Cleaning", "service_id": 3},

#     {"name": "Home Wiring", "service_id": 4},
#     {"name": "Electrical Repairs", "service_id": 4},
#     {"name": "Lighting Installation", "service_id": 4},

#     {"name": "Personal Training", "service_id": 5},
#     {"name": "Group Fitness", "service_id": 5},
#     {"name": "Weight Loss Programs", "service_id": 5},

#     {"name": "Box Braids", "service_id": 6},
#     {"name": "Cornrows", "service_id": 6},
#     {"name": "Twists", "service_id": 6},

#     {"name": "Residential Cleaning", "service_id": 7},
#     {"name": "Office Cleaning", "service_id": 7},
#     {"name": "Deep Cleaning", "service_id": 7},

#     {"name": "Manicure", "service_id": 8},
#     {"name": "Pedicure", "service_id": 8},
#     {"name": "Nail Art", "service_id": 8},

#     {"name": "Lawn Mowing", "service_id": 9},
#     {"name": "Tree Trimming", "service_id": 9},
#     {"name": "Garden Maintenance", "service_id": 9},

#     {"name": "Termite Control", "service_id": 10},
#     {"name": "Rodent Control", "service_id": 10},
#     {"name": "Insect Extermination", "service_id": 10},

#     {"name": "Math Tutoring", "service_id": 11},
#     {"name": "Science Tutoring", "service_id": 11},
#     {"name": "Language Tutoring", "service_id": 11},

#     {"name": "Engine Repair", "service_id": 12},
#     {"name": "Brake Service", "service_id": 12},
#     {"name": "Oil Change", "service_id": 12},

#     {"name": "Wall Painting", "service_id": 13},
#     {"name": "Furniture Painting", "service_id": 13},
#     {"name": "Outdoor Painting", "service_id": 13},

#     {"name": "Website/Portfolio Development", "service_id": 14},
#     {"name": "E-commerce Website", "service_id": 14},
#     {"name": "System Development", "service_id": 14},

#     {"name": "Logo Design", "service_id": 15},
#     {"name": "Brand Identity", "service_id": 15},
#     {"name": "UI/UX Design", "service_id": 15},

#     {"name": "Wedding Planning", "service_id": 16},
#     {"name": "Corporate Events", "service_id": 16},
#     {"name": "Private Parties", "service_id": 16},

#     {"name": "Portrait Photography", "service_id": 17},
#     {"name": "Event Photography", "service_id": 17},
#     {"name": "Product Photography", "service_id": 17},

#     {"name": "Dog Walking", "service_id": 18},
#     {"name": "Pet Grooming", "service_id": 18},
#     {"name": "Pet Boarding", "service_id": 18},

#     {"name": "Wedding Catering", "service_id": 19},
#     {"name": "Corporate Catering", "service_id": 19},
#     {"name": "Private Event Catering", "service_id": 19},

#     {"name": "Document Translation", "service_id": 20},
#     {"name": "Live Interpretation", "service_id": 20},
#     {"name": "Website Localization", "service_id": 20},

#     {"name": "Residential Interior Design", "service_id": 21},
#     {"name": "Commercial Interior Design", "service_id": 21},
#     {"name": "Space Planning", "service_id": 21},
# ]