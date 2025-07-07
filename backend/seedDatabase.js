import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Blog from './models/Blog.js';

dotenv.config();

// Sample users data
const sampleUsers = [
  {
    username: 'johnsmith',
    email: 'john@example.com',
    password: 'password123',
    bio: 'Tech enthusiast and software developer. Passionate about sharing knowledge through writing.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    username: 'sarahjones',
    email: 'sarah@example.com',
    password: 'password123',
    bio: 'Designer and creative writer. Love exploring the intersection of technology and design.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b0129c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    username: 'mikechenx',
    email: 'mike@example.com',
    password: 'password123',
    bio: 'Business strategist and entrepreneur. Writing about startups and growth strategies.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    username: 'emilyzhou',
    email: 'emily@example.com',
    password: 'password123',
    bio: 'Travel blogger and lifestyle writer. Sharing stories from around the world.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    username: 'alexrivera',
    email: 'alex@example.com',
    password: 'password123',
    bio: 'Full-stack developer and open source contributor. Passionate about web technologies.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

// Sample blogs data
const sampleBlogs = [
  {
    title: 'Getting Started with React and Modern JavaScript',
    content: `# Introduction to React

React has revolutionized the way we build user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and how it integrates with modern JavaScript features.

## What is React?

React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and has become one of the most popular front-end libraries in the world.

### Key Features

1. **Component-Based Architecture**: Build encapsulated components that manage their own state
2. **Virtual DOM**: Efficient updates and rendering
3. **Declarative**: Describe what your UI should look like for any given state
4. **Learn Once, Write Anywhere**: Use React for web, mobile, and even desktop applications

## Getting Started

To start using React, you can create a new project using Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First Component

Here's a simple React component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Conclusion

React provides a powerful and flexible way to build modern web applications. With its component-based architecture and rich ecosystem, it's an excellent choice for developers of all skill levels.`,
    excerpt: 'Learn the fundamentals of React and modern JavaScript in this comprehensive beginner-friendly guide.',
    author: 'johnsmith',
    category: 'Technology',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 1250,
    likes: 89
  },
  {
    title: 'The Art of Minimalist Web Design',
    content: `# Embracing Minimalism in Web Design

Minimalist design is more than just a trend—it's a philosophy that emphasizes simplicity, functionality, and clarity. In web design, this approach can lead to more engaging and user-friendly experiences.

## Principles of Minimalist Design

### 1. Less is More
The core principle of minimalism is reduction. Remove unnecessary elements that don't serve a clear purpose.

### 2. White Space is Your Friend
White space (or negative space) isn't empty space—it's a design element that helps create hierarchy and improves readability.

### 3. Typography Matters
With fewer visual elements, typography becomes crucial. Choose fonts that are readable and reflect your brand's personality.

### 4. Focus on Functionality
Every element should have a purpose. If it doesn't improve the user experience, consider removing it.

## Benefits of Minimalist Design

- **Faster Loading Times**: Fewer elements mean faster page loads
- **Better User Experience**: Users can focus on what's important
- **Mobile-Friendly**: Simpler designs translate better to smaller screens
- **Timeless Appeal**: Minimalist designs age better than trend-heavy designs

## Implementation Tips

1. Start with content strategy
2. Use a limited color palette
3. Embrace grid systems
4. Optimize images and assets
5. Test across devices

## Conclusion

Minimalist web design isn't about removing everything—it's about removing the right things. When done well, it creates powerful, memorable experiences that users love.`,
    excerpt: 'Discover how minimalist design principles can transform your web projects and improve user experience.',
    author: 'sarahjones',
    category: 'Design',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 892,
    likes: 156
  },
  {
    title: 'Building a Successful Startup: Lessons from the Trenches',
    content: `# The Startup Journey: From Idea to Execution

Starting a business is one of the most challenging yet rewarding experiences an entrepreneur can have. After building three startups over the past decade, I've learned valuable lessons that I wish I knew when I started.

## The Foundation: Validating Your Idea

Before writing a single line of code or spending money on development, validate your idea:

### 1. Talk to Your Target Customers
Get out of the building and talk to potential customers. Understand their pain points and whether your solution addresses a real need.

### 2. Build an MVP (Minimum Viable Product)
Create the simplest version of your product that can test your core hypothesis.

### 3. Measure and Learn
Use data to guide your decisions. Set up analytics from day one.

## Building the Right Team

Your team is everything. Look for:
- **Complementary Skills**: You can't do everything yourself
- **Cultural Fit**: Skills can be taught, but attitude and values are harder to change
- **Commitment**: Startups require dedication and resilience

## Common Mistakes to Avoid

1. **Building in a Vacuum**: Don't spend months building without customer feedback
2. **Premature Scaling**: Focus on product-market fit before scaling
3. **Ignoring Finances**: Cash flow is the lifeblood of your startup
4. **Trying to Please Everyone**: Have a clear target market

## The Importance of Persistence

Startups are a marathon, not a sprint. There will be setbacks, rejections, and moments of doubt. The difference between successful and failed startups often comes down to persistence and the ability to adapt.

## Conclusion

Building a startup is incredibly difficult, but with the right approach, team, and mindset, it's possible to create something meaningful and profitable. Remember: start small, think big, and never stop learning.`,
    excerpt: 'Hard-earned lessons from building three startups, covering validation, team building, and common pitfalls to avoid.',
    author: 'mikechenx',
    category: 'Business',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 2100,
    likes: 234
  },
  {
    title: 'Digital Nomad Life: Working While Traveling the World',
    content: `# The Digital Nomad Lifestyle: Freedom and Challenges

For the past three years, I've been living as a digital nomad, working remotely while traveling to over 30 countries. It's been an incredible journey filled with adventures, challenges, and personal growth.

## What is a Digital Nomad?

A digital nomad is someone who uses technology to work remotely and live a location-independent lifestyle. We're not just tourists—we're professionals who happen to work from different places around the world.

## The Good: Why I Love This Lifestyle

### Freedom and Flexibility
- Work from anywhere with good internet
- Experience different cultures and perspectives
- Lower cost of living in many destinations
- Personal growth through constant adaptation

### Professional Benefits
- Improved time management skills
- Greater cultural awareness
- Enhanced problem-solving abilities
- Stronger self-discipline

## The Challenges: What They Don't Tell You

### Practical Issues
- **Internet Connectivity**: Not all places have reliable internet
- **Time Zones**: Coordinating with teams across different time zones
- **Loneliness**: It can get isolating without a consistent social circle
- **Visa Restrictions**: Navigating different countries' visa requirements

### Financial Considerations
- **Banking**: Accessing money across different countries
- **Taxes**: Understanding tax implications of your nomadic lifestyle
- **Healthcare**: Maintaining health insurance while traveling

## Essential Tips for Aspiring Digital Nomads

1. **Build a Remote-Friendly Skill Set**: Focus on skills that can be done entirely online
2. **Test the Waters**: Start with shorter trips before committing long-term
3. **Invest in Good Equipment**: Reliable laptop, noise-canceling headphones, portable chargers
4. **Join Nomad Communities**: Connect with other nomads for support and networking
5. **Plan Your Finances**: Have an emergency fund and understand the costs

## Best Destinations for Digital Nomads

Based on my experience, here are some top destinations:
- **Lisbon, Portugal**: Great weather, affordable, strong nomad community
- **Canggu, Bali**: Beautiful beaches, low cost of living, excellent coworking spaces
- **Mexico City, Mexico**: Rich culture, affordable, good internet infrastructure
- **Tbilisi, Georgia**: Unique culture, very affordable, friendly visa policies

## Conclusion

The digital nomad lifestyle isn't for everyone, but for those who value freedom, adventure, and personal growth, it can be incredibly rewarding. It requires discipline, planning, and adaptability, but the experiences and perspectives you gain are invaluable.

If you're considering this lifestyle, start small, do your research, and remember that it's okay to return to a more traditional lifestyle if it doesn't work out. The skills and experiences you gain will be valuable regardless of your path.`,
    excerpt: 'An honest look at the digital nomad lifestyle, covering both the freedoms and challenges of working while traveling.',
    author: 'emilyzhou',
    category: 'Lifestyle',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 1875,
    likes: 298
  },
  {
    title: 'Advanced JavaScript Patterns Every Developer Should Know',
    content: `# Mastering Advanced JavaScript Patterns

JavaScript has evolved significantly over the years, and modern development requires understanding advanced patterns that can make your code more maintainable, efficient, and elegant.

## 1. Module Pattern and ES6 Modules

### Classic Module Pattern
\`\`\`javascript
const UserModule = (function() {
  let users = [];
  
  return {
    addUser(user) {
      users.push(user);
    },
    getUsers() {
      return [...users];
    }
  };
})();
\`\`\`

### ES6 Modules
\`\`\`javascript
// user.js
export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

export default function createUser(name, email) {
  return new User(name, email);
}
\`\`\`

## 2. Observer Pattern

Perfect for implementing event systems:

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
\`\`\`

## 3. Decorator Pattern

Enhance objects with additional functionality:

\`\`\`javascript
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  @readonly
  name = 'John';
}
\`\`\`

## 4. Async Patterns

### Promise Composition
\`\`\`javascript
const fetchUserData = async (userId) => {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(userId),
      fetchUserPosts(userId),
      fetchUserComments(userId)
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
\`\`\`

### Async Iterators
\`\`\`javascript
async function* fetchPages(url) {
  let nextUrl = url;
  
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    
    yield data.results;
    nextUrl = data.next;
  }
}
\`\`\`

## 5. Functional Programming Patterns

### Currying
\`\`\`javascript
const multiply = (a) => (b) => a * b;
const double = multiply(2);
console.log(double(5)); // 10
\`\`\`

### Composition
\`\`\`javascript
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = compose(square, double, addOne);
console.log(transform(3)); // ((3 + 1) * 2)² = 64
\`\`\`

## 6. Proxy Pattern

Intercept and customize operations:

\`\`\`javascript
const api = new Proxy({}, {
  get(target, prop) {
    return function(...args) {
      return fetch(\`/api/\${prop}\`, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());
    };
  }
});

// Usage: api.getUser(123) -> POST /api/getUser
\`\`\`

## Best Practices

1. **Use TypeScript**: Add static typing for better developer experience
2. **Embrace Immutability**: Avoid mutating objects and arrays
3. **Handle Errors Gracefully**: Always consider error cases
4. **Write Tests**: Especially for complex patterns
5. **Keep It Simple**: Don't over-engineer solutions

## Conclusion

These patterns are tools in your toolkit. Use them when they solve real problems, not just because they're clever. Understanding these patterns will make you a more effective JavaScript developer and help you write more maintainable code.`,
    excerpt: 'Deep dive into advanced JavaScript patterns including modules, observers, decorators, and functional programming techniques.',
    author: 'alexrivera',
    category: 'Technology',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 1650,
    likes: 201
  },
  {
    title: 'The Psychology of Color in User Interface Design',
    content: `# Color Psychology in UI Design: More Than Just Pretty Pictures

Color is one of the most powerful tools in a designer's arsenal. It can evoke emotions, guide user behavior, and create memorable experiences. Understanding color psychology is crucial for creating effective user interfaces.

## The Science Behind Color Psychology

Colors affect us on both conscious and subconscious levels. They can influence our mood, perception, and even decision-making processes. This isn't just theory—it's backed by psychological research and real-world testing.

## Color Meanings and Associations

### Red
- **Emotions**: Energy, passion, urgency, danger
- **Use Cases**: Call-to-action buttons, sale notifications, error messages
- **Brands**: Netflix, YouTube, Coca-Cola

### Blue
- **Emotions**: Trust, reliability, calmness, professionalism
- **Use Cases**: Financial apps, healthcare, corporate websites
- **Brands**: Facebook, Twitter, LinkedIn

### Green
- **Emotions**: Nature, growth, success, money
- **Use Cases**: Success messages, financial apps, environmental brands
- **Brands**: Spotify, WhatsApp, Starbucks

### Yellow
- **Emotions**: Happiness, optimism, caution, attention
- **Use Cases**: Notifications, highlights, warnings
- **Brands**: McDonald's, Snapchat, IKEA

### Purple
- **Emotions**: Luxury, creativity, mystery, spirituality
- **Use Cases**: Premium products, creative tools, beauty brands
- **Brands**: Twitch, Yahoo, Hallmark

## Cultural Considerations

Color meanings vary across cultures:
- **White**: Purity in Western cultures, mourning in some Eastern cultures
- **Red**: Luck in China, danger in Western countries
- **Green**: Nature universally, but jealousy in some contexts

## Practical Application in UI Design

### 1. Establish Visual Hierarchy
Use color contrast to guide users' attention:
\`\`\`css
.primary-button {
  background: #007bff; /* High contrast for important actions */
}

.secondary-button {
  background: #6c757d; /* Lower contrast for secondary actions */
}
\`\`\`

### 2. Create Emotional Connections
Match colors to your brand personality:
- Trustworthy financial app: Blues and whites
- Fun social app: Bright, energetic colors
- Luxury brand: Deep purples, golds, blacks

### 3. Improve Usability
- **Error states**: Red for errors, orange for warnings
- **Success states**: Green for completion, confirmations
- **Information**: Blue for informational messages

## Color Accessibility

Never rely on color alone to convey information:
- Use icons alongside color coding
- Ensure sufficient contrast ratios (WCAG guidelines)
- Test with color blindness simulators

### WCAG Contrast Requirements
- **Normal text**: 4.5:1 contrast ratio
- **Large text**: 3:1 contrast ratio
- **Non-text elements**: 3:1 contrast ratio

## Tools for Choosing Colors

1. **Adobe Color**: Create color palettes and test accessibility
2. **Coolors.co**: Generate and explore color schemes
3. **Contrast Checker**: Verify WCAG compliance
4. **Colorbrewer**: Scientific color schemes for data visualization

## A/B Testing Color Choices

Always test your color decisions:
- Button colors can impact conversion rates by 10-15%
- Background colors affect perceived trustworthiness
- Text colors impact readability and engagement

## Case Study: Optimizing a CTA Button

Original: Gray button with 2.1% conversion rate
Test A: Blue button → 2.8% conversion rate (+33%)
Test B: Green button → 3.2% conversion rate (+52%)
Test C: Orange button → 2.9% conversion rate (+38%)

Winner: Green button (associated with "go" and success)

## Best Practices

1. **Start with Grayscale**: Design functionality first, color second
2. **Use the 60-30-10 Rule**: 60% primary, 30% secondary, 10% accent
3. **Consider Context**: Morning news app vs. evening entertainment app
4. **Test Early and Often**: Colors that work in design may not work in reality
5. **Keep Accessibility in Mind**: Design for everyone, not just those with perfect vision

## Conclusion

Color psychology in UI design is both an art and a science. While there are established principles and associations, the key is understanding your users, testing your decisions, and always prioritizing usability over aesthetics.

Remember: the best color scheme is one that serves your users' needs while supporting your brand goals. When in doubt, test it out!`,
    excerpt: 'Explore how color psychology influences user behavior and learn practical techniques for choosing effective UI colors.',
    author: 'sarahjones',
    category: 'Design',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 1420,
    likes: 187
  },
  {
    title: 'Sustainable Living: Small Changes, Big Impact',
    content: `# Living Sustainably in the Modern World

Climate change is one of the most pressing issues of our time, but individual actions can make a meaningful difference. Here's how to start your sustainable living journey.

## Start with Energy Consumption

### Home Energy Efficiency
- **LED Lighting**: Replace incandescent bulbs with LED alternatives
- **Smart Thermostats**: Optimize heating and cooling automatically
- **Insulation**: Proper insulation can reduce energy bills by 30%
- **Solar Panels**: Consider renewable energy sources for your home

### Transportation Choices
- **Public Transport**: Reduce carbon footprint by using buses, trains, and subways
- **Cycling**: Great for short distances and personal health
- **Electric Vehicles**: If you need a car, consider electric or hybrid options
- **Carpooling**: Share rides when possible

## Sustainable Food Choices

### Eat More Plants
A plant-based diet has a significantly lower environmental impact:
- **Reduce Meat Consumption**: Even one meatless day per week helps
- **Local Produce**: Buy from local farmers to reduce transportation emissions
- **Seasonal Eating**: Consume fruits and vegetables when they're in season
- **Grow Your Own**: Start a small garden or herb box

### Reduce Food Waste
- **Meal Planning**: Plan meals to avoid overbuying
- **Proper Storage**: Learn how to store different foods to extend freshness
- **Composting**: Turn food scraps into nutrient-rich soil
- **Creative Leftovers**: Transform leftovers into new meals

## Conscious Consumption

### Buy Less, Choose Better
- **Quality over Quantity**: Invest in durable, well-made items
- **Second-Hand Shopping**: Thrift stores and online marketplaces offer great finds
- **Repair Don't Replace**: Learn basic repair skills for clothing and appliances
- **Minimalism**: Focus on what you truly need and use

### Plastic Reduction
- **Reusable Bags**: Always carry reusable shopping bags
- **Water Bottles**: Invest in a quality stainless steel or glass bottle
- **Food Containers**: Use glass containers for food storage
- **Refuse Single-Use**: Say no to plastic straws, utensils, and cups

## The Ripple Effect

Remember, sustainable living isn't about perfection—it's about making better choices when possible. Every small action contributes to a larger movement toward environmental consciousness.

## Getting Started

1. **Choose One Area**: Don't try to change everything at once
2. **Set Realistic Goals**: Small, achievable changes are more sustainable
3. **Track Your Progress**: Monitor your energy usage and waste reduction
4. **Share Your Journey**: Inspire others by sharing your sustainable choices

## Conclusion

Sustainable living is a journey, not a destination. Each conscious choice we make contributes to a healthier planet for future generations. Start small, stay consistent, and remember that every action matters.`,
    excerpt: 'Practical tips for living sustainably, from energy efficiency to conscious consumption, showing how small changes can create a big environmental impact.',
    author: 'emilyzhou',
    category: 'Environment',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 3200,
    likes: 412
  },
  {
    title: 'The Future of Artificial Intelligence: Opportunities and Challenges',
    content: `# AI Revolution: Navigating the Future of Technology

Artificial Intelligence is no longer science fiction—it's reshaping industries, changing how we work, and transforming our daily lives. Let's explore what the future holds.

## Current State of AI

### Machine Learning Breakthroughs
- **Deep Learning**: Neural networks are solving complex problems in image recognition, natural language processing, and decision making
- **Large Language Models**: GPT and similar models are revolutionizing text generation and understanding
- **Computer Vision**: AI can now interpret and analyze visual data with superhuman accuracy
- **Reinforcement Learning**: AI systems learn optimal strategies through trial and error

### Real-World Applications Today
- **Healthcare**: AI assists in medical diagnosis, drug discovery, and personalized treatment plans
- **Transportation**: Autonomous vehicles and traffic optimization systems
- **Finance**: Fraud detection, algorithmic trading, and credit scoring
- **Entertainment**: Content recommendation and personalized experiences

## Emerging Opportunities

### Industry Transformation
**Education**
- Personalized learning paths adapted to individual students
- AI tutors providing 24/7 support
- Automated grading and feedback systems
- Language learning with real-time pronunciation correction

**Creative Industries**
- AI-assisted design and art creation
- Music composition and production tools
- Writing assistance and content generation
- Film and game development acceleration

**Scientific Research**
- Drug discovery and molecular analysis
- Climate modeling and environmental monitoring
- Space exploration and data analysis
- Materials science and engineering optimization

### Job Market Evolution
While AI will automate some jobs, it will also create new opportunities:
- **AI Specialists**: Machine learning engineers, data scientists
- **Human-AI Collaboration**: Roles that combine human creativity with AI efficiency
- **AI Ethics and Safety**: Professionals ensuring responsible AI development
- **AI Trainers**: People who teach AI systems and improve their performance

## Challenges and Concerns

### Technical Challenges
- **Bias and Fairness**: Ensuring AI systems don't perpetuate or amplify human biases
- **Explainability**: Making AI decisions transparent and understandable
- **Robustness**: Creating AI that works reliably in diverse, real-world conditions
- **Security**: Protecting AI systems from adversarial attacks and misuse

### Societal Implications
- **Privacy**: Balancing AI capabilities with personal data protection
- **Employment**: Managing the transition as AI automates various jobs
- **Inequality**: Ensuring AI benefits are distributed fairly across society
- **Autonomy**: Maintaining human agency in an AI-driven world

### Ethical Considerations
- **Decision Making**: Who is responsible when AI makes harmful decisions?
- **Surveillance**: How much monitoring is acceptable for safety and convenience?
- **Manipulation**: Preventing AI from being used to manipulate human behavior
- **Rights**: Should advanced AI systems have rights or legal status?

## Preparing for an AI Future

### For Individuals
1. **Continuous Learning**: Stay updated with technology trends and develop new skills
2. **Human Skills**: Focus on creativity, emotional intelligence, and critical thinking
3. **AI Literacy**: Understand how AI works and its capabilities/limitations
4. **Adaptability**: Be ready to work alongside AI tools and systems

### For Organizations
1. **Strategic Planning**: Develop clear AI adoption strategies
2. **Ethical Frameworks**: Establish guidelines for responsible AI use
3. **Workforce Development**: Retrain employees for AI-augmented roles
4. **Risk Management**: Assess and mitigate AI-related risks

### For Society
1. **Regulation**: Develop appropriate governance frameworks for AI
2. **Education**: Update educational systems to include AI literacy
3. **Social Safety Nets**: Support those displaced by AI automation
4. **Global Cooperation**: Collaborate on AI standards and best practices

## The Road Ahead

The future of AI is not predetermined—it's shaped by the choices we make today. By approaching AI development with wisdom, caution, and optimism, we can harness its potential while minimizing risks.

## Conclusion

AI represents one of the most significant technological advances in human history. Success in navigating this transformation requires proactive planning, ethical consideration, and collaborative effort across all sectors of society. The future is bright, but it requires our thoughtful participation to realize AI's full potential for humanity.`,
    excerpt: 'Exploring the transformative potential of AI across industries, examining both opportunities and challenges as we navigate toward an AI-integrated future.',
    author: 'alexrivera',
    category: 'Technology',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 2800,
    likes: 356
  },
  {
    title: 'Mindfulness and Mental Health in the Digital Age',
    content: `# Finding Balance: Mental Wellness in Our Connected World

In our hyperconnected digital era, maintaining mental health and practicing mindfulness has become more crucial—and more challenging—than ever before.

## The Digital Dilemma

### Information Overload
- **Constant Connectivity**: 24/7 access to information and communication
- **Social Media Pressure**: Comparison culture and curated perfection
- **News Anxiety**: Overwhelming negative news cycles
- **FOMO (Fear of Missing Out)**: Anxiety about being left behind

### Physical Effects of Digital Life
- **Screen Time**: Extended device usage affecting sleep and eye health
- **Sedentary Lifestyle**: Reduced physical activity and outdoor time
- **Posture Problems**: "Tech neck" and back issues from poor ergonomics
- **Sleep Disruption**: Blue light exposure affecting circadian rhythms

## Understanding Mindfulness

### What is Mindfulness?
Mindfulness is the practice of being fully present and engaged in the current moment, aware of where we are and what we're doing, without being overwhelmed by what's happening around us.

### Core Principles
- **Present Moment Awareness**: Focusing on the here and now
- **Non-Judgmental Observation**: Noticing thoughts and feelings without criticism
- **Acceptance**: Acknowledging reality as it is, not as we wish it were
- **Compassion**: Treating ourselves and others with kindness

## Practical Mindfulness Techniques

### Daily Practices
**Morning Routine**
- **Mindful Waking**: Take 5 minutes before checking your phone
- **Breathing Exercises**: Start with simple breath awareness
- **Intention Setting**: Choose a positive focus for the day
- **Gratitude Practice**: List three things you're grateful for

**Throughout the Day**
- **Mindful Transitions**: Pause mindfully between activities
- **Body Scan**: Quick check-ins with physical sensations
- **Mindful Eating**: Pay attention to taste, texture, and hunger cues
- **Walking Meditation**: Practice awareness while moving

**Evening Wind-Down**
- **Digital Sunset**: Stop using devices 1 hour before bed
- **Reflection**: Review the day without judgment
- **Progressive Relaxation**: Release physical tension
- **Loving-Kindness**: Send good wishes to yourself and others

### Technology-Assisted Mindfulness
**Helpful Apps**
- **Meditation Apps**: Guided sessions for beginners and advanced practitioners
- **Breathing Apps**: Visual guides for breath work
- **Nature Sounds**: White noise and natural sounds for focus
- **Mindfulness Reminders**: Gentle prompts throughout the day

**Digital Boundaries**
- **App Limits**: Set time restrictions on social media and entertainment apps
- **Notification Management**: Turn off non-essential notifications
- **Phone-Free Zones**: Designate areas of your home as device-free spaces
- **Regular Digital Detoxes**: Take breaks from technology completely

## Mental Health Strategies

### Stress Management
- **Identify Triggers**: Recognize what causes stress and anxiety
- **Healthy Coping**: Develop positive ways to handle difficult emotions
- **Time Management**: Use techniques like the Pomodoro method for productivity
- **Boundary Setting**: Learn to say no and protect your energy

### Building Resilience
- **Social Connections**: Maintain meaningful relationships offline
- **Physical Activity**: Regular exercise for mental and physical health
- **Creative Outlets**: Engage in hobbies that bring joy and fulfillment
- **Professional Support**: Don't hesitate to seek therapy or counseling

### Emotional Regulation
- **Naming Emotions**: Identify and label feelings as they arise
- **Breathing Techniques**: Use breath to calm the nervous system
- **Perspective Taking**: Consider alternative viewpoints in challenging situations
- **Self-Compassion**: Treat yourself with the same kindness you'd show a friend

## Creating Healthy Digital Habits

### Mindful Technology Use
- **Intentional Consumption**: Choose content that adds value to your life
- **Quality over Quantity**: Prefer meaningful interactions over endless scrolling
- **Regular Breaks**: Follow the 20-20-20 rule for eye health
- **Purpose-Driven Usage**: Use technology as a tool, not entertainment

### Building Real-World Connections
- **Face-to-Face Time**: Prioritize in-person interactions
- **Outdoor Activities**: Spend time in nature regularly
- **Hobby Groups**: Join clubs or classes based on your interests
- **Volunteer Work**: Connect with your community through service

## When to Seek Professional Help

### Warning Signs
- Persistent feelings of sadness, anxiety, or hopelessness
- Difficulty functioning in daily life
- Substance abuse or self-harm behaviors
- Thoughts of suicide or self-injury
- Inability to maintain relationships or work responsibilities

### Types of Support
- **Therapy**: Individual, group, or family counseling
- **Medication**: When recommended by healthcare professionals
- **Support Groups**: Peer support for specific challenges
- **Crisis Resources**: Emergency mental health services

## Building a Sustainable Practice

### Start Small
- Begin with just 5 minutes of daily mindfulness
- Focus on one technique at a time
- Be patient with yourself as you develop the habit
- Celebrate small victories and progress

### Consistency Over Perfection
- Practice regularly, even if briefly
- Don't judge yourself for "bad" meditation sessions
- Remember that mindfulness is a skill that develops over time
- Adapt practices to fit your lifestyle and preferences

## Conclusion

Mental health and mindfulness in the digital age require intentional effort and regular practice. By developing awareness of our digital habits, implementing mindfulness techniques, and prioritizing real-world connections, we can create a healthier relationship with technology while supporting our overall well-being.

Remember: seeking help is a sign of strength, not weakness. Your mental health matters, and there are resources and people ready to support you on your journey toward greater balance and peace.`,
    excerpt: 'Essential strategies for maintaining mental wellness and practicing mindfulness in our hyperconnected digital world.',
    author: 'emilyzhou',
    category: 'Wellness',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 1850,
    likes: 298
  },
  {
    title: 'Mastering Personal Finance: A Millennial\'s Guide to Wealth Building',
    content: `# Building Wealth in Your 20s and 30s: A Complete Guide

Financial literacy isn't taught in school, but it's one of the most important skills for building a secure future. Here's everything you need to know about personal finance.

## Foundation: Financial Mindset

### Understanding Money Psychology
- **Scarcity vs. Abundance**: Shift from fear-based to growth-oriented thinking
- **Delayed Gratification**: The power of sacrificing now for future benefits
- **Investment Mindset**: Making money work for you instead of just working for money
- **Risk Assessment**: Understanding the difference between good and bad debt

### Setting Financial Goals
**SMART Financial Goals**
- **Specific**: Clear, well-defined objectives
- **Measurable**: Quantifiable targets with deadlines
- **Achievable**: Realistic given your current situation
- **Relevant**: Aligned with your values and priorities
- **Time-bound**: Set specific deadlines for achievement

## Emergency Fund: Your Financial Safety Net

### Why You Need One
- **Job Loss Protection**: 6 months of expenses covered
- **Medical Emergencies**: Unexpected healthcare costs
- **Major Repairs**: Home, car, or appliance breakdowns
- **Peace of Mind**: Reduced financial stress and anxiety

### Building Your Emergency Fund
1. **Start Small**: Even $500 can help with minor emergencies
2. **Automate Savings**: Set up automatic transfers to a separate account
3. **Use Windfalls**: Tax refunds, bonuses, and gifts go directly to emergency fund
4. **Gradual Building**: Aim for 3-6 months of expenses over time

## Debt Management Strategy

### Understanding Different Types of Debt
**Good Debt** (Can build wealth)
- **Mortgages**: Real estate that appreciates in value
- **Student Loans**: Education that increases earning potential
- **Business Loans**: Investments that generate income

**Bad Debt** (Costs money without building wealth)
- **Credit Card Debt**: High interest rates on consumer purchases
- **Payday Loans**: Extremely high fees and interest rates
- **Auto Loans**: Depreciating assets with interest costs

### Debt Payoff Strategies
**Debt Snowball Method**
- Pay minimums on all debts
- Put extra money toward smallest debt first
- Once paid off, apply that payment to next smallest debt
- Builds momentum and motivation

**Debt Avalanche Method**
- Pay minimums on all debts
- Put extra money toward highest interest rate debt first
- Mathematically optimal for saving money on interest
- Requires more discipline and patience

## Investment Fundamentals

### Getting Started with Investing
**Types of Investment Accounts**
- **401(k)**: Employer-sponsored retirement account with potential matching
- **IRA**: Individual retirement account with tax advantages
- **Roth IRA**: After-tax contributions, tax-free growth and withdrawals
- **Taxable Brokerage**: No restrictions but no special tax treatment

### Investment Vehicles
**Stocks**
- Ownership shares in companies
- Higher potential returns with higher risk
- Diversification across different sectors and companies

**Bonds**
- Loans to governments or corporations
- Lower risk, more stable returns
- Good for portfolio balance and income

**Index Funds**
- Diversified portfolios tracking market indices
- Low fees and broad market exposure
- Excellent for beginner investors

**ETFs (Exchange-Traded Funds)**
- Similar to index funds but trade like stocks
- Lower expense ratios and more flexibility
- Great for building diversified portfolios

### Dollar-Cost Averaging
- Invest a fixed amount regularly regardless of market conditions
- Reduces impact of market volatility
- Builds discipline and consistency
- Takes emotion out of investment timing

## Retirement Planning

### The Power of Compound Interest
Starting early makes a massive difference:
- **Age 25**: $200/month for 40 years = $525,000 (assuming 7% return)
- **Age 35**: $200/month for 30 years = $244,000 (same return)
- **Age 45**: $200/month for 20 years = $104,000 (same return)

### Retirement Account Strategies
**401(k) Optimization**
- Contribute enough to get full employer match (free money!)
- Gradually increase contributions with salary raises
- Consider Roth 401(k) if available and appropriate

**IRA Contributions**
- Max out IRA contributions ($6,000-7,000 annually)
- Choose Traditional or Roth based on current vs. expected future tax rates
- Consider backdoor Roth conversions for high earners

## Budgeting and Cash Flow Management

### The 50/30/20 Rule
- **50% Needs**: Housing, food, utilities, minimum debt payments
- **30% Wants**: Entertainment, dining out, hobbies, non-essential shopping
- **20% Savings**: Emergency fund, retirement, debt payoff, investments

### Tracking and Optimization
**Budgeting Tools**
- **Apps**: Mint, YNAB (You Need A Budget), Personal Capital
- **Spreadsheets**: Custom tracking for detailed analysis
- **Bank Tools**: Built-in categorization and spending analysis

**Cost Reduction Strategies**
- **Housing**: Consider roommates, house hacking, or downsizing
- **Transportation**: Public transit, cycling, or car sharing
- **Food**: Meal planning, bulk buying, cooking at home
- **Subscriptions**: Regular audits of recurring charges

## Building Multiple Income Streams

### Side Hustles and Passive Income
**Active Income Streams**
- **Freelancing**: Use existing skills for additional income
- **Part-time Work**: Evening or weekend employment
- **Gig Economy**: Uber, DoorDash, TaskRabbit
- **Online Business**: E-commerce, content creation, coaching

**Passive Income Ideas**
- **Dividend Stocks**: Companies that pay regular dividends
- **Real Estate**: Rental properties or REITs
- **Peer-to-Peer Lending**: Platforms like LendingClub
- **Digital Products**: Courses, eBooks, or software

## Insurance and Protection

### Essential Insurance Types
- **Health Insurance**: Protect against medical bankruptcy
- **Auto Insurance**: Required by law and protects assets
- **Renters/Homeowners**: Protects belongings and liability
- **Disability Insurance**: Replaces income if unable to work
- **Life Insurance**: Provides for dependents if you die

### When You Might Need Professional Help
- **Complex Tax Situations**: Multiple income sources, business ownership
- **Estate Planning**: Wills, trusts, and inheritance planning
- **Investment Management**: Large portfolios or complex strategies
- **Major Life Changes**: Marriage, divorce, job changes, inheritance

## Common Financial Mistakes to Avoid

1. **Lifestyle Inflation**: Increasing spending with every raise
2. **No Emergency Fund**: Being unprepared for financial setbacks
3. **High-Interest Debt**: Carrying credit card balances month to month
4. **Not Investing Early**: Missing out on compound interest
5. **Emotional Investing**: Making decisions based on fear or greed
6. **No Estate Plan**: Not having a will or beneficiaries updated
7. **Inadequate Insurance**: Being underinsured for major risks

## Building Long-Term Wealth

### The Millionaire Mindset
- **Live Below Your Means**: Spend less than you earn consistently
- **Invest the Difference**: Put savings to work in appreciating assets
- **Stay Consistent**: Small, regular actions compound over time
- **Educate Yourself**: Continuously learn about money and investing
- **Network**: Surround yourself with financially successful people

### Measuring Progress
**Key Financial Metrics**
- **Net Worth**: Assets minus liabilities
- **Savings Rate**: Percentage of income saved/invested
- **Debt-to-Income Ratio**: Monthly debt payments vs. monthly income
- **Investment Returns**: Portfolio performance over time

## Conclusion

Building wealth is a marathon, not a sprint. Start with the basics—emergency fund, debt payoff, and consistent investing—then gradually increase complexity as your knowledge and income grow. The most important step is starting now, regardless of your current financial situation.

Remember: personal finance is exactly that—personal. What works for others might not work for you, so adapt these strategies to fit your unique circumstances, values, and goals.`,
    excerpt: 'A comprehensive guide to building wealth in your 20s and 30s, covering everything from emergency funds to investment strategies.',
    author: 'mikechenx',
    category: 'Finance',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 4100,
    likes: 523
  },
  {
    title: 'The Art of Food Photography: Making Every Meal Instagram-Worthy',
    content: `# Food Photography: Capturing Culinary Art

Food photography has exploded in popularity with social media, but creating stunning food images requires more than just pointing and shooting. Here's how to make every dish look irresistible.

## Understanding Light: The Foundation of Great Food Photos

### Natural Light is Your Best Friend
- **Window Light**: Position your setup near a large window
- **Diffused Light**: Use sheer curtains to soften harsh sunlight
- **Direction Matters**: Side lighting creates depth and dimension
- **Golden Hour**: Warm, soft light in early morning or late afternoon

### Working with Artificial Light
**When Natural Light Isn't Available**
- **LED Panels**: Adjustable brightness and color temperature
- **Ring Lights**: Even illumination for close-up shots
- **Softboxes**: Create soft, diffused lighting
- **Reflectors**: Bounce light to eliminate harsh shadows

### Avoiding Common Lighting Mistakes
- **Overhead Fluorescent**: Creates harsh, unflattering shadows
- **Direct Flash**: Washes out colors and creates hot spots
- **Mixed Light Sources**: Different color temperatures cause color casts
- **Underexposure**: Dark, muddy images that don't showcase the food

## Composition Techniques That Work

### The Rule of Thirds
- **Grid Overlay**: Imagine your frame divided into 9 equal sections
- **Intersection Points**: Place key elements at grid line intersections
- **Leading Lines**: Use utensils, napkins, or ingredients to guide the eye
- **Negative Space**: Don't fill every inch—let the food breathe

### Angles and Perspectives
**The 45-Degree Angle**
- Most flattering for most foods
- Shows both the top and side of dishes
- Creates depth and dimension
- Works well for plated meals

**Overhead (Flat Lay)**
- Perfect for spreads, multiple dishes, or ingredients
- Great for geometric plating and patterns
- Ideal for social media square formats
- Shows the full composition of the meal

**Straight-On (Eye Level)**
- Best for tall foods like burgers, cakes, or layered desserts
- Shows the full height and structure
- Creates intimate, restaurant-menu style shots
- Emphasizes texture and layers

### Creating Depth and Interest
- **Foreground Elements**: Add props or ingredients in front
- **Background Blur**: Use shallow depth of field to isolate subject
- **Layering**: Multiple plates, textures, and heights
- **Color Contrast**: Complementary colors make food pop

## Styling Your Food

### The 80/20 Rule
Food should be 80% ready before you start shooting—you'll do final touches under the camera to maintain freshness and appeal.

### Essential Styling Techniques
**Color Enhancement**
- **Vibrant Vegetables**: Blanch greens to maintain bright color
- **Golden Browns**: Use torch or broiler for final browning
- **Fresh Herbs**: Add right before shooting for vibrant greens
- **Oil and Butter**: Light coating adds shine and richness

**Texture and Movement**
- **Steam**: Use damp cotton balls microwaved briefly for realistic steam
- **Drips and Spills**: Controlled messiness adds authenticity
- **Fresh Garnishes**: Microgreens, herb sprigs, or citrus zest
- **Action Shots**: Pouring, sprinkling, or cutting in progress

### Prop Selection and Styling

**Dishes and Serving Ware**
- **Neutral Colors**: White, cream, or natural tones don't compete
- **Varied Textures**: Mix smooth ceramics with rough wood or metal
- **Size Proportions**: Plates shouldn't overwhelm or underwhelm the food
- **Multiple Options**: Shoot several plate combinations

**Background and Surface Materials**
- **Wood**: Adds warmth and rustic appeal
- **Marble**: Elegant and clean for upscale presentations
- **Fabric**: Linen napkins or tablecloths add softness
- **Concrete**: Modern, industrial look for contemporary cuisine

**Supporting Props**
- **Utensils**: Choose styles that match the food's personality
- **Glassware**: Add height and reflection
- **Ingredients**: Show what went into making the dish
- **Cookware**: Cast iron or copper adds authenticity

## Camera Settings and Technical Tips

### Camera Equipment
**Professional Results Don't Require Professional Cameras**
- **Smartphones**: Modern phones have excellent cameras
- **DSLR/Mirrorless**: More control over settings and lenses
- **Macro Lenses**: For extreme close-ups and detail shots
- **Tripod**: Essential for consistent framing and sharp images

### Essential Camera Settings
**Aperture Priority Mode**
- **f/2.8-f/5.6**: Shallow depth of field for isolated subjects
- **f/8-f/11**: Greater depth of field for flat lays or group shots
- **Focus Point**: Always focus on the most important element
- **Manual Focus**: For precise control in macro photography

**ISO and Exposure**
- **Keep ISO Low**: 100-800 for best image quality
- **Expose for Highlights**: It's easier to brighten shadows than recover blown highlights
- **Use Exposure Compensation**: Fine-tune brightness without changing other settings
- **Shoot in RAW**: Maximum flexibility in post-processing

## Post-Processing and Editing

### Essential Editing Adjustments
**Basic Corrections**
- **Exposure**: Brighten or darken overall image
- **Highlights/Shadows**: Balance bright and dark areas
- **Vibrance**: Enhance colors without over-saturation
- **Clarity**: Add definition and texture to food

**Color and Mood**
- **Temperature**: Warm up or cool down the image
- **Tint**: Adjust green/magenta balance
- **HSL Adjustments**: Fine-tune individual color ranges
- **Split Toning**: Add color to highlights and shadows

### Popular Editing Apps and Software
**Mobile Apps**
- **Lightroom Mobile**: Professional-grade editing
- **VSCO**: Film-inspired filters and adjustments
- **Snapseed**: Free Google app with powerful tools
- **Foodie**: Specialized filters for food photography

**Desktop Software**
- **Adobe Lightroom**: Industry standard for photo editing
- **Photoshop**: Advanced retouching and compositing
- **Capture One**: Professional alternative to Lightroom
- **Luminar**: AI-powered editing tools

## Building Your Food Photography Style

### Finding Your Voice
- **Study Other Photographers**: Analyze what you like about their work
- **Experiment with Styles**: Try different moods, colors, and compositions
- **Consistent Editing**: Develop a signature look through consistent processing
- **Tell Stories**: Think about the narrative behind each dish

### Different Photography Styles
**Clean and Minimal**
- **Simple Backgrounds**: White or neutral surfaces
- **Negative Space**: Lots of empty area around the subject
- **Clean Lines**: Geometric compositions and careful placement
- **Natural Colors**: Realistic color grading without heavy filters

**Dark and Moody**
- **Low Key Lighting**: Dramatic shadows and contrast
- **Rich Colors**: Deep, saturated tones
- **Textured Backgrounds**: Wood, stone, or fabric surfaces
- **Warm Color Grading**: Golden or orange-tinted processing

**Bright and Airy**
- **High Key Lighting**: Minimal shadows, lots of light
- **Pastel Colors**: Soft, muted color palette
- **White Backgrounds**: Clean, fresh appearance
- **Cool Color Grading**: Slightly blue or neutral tones

## Business Applications

### Social Media Strategy
**Instagram Best Practices**
- **Consistent Grid**: Cohesive look across all posts
- **Story Behind the Dish**: Share recipes, techniques, or inspiration
- **Engagement**: Respond to comments and build community
- **Hashtag Strategy**: Mix popular and niche hashtags

**Pinterest Optimization**
- **Vertical Images**: Pinterest favors taller aspect ratios
- **Text Overlays**: Add recipe names or key ingredients
- **Seasonal Content**: Pin relevant content throughout the year
- **Rich Pins**: Enable rich pins for recipe content

### Professional Opportunities
- **Restaurant Photography**: Menu photos and promotional materials
- **Cookbook Photography**: Recipe documentation and styling
- **Food Blogging**: Build audience through consistent, quality content
- **Stock Photography**: License images for commercial use

## Common Mistakes and How to Avoid Them

### Technical Mistakes
1. **Poor Focus**: Always check focus on the most important element
2. **Wrong White Balance**: Color casts make food look unappetizing
3. **Over-Editing**: Heavy-handed processing that looks unrealistic
4. **Cluttered Compositions**: Too many elements competing for attention

### Styling Mistakes
1. **Overcooked Food**: Food continues cooking under hot lights
2. **Wilted Garnishes**: Add fresh elements right before shooting
3. **Inappropriate Props**: Props that don't match the food's personality
4. **Unnatural Arrangements**: Food should look like it could be eaten

## Building Your Portfolio

### Practice Projects
- **52-Week Challenge**: Photograph one dish per week for a year
- **Single Ingredient**: Explore different preparations of one ingredient
- **Cookbook Recreation**: Practice styling by recreating cookbook photos
- **Restaurant Visits**: Practice with different cuisines and presentations

### Sharing and Feedback
- **Photography Communities**: Join groups for constructive criticism
- **Social Media**: Build following and get real-time feedback
- **Local Restaurants**: Offer to photograph their dishes for portfolio building
- **Food Blogs**: Guest photography for established food bloggers

## Conclusion

Food photography combines technical skill with artistic vision and culinary appreciation. Start with good light, thoughtful composition, and careful styling, then develop your unique voice through practice and experimentation.

Remember: the best food photography makes viewers hungry. If your images make people want to take a bite, you've succeeded in capturing not just the appearance of food, but its essence and appeal.

The key is practice, patience, and persistence. Every meal is an opportunity to improve your skills and develop your eye for what makes food photography truly appetizing.`,
    excerpt: 'Master the art of food photography with professional techniques for lighting, styling, and composition that make every dish look irresistible.',
    author: 'sarahjones',
    category: 'Photography',
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    views: 2950,
    likes: 394
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogify';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});
    console.log('✅ Cleared existing data');
    
    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);
    
    // Create a mapping of usernames to user IDs
    const userMap = {};
    createdUsers.forEach(user => {
      userMap[user.username] = user._id;
    });
    
    // Update blogs with proper author references
    const blogsWithAuthorIds = sampleBlogs.map(blog => ({
      ...blog,
      authorId: userMap[blog.author]
    }));
    
    const createdBlogs = await Blog.insertMany(blogsWithAuthorIds);
    console.log(`✅ Created ${createdBlogs.length} blogs`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`Users: ${createdUsers.length}`);
    console.log(`Blogs: ${createdBlogs.length}`);
    console.log('\n👥 Created Users:');
    createdUsers.forEach(user => {
      console.log(`  - ${user.username} (${user.email})`);
    });
    
    console.log('\n📝 Created Blogs:');
    createdBlogs.forEach(blog => {
      console.log(`  - "${blog.title}" by ${blog.author}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedDatabase();
};

runSeeder();
