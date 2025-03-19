
// Mock news articles data
const newsArticles = [
  {
    id: '1',
    title: 'City Council Approves New Downtown Development Project',
    summary: 'The San Francisco City Council has unanimously approved a new mixed-use development project in the heart of downtown that will include affordable housing units.',
    content: 'After months of deliberation and community feedback, the San Francisco City Council voted 8-0 to approve the new downtown development project, which will include 200 residential units, 50 of which will be designated as affordable housing. The project will also include ground-floor retail spaces and a public plaza. Construction is expected to begin in early 2024 and be completed by mid-2026. Local businesses have expressed optimism about the economic boost the development could bring to the area.',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Local',
    publishedAt: '2023-09-15T08:00:00Z',
    location: 'San Francisco',
    source: 'SF Chronicle',
    sourceId: 'sf-chronicle',
    slug: 'city-council-approves-new-downtown-development-project'
  },
  {
    id: '2',
    title: 'Local Restaurant Week Returns With Special Menus',
    summary: 'The annual Restaurant Week is back, featuring special prix fixe menus from over 50 local eateries. This year\'s event aims to boost recovery for the hospitality industry.',
    content: 'San Francisco\'s beloved Restaurant Week returns next Monday, featuring special menus from more than 50 local restaurants. Participating establishments will offer prix fixe lunch and dinner options ranging from $25 to $65, allowing diners to experience high-end cuisine at more accessible prices. This year\'s event is particularly significant as the hospitality industry continues to recover from the impacts of the pandemic. "We\'re excited to welcome diners back and showcase the incredible culinary talent in our city," said Maria Chen, president of the SF Restaurant Association. The event runs for two weeks, ending on October 1st.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Food',
    publishedAt: '2023-09-14T10:30:00Z',
    location: 'San Francisco',
    source: 'Bay Area Foodie',
    sourceId: 'maria-chen',
    slug: 'local-restaurant-week-returns-with-special-menus'
  },
  {
    id: '3',
    title: 'Tech Company Expands Operations, Adding 200 Jobs',
    summary: 'A leading tech firm has announced the expansion of its San Francisco headquarters, which will create approximately 200 new jobs in software development and customer support.',
    content: 'TechInnovate, a rapidly growing software company, announced yesterday that it will expand its San Francisco headquarters, adding approximately 200 new jobs over the next 18 months. The expansion will include roles in software development, customer support, and product management. The company, which specializes in AI-driven productivity tools, cited San Francisco\'s rich talent pool as a key factor in its decision to expand locally rather than open a new office elsewhere. "We\'re committed to growing our presence in San Francisco and contributing to the local tech ecosystem," said CEO James Wilson. The company will begin hiring immediately, with many positions offering remote-flexible work arrangements.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Business',
    publishedAt: '2023-09-13T14:45:00Z',
    location: 'San Francisco',
    source: 'Tech Daily',
    sourceId: 'mission-local',
    slug: 'tech-company-expands-operations-adding-200-jobs'
  },
  {
    id: '4',
    title: 'Weekend Weather Alert: Heavy Rain Expected',
    summary: 'Meteorologists predict significant rainfall this weekend, with potential for localized flooding in low-lying areas. Residents are advised to prepare accordingly.',
    content: 'The National Weather Service has issued a heavy rain advisory for the San Francisco Bay Area this weekend. Beginning Friday evening and extending through Sunday, the region is expected to receive between 2-4 inches of rainfall, with higher amounts possible in elevated areas. Meteorologists warn that the intensity of the rainfall could lead to localized flooding, particularly in low-lying areas and those with poor drainage. Residents are advised to clear gutters and storm drains, and to avoid unnecessary travel during the heaviest periods of rain. City officials have announced that emergency response teams will be on standby throughout the weekend.',
    imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Weather',
    publishedAt: '2023-09-12T16:20:00Z',
    location: 'San Francisco',
    source: 'Bay Area Weather Service',
    sourceId: 'bay-guardian',
    slug: 'weekend-weather-alert-heavy-rain-expected'
  },
  {
    id: '5',
    title: 'Local School Wins State Science Competition',
    summary: 'Students from Mission High School have taken first place in the state science competition with their innovative project on sustainable urban farming techniques.',
    content: 'A team of four students from Mission High School brought home the top prize from the California State Science Competition last weekend. Their project, "Vertical Hydroponic Systems for Urban Food Security," impressed judges with its innovative approach to growing food in limited spaces using minimal water. The team, led by senior Maya Rodriguez, developed a prototype that demonstrated a 40% increase in yield compared to traditional container gardening methods, while using 60% less water. "We wanted to create something that could make a real difference in urban communities with limited access to fresh produce," Rodriguez explained. The team received a $5,000 grant to further develop their project and will represent California at the National Science Fair in Chicago this November.',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    category: 'Education',
    publishedAt: '2023-09-11T09:15:00Z',
    location: 'San Francisco',
    source: 'Education Weekly',
    sourceId: 'david-rodriguez',
    slug: 'local-school-wins-state-science-competition'
  },
  {
    id: '6',
    title: 'New Bike Lanes to Connect Downtown and Marina District',
    summary: 'The city has approved the construction of protected bike lanes that will connect downtown to the Marina District, improving safety for cyclists and encouraging green transportation.',
    content: 'The San Francisco Municipal Transportation Agency (SFMTA) has approved plans for new protected bike lanes that will connect downtown to the Marina District. The 2.5-mile route will include physical barriers separating cyclists from vehicle traffic, dedicated traffic signals, and improved intersection designs to reduce conflict points. "This project represents a significant step toward our goal of making cycling a safe and viable transportation option for everyone," said Transportation Director Linda Park. Construction is scheduled to begin in January 2024 and is expected to take approximately 8 months. The $3.2 million project is funded through a combination of local transportation taxes and a state grant focused on reducing carbon emissions.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Infrastructure',
    publishedAt: '2023-09-10T11:45:00Z',
    location: 'San Francisco',
    source: 'SF Urban Planning',
    sourceId: 'sf-chronicle',
    slug: 'new-bike-lanes-to-connect-downtown-and-marina-district'
  },
  {
    id: '7',
    title: 'Oakland Farmers Market Expands to Include Craft Vendors',
    summary: 'The popular Oakland Farmers Market will now feature local artisans and craft vendors alongside fresh produce and food stalls.',
    content: 'Starting next month, the Oakland Farmers Market will expand to include up to 20 local artisan and craft vendors in addition to its regular lineup of fresh produce, baked goods, and prepared foods. The market, which operates every Saturday from 9am to 2pm, has been a community staple for over 15 years. Market manager David Rodriguez says the decision came after repeated requests from both customers and potential vendors. "We\'re excited to showcase the full range of Oakland\'s creative community," Rodriguez said. "From ceramics to jewelry to textiles, these new vendors represent the incredible artistic talent in our city." Craft vendors will be required to make their products locally and preference will be given to those using sustainable or upcycled materials.',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Local',
    publishedAt: '2023-09-14T12:30:00Z',
    location: 'Oakland',
    source: 'Oakland Weekly',
    sourceId: 'david-rodriguez',
    slug: 'oakland-farmers-market-expands-to-include-craft-vendors'
  },
  {
    id: '8',
    title: 'New Bus Route to Connect East Oakland with Downtown',
    summary: 'AC Transit announces new express route aimed at reducing commute times for East Oakland residents working downtown.',
    content: 'AC Transit has announced a new express bus route that will connect East Oakland neighborhoods to downtown, reducing commute times by an estimated 15-20 minutes. The new Line 12X will make limited stops along International Boulevard before using dedicated transit lanes to reach downtown Oakland. The service, which begins on October 1st, will run every 15 minutes during weekday commute hours. "We\'ve heard from East Oakland residents about the need for faster, more reliable transit options," said AC Transit Board Member Sofia Mendoza. "This new line will make a meaningful difference for people trying to get to work, school, or appointments downtown." AC Transit will hold community information sessions about the new route at neighborhood libraries throughout September.',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'Transportation',
    publishedAt: '2023-09-11T14:15:00Z',
    location: 'Oakland',
    source: 'East Bay Transit News',
    sourceId: 'david-rodriguez',
    slug: 'new-bus-route-to-connect-east-oakland-with-downtown'
  }
];

module.exports = newsArticles;
