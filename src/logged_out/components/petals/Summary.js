import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  summaryContainer: {
    padding: '20px',
    backgroundColor: '#f0f0f0', // Light grey background
    color: '#505050', // Dark grey text
    border: '1px solid #d0d0d0', // Light grey border
    borderRadius: '5px',
    margin: '20px',
    maxWidth: '400px',
  },
  summaryTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  summaryText: {
    fontSize: '16px',
    lineHeight: '1.5',
    textAlign: 'justify',
  },
});

const Summary = ({ petal }) => {
  const styles = useStyles();

  if (!petal) {
    return null;
  }

  const generateSummary = (petal) => {
    let summary = [];

    switch (petal.label) {
      case 'Expertise 84%':
        summary = [
          `You have shown exceptional expertise in Product Marketing with a score of 96%. Your Content Marketing skills are also impressive at 82%.`,
          `However, there is room for improvement in SMM, where you scored 73%. Consider focusing on social media strategies to enhance your overall expertise.`
        ];
        break;
      case 'Presentation 66%':
        summary = [
          `Your presentation skills are quite balanced, with Speech pace being your strongest area at 74%. Structuring your presentations could use some improvement, as indicated by your score of 65%.`,
          `To boost your confidence, which is at 59%, try engaging in public speaking exercises and seeking feedback.`
        ];
        break;
      case 'Problem Solving 48%':
        summary = [
          `Quickness in problem-solving is a strength for you, with a score of 63%.`,
          `However, Conceptual thinking appears to be a significant area for improvement at 30%. Focus on developing a deeper understanding of complex problems.`,
          `Analytical thinking is intermediate at 52%; consider honing your data analysis skills.`
        ];
        break;
      default:
        summary = [`This is a general summary. Please select a specific category for personalized feedback.`];
    }

    return summary;
  };

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryTitle}>{petal.label}</h2>
      {generateSummary(petal).map((paragraph, index) => (
        <p key={index} className={styles.summaryText}>{paragraph}</p>
      ))}
    </div>
  );
};

export default Summary;
