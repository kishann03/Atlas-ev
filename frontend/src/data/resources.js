// Content for the /resources/:slug info pages linked from the footer.
const resources = {
  "reliability-score": {
    title: "Reliability Score",
    group: "Product",
    summary: "How Atlas EV rates whether a charger will actually work when you arrive.",
    sections: [
      { heading: "What it measures", body: "Every station gets a score from 0 to 100 based on how often it was available, how often drivers completed a session without errors, and how recently it was confirmed working." },
      { heading: "Why it matters", body: "A charger that is listed as free but is offline or faulty costs you time and range. The score helps you pick the charger you can count on, not just the closest one." },
      { heading: "How it updates", body: "Scores change as new availability data and driver reports come in. A station with no recent activity is marked with lower confidence until it is confirmed again." },
    ],
  },
  "cost-comparison": {
    title: "Cost Comparison",
    group: "Product",
    summary: "See what a full charge costs across networks before you plug in.",
    sections: [
      { heading: "Price per kWh and per session", body: "Atlas EV shows each station's price per kWh and converts it into an estimated cost for your vehicle's battery size." },
      { heading: "Compare networks side by side", body: "Pricing differs widely between networks and between AC and DC chargers. Comparing them before you leave helps you avoid paying more for the same energy." },
      { heading: "Estimates, not quotes", body: "Final cost depends on the charger's actual rate, idle fees and the state of your battery. Treat the figures as a guide." },
    ],
  },
  "vehicle-profiles": {
    title: "Vehicle Profiles",
    group: "Product",
    summary: "Save your EV so recommendations match your connector and range.",
    sections: [
      { heading: "Add your vehicle", body: "Choose your car from the list of popular Indian EVs or enter your own battery size, range and connector type from your profile." },
      { heading: "Better matches", body: "With a vehicle saved, Atlas EV can filter out chargers your car cannot use and estimate charging time and cost more accurately." },
    ],
  },
  about: {
    title: "About Atlas EV",
    group: "Company",
    summary: "Why we are building a smarter way to find EV chargers in India.",
    sections: [
      { heading: "The problem", body: "Most charger maps tell you what is nearest. They rarely tell you whether it is free, working, fairly priced, or worth the detour." },
      { heading: "What we are building", body: "Atlas EV compares nearby chargers on availability, expected wait, cost and reliability, then recommends the best one for your vehicle." },
      { heading: "Where we are", body: "Atlas EV is an early-stage project. Station data shown in this version is sample data for demonstration." },
    ],
  },
  "help-center": {
    title: "Help Center",
    group: "Company",
    summary: "Answers to common questions about using Atlas EV.",
    sections: [
      { heading: "I cannot see any chargers", body: "Charger search is available to signed-in users. Log in or create an account, then open Find Chargers." },
      { heading: "How do I add my vehicle?", body: "Open your profile from the circle with your initials in the top right, then choose Vehicles." },
      { heading: "How do I change my password?", body: "Open your profile, choose Security, then enter your current and new password." },
      { heading: "Directions do not open", body: "Get Directions opens Google Maps in a new tab. Allow pop-ups for this site if your browser blocks it." },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    group: "Legal",
    summary: "What information Atlas EV collects and how it is used. Sample text for this demo.",
    sections: [
      { heading: "Information we store", body: "Your name, email address, a securely hashed password and any vehicles you add to your profile." },
      { heading: "How it is used", body: "To sign you in, personalise charger recommendations and keep your saved vehicles. We do not sell personal data." },
      { heading: "Your choices", body: "You can change your password and remove saved vehicles at any time from your profile." },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    group: "Legal",
    summary: "The rules for using Atlas EV. Sample text for this demo.",
    sections: [
      { heading: "Using the service", body: "Atlas EV provides charger information for planning. Always confirm availability and pricing at the charger before relying on it." },
      { heading: "Accounts", body: "You are responsible for keeping your login details secure and for activity under your account." },
      { heading: "Accuracy", body: "Station data may be incomplete or out of date. The service is provided as is, without warranty." },
    ],
  },
};

export const footerGroups = [
  { title: "Product", slugs: ["reliability-score", "cost-comparison", "vehicle-profiles"] },
  { title: "Company", slugs: ["about", "help-center"] },
  { title: "Legal", slugs: ["privacy-policy", "terms-of-service"] },
];

export default resources;
