const petalData = [
    {
      label: `Expertise ${Math.round(0.836 * 100)}%`,
      size: 8 * Math.round(0.836 * 100) / 100,
      color: 'rgba(0, 0, 255, 0.4)', // Blue
      bubbles: [
        {
          name: 'Social Media Marketing',
          number: 73,
          courseLinks: [
            { title: 'Social Media Marketing Specialization', url: 'https://www.coursera.org/specializations/social-media-marketing' },
            { title: 'Digital Marketing Strategy', url: 'https://www.coursera.org/learn/marketing-strategy' },
            { title: 'Facebook Social Media Marketing', url: 'https://www.coursera.org/learn/facebook-social-media-marketing' },
            { title: 'Marketing in a Digital World', url: 'https://www.coursera.org/learn/marketing-digital' },
          ],
        },
        {
          name: 'Content Marketing',
          number: 82,
          courseLinks: [
            { title: 'The Strategy of Content Marketing', url: 'https://www.coursera.org/courses/content-marketing-strategy' },
            { title: 'Content Marketing Essentials', url: 'https://www.coursera.org/learn/content-marketing-essentials' },
            { title: 'Copywriting for Conversions', url: 'https://www.coursera.org/learn/copywriting-for-conversions' },
            { title: 'SEO and Content Marketing', url: 'https://www.coursera.org/learn/seo-content-marketing' },
          ],
        },
        {
          name: 'Marketing Strategy',
          number: 96,
          courseLinks: [
            { title: 'Product Management Fundamentals', url: 'https://www.coursera.org/learn/product-management-fundamentals' },
            { title: 'Brand and Product Management', url: 'https://www.coursera.org/learn/brand' },
            { title: 'Marketing Strategy Basics', url: 'https://www.coursera.org/learn/product-marketing-basics' },
            { title: 'Marketing Analytics', url: 'https://www.coursera.org/learn/marketing-analytics' },
          ],
        },
      ],
    },
    {
      label: `Presentation ${Math.round(0.66 * 100)}%`,
      size: 8 * Math.round(0.66 * 100) / 100,
      color: 'rgba(128, 0, 128, 0.5)', // Purple
      bubbles: [
        {
          name: 'Structuring',
          number: 65,
          courseLinks: [
            { title: 'Structuring Business Presentations', url: 'https://www.coursera.org/learn/structuring-business-presentations' },
            { title: 'Effective Communication: Writing, Design, and Presentation', url: 'https://www.coursera.org/specializations/effective-communication' },
            { title: 'Successful Presentation', url: 'https://www.coursera.org/learn/uva-darden-successful-presentation' },
            { title: 'Presentation Skills: Speechwriting, Slides and Delivery', url: 'https://www.coursera.org/learn/presentation-skills' },
          ],
        },
        {
          name: 'Speech pace',
          number: 74,
          courseLinks: [
            { title: 'Dynamic Public Speaking', url: 'https://www.coursera.org/learn/public-speaking' },
            { title: 'Public Speaking', url: 'https://www.coursera.org/learn/public-speaking-project' },
            { title: 'Presentation Skills: Designing Presentation Slides', url: 'https://www.coursera.org/learn/designing-presentation-slides' },
            { title: 'Presentation skills: Public Speaking Project', url: 'https://www.coursera.org/learn/presentation-skills-public-speaking-project' },
          ],
        },
        {
          name: 'Confidence',
          number: 59,
          courseLinks: [
            { title: 'Improving Communication Skills', url: 'https://www.coursera.org/learn/wharton-communication-skills' },
            { title: 'Teamwork Skills: Communicating Effectively in Groups', url: 'https://www.coursera.org/learn/teamwork-skills' },
            { title: 'The Arts and Science of Relationships: Understanding Human Needs', url: 'https://www.coursera.org/learn/human-needs' },
            { title: 'Introduction to Personal Branding', url: 'https://www.coursera.org/learn/personal-branding' },
          ],
        },
      ],
    },
    {
      label: `Problem Solving ${Math.round(0.483 * 100)}%`,
      size: 8 * Math.round(0.483 * 100) / 100,
      color: 'rgba(255, 20, 147, 0.2)', // Pink
      bubbles: [
        {
          name: 'Answer Time',
          number: 63,
          courseLinks: [
            { title: 'Creative Problem Solving', url: 'https://www.coursera.org/learn/creative-problem-solving' },
            { title: 'Problem Solving Using Computational Thinking', url: 'https://www.coursera.org/learn/problem-solving-using-computational-thinking' },
            { title: 'Critical Thinking & Problem-Solving', url: 'https://www.coursera.org/learn/critical-thinking-problem-solving' },
            { title: 'Mindware: Critical Thinking for the Information Age', url: 'https://www.coursera.org/learn/mindware' },
          ],
        },
        {
          name: 'Conceptual thinking',
          number: 30,
          courseLinks: [
            { title: 'Introduction to Philosophy', url: 'https://www.coursera.org/learn/philosophy' },
            { title: 'Think Again I: How to Understand Arguments', url: 'https://www.coursera.org/learn/understanding-arguments' },
            { title: 'Think Again II: How to Reason Deductively', url: 'https://www.coursera.org/learn/deductive-reasoning' },
            { title: 'Reasoning Across the Disciplines', url: 'https://www.coursera.org/learn/reasoning' },
          ],
        },
        {
          name: 'Analytical thinking',
          number: 52,
          courseLinks: [
            { title: 'Introduction to Data Analysis Using Excel', url: 'https://www.coursera.org/learn/excel-data-analysis' },
            { title: 'Data Analysis and Presentation Skills: the PwC Approach', url: 'https://www.coursera.org/specializations/pwc-analytics' },
            { title: 'Excel Skills for Business: Advanced', url: 'https://www.coursera.org/learn/excel-advanced' },
            { title: 'Data-driven Decision Making', url: 'https://www.coursera.org/learn/data-driven-decision-making' },
          ],
        },
      ],
    },
  ];
  
  export default petalData;
  