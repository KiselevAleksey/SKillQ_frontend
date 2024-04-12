import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '1.2rem',
        color: '#263238', // Dark text for the header
        fontWeight: 'bold',
        backgroundColor: '#ECEFF1', // Light grey background
      },
      tabsFooter: {
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '1.1rem',
        color: '#263238',
      },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    backgroundColor: '#ECEFF1', // Light grey background
    color: '#37474F', // Slate color for text
    fontFamily: theme.typography.fontFamily,
  },

  tabListContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Aligns header at top, footer at bottom
    backgroundColor: '#546E7A', // Background color for the entire sidebar container
    color: '#CFD8DC', // Text color for tabs
  },
  tabList: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '20px',
    backgroundColor: '#546E7A', // Metallic slate background for tab list
    color: '#CFD8DC', // Light grey text for tabs
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    cursor: 'pointer',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#455A64', // Darker shade on hover
    },
    '&.active': {
      backgroundColor: '#b3294e', // Metallic pink for active tabs
      color: '#FFFFFF', // White text for active tabs
    },
    marginBottom: '8px',
  },
  tabContent: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: '#FFFFFF', // White background for content
    overflowY: 'auto',
  },
  tabTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#263238', // Dark text for title
    marginBottom: '1rem',
  },
  tabParagraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#37474F', // Slate color for text
    textAlign: 'justify',
  },
  oval: {
    margin: '10px',
    padding: '10px 20px',
    display: 'inline-block',
    backgroundColor: '#CFD8DC', // Default background color for ovals
    color: '#263238',
    border: 'none', // Remove border to prevent extra lines
    outline: 'none', // Remove outline to prevent extra lines
    borderRadius: '50px',
    textAlign: 'center',
    transition: 'background-color 0.3s', // Smooth transition for background color
    '&:hover': {
      backgroundColor: '#B0BEC5', // Change on hover
    },
    '&:active': {
      backgroundColor: '#B0BEC5', // Same color on active/click
    },
    // Add a class for when the oval is selected
    '&.selected': {
        backgroundColor: '#f7dbe7', // Metallic cold pink (more pinky than grey)
    },
  },
}));

export default useStyles;
