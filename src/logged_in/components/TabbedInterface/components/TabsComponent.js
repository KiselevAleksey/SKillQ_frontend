import React, { useState } from 'react';
import Tab from './Tab';
import SkillContent from './SkillContent';
import useStyles from '../styles/useStyles';
import AddRemoveCategories from './AddRemoveCategories';

// Assuming each skill tab will have a title, a description, and a set of sub-skills.
const skillDetails = {
    'Marketing': {
      title: 'Marketing',
      description: 'Explore strategic marketing techniques including digital marketing, content creation, and market analysis to enhance brand awareness and business growth.',
      subSkills: ['Social Media Marketing', 'Content Marketing', 'Product Marketing', 'Email Marketing', 'SEO/SEM', 'Digital Advertising', 'Brand Management', 'Marketing Analytics', 'Influencer Marketing', 'Affiliate Marketing', 'Video Marketing', 'B2B Marketing', 'B2C Marketing', 'Mobile Marketing', 'Event Marketing'],
    },
    'Sales': {
      title: 'Sales',
      description: 'Focus on the art of selling products or services, covering topics from negotiation strategies to customer relationship management.',
      subSkills: ['Lead Generation', 'Negotiation', 'CRM Software', 'Sales Presentations', 'Pipeline Management', 'Direct Sales', 'B2B Sales', 'B2C Sales', 'Sales Reporting', 'Cross-selling and Upselling', 'Sales Strategy', 'Customer Engagement', 'Product Knowledge', 'Sales Forecasting', 'Cold Calling'],
    },
    'Market Research': {
      title: 'Market Research',
      description: 'Delve into techniques and strategies for gathering, analyzing, and interpreting data about market conditions, competitors, and consumer behavior.',
      subSkills: ['Survey Design', 'Focus Groups', 'Data Analysis', 'Consumer Behavior Analysis', 'Competitive Analysis', 'Qualitative Research', 'Quantitative Research', 'Trend Analysis', 'SWOT Analysis', 'Market Segmentation', 'Product Testing', 'Brand Loyalty Studies', 'Pricing Research', 'Ethnographic Research', 'Online Market Research'],
    },
    'Customer Service': {
      title: 'Customer Service',
      description: 'Examine methods to enhance customer satisfaction, loyalty, and service quality across various channels and platforms.',
      subSkills: ['Conflict Resolution', 'Customer Support', 'Technical Support', 'Live Chat Management', 'Customer Satisfaction Analysis', 'Service Level Agreement (SLA) Management', 'Customer Feedback Collection', 'Customer Onboarding', 'Customer Advocacy', 'Service Quality Management', 'Customer Retention', 'Problem Solving', 'Help Desk Operations', 'Account Management', 'CRM Practices'],
    },
    'Product Development': {
        title: 'Product Development',
        description: 'Focus on the lifecycle of creating new products from ideation through to market launch and performance analysis.',
        subSkills: ['Ideation', 'Product Design', 'User Experience (UX)', 'Prototyping', 'Market Research', 'Product Lifecycle Management', 'Feasibility Analysis', 'Agile & Scrum Methodologies', 'Quality Assurance', 'Launch Strategy', 'User Testing', 'Performance Metrics', 'Roadmap Planning', 'Cross-functional Team Leadership', 'Post-Launch Evaluation'],
      },
      
      'Human Resources': {
        title: 'Human Resources',
        description: 'Covers all aspects of employee management and organizational culture enhancement.',
        subSkills: ['Talent Acquisition', 'Employee Onboarding', 'Performance Management', 'Training & Development', 'Compensation & Benefits', 'Labor Law Compliance', 'Diversity & Inclusion', 'Workforce Planning', 'Employee Engagement', 'Conflict Resolution', 'HR Analytics', 'Succession Planning', 'Organizational Development', 'Employee Relations', 'Talent Retention Strategies'],
      },
      
      'Finance & Accounting': {
        title: 'Finance & Accounting',
        description: 'Explore the financial health management of businesses, including reporting, compliance, and strategic planning.',
        subSkills: ['Financial Reporting', 'Budgeting', 'Tax Planning', 'Cost Accounting', 'Financial Analysis', 'Compliance & Auditing', 'Risk Management', 'Accounts Payable/Receivable', 'Cash Flow Management', 'Investment Analysis', 'Payroll Management', 'Strategic Planning', 'Economic Forecasting', 'Credit Analysis', 'Asset Management'],
      },
      
      'Information Technology': {
        title: 'Information Technology',
        description: 'Delve into the infrastructure and services that enable modern computing and data management.',
        subSkills: ['Network Security', 'Cloud Computing', 'Data Management', 'IT Support', 'Software Development', 'Cybersecurity', 'Infrastructure Management', 'Business Intelligence', 'Database Administration', 'Systems Analysis', 'Project Management', 'IT Policy Development', 'Disaster Recovery Planning', 'Tech Innovation', 'Vendor Management'],
      },
      
      'Operations Management': {
        title: 'Operations Management',
        description: 'Dedicated to optimizing and overseeing the process of production and redesigning business operations.',
        subSkills: ['Supply Chain Management', 'Inventory Control', 'Process Improvement', 'Quality Control', 'Logistics Planning', 'Operational Strategy', 'Cost Reduction', 'Production Planning', 'Sustainability Initiatives', 'Facility Management', 'Compliance Monitoring', 'Operational Risk Management', 'Business Process Reengineering', 'Lean Management', 'Operational Excellence'],
      },
      
      'Legal & Compliance': {
        title: 'Legal & Compliance',
        description: 'Focus on the legal aspects that govern business operations, ensuring adherence to laws and regulations.',
        subSkills: ['Contract Negotiation', 'Intellectual Property Management', 'Compliance Auditing', 'Legal Research', 'Regulatory Affairs', 'Corporate Governance', 'Litigation Management', 'Employment Law', 'Risk Assessment', 'Data Privacy', 'Environmental Law', 'Mergers & Acquisitions', 'Legal Writing', 'Corporate Social Responsibility', 'Policy Development'],
      },
      
      'Digital Marketing': {
        title: 'Digital Marketing',
        description: 'Covers all aspects of online marketing strategies including content creation, social media, and analytics.',
        subSkills: ['SEO/SEM', 'Content Strategy', 'Social Media Campaigns', 'Email Marketing', 'Digital Advertising', 'Brand Development', 'Marketing Analytics', 'Conversion Optimization', 'Content Creation', 'Influencer Partnerships', 'Mobile Marketing', 'E-commerce Strategy', 'Customer Journey Mapping', 'Video Marketing', 'Web Analytics'],
      },
      
      'Project Management': {
        title: 'Project Management',
        description: 'Entails the practice of initiating, planning, executing, controlling, and closing the work of a team to achieve specific goals.',
        subSkills: ['Scope Management', 'Resource Allocation', 'Time Management', 'Quality Management', 'Cost Management', 'Risk Management', 'Stakeholder Management', 'Communication Planning', 'Documentation', 'Agile Project Management', 'Procurement Management', 'Project Lifecycle', 'Team Leadership', 'Change Management', 'Delivery Oversight'],
      },
      
      'Business Strategy': {
        title: 'Business Strategy',
        description: 'Dive into the high-level decision-making processes that determine the direction of an organization.',
        subSkills: ['Market Analysis', 'Competitive Strategy', 'Business Model Innovation', 'Strategic Partnerships', 'Growth Planning', 'M&A Analysis', 'International Business', 'Strategic Leadership', 'Change Management', 'Value Chain Analysis', 'Scenario Planning', 'Corporate Strategy', 'Business Intelligence', 'Organizational Restructuring', 'Business Ethics'],
      },      
};


const TabsComponent = () => {
    const classes = useStyles();
    // Initialize with the first three categories
    const [selectedSkills, setSelectedSkills] = useState(Object.keys(skillDetails).slice(0, 3));
    // Set the first skill as the active tab by default
    const [activeTab, setActiveTab] = useState(selectedSkills[0]);
  
    const handleTabClick = (skill) => {
      if (selectedSkills.includes(skill)) {
        setActiveTab(skill);
      } else {
        console.error("The skill clicked is not in the current selected skills list.");
      }
    };
  
    return (
      <div className={classes.tabsContainer}>
        <div className={classes.tabListContainer}>
          <h2 className={classes.tabsHeader}>The list of Expertise categories</h2>
          <div className={classes.tabList}>
            {selectedSkills.map((skill) => (
              <Tab
                key={skill}
                title={skillDetails[skill].title}
                active={activeTab === skill}
                onClick={() => handleTabClick(skill)}
              />
            ))}
          </div>
          <AddRemoveCategories
            skillDetails={skillDetails}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
        </div>
        <div className={classes.tabContent}>
          {activeTab && (
            <SkillContent
              title={skillDetails[activeTab].title}
              description={skillDetails[activeTab].description}
              subSkills={skillDetails[activeTab].subSkills}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default TabsComponent;
  