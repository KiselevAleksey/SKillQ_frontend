import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(20),
        flexGrow: 1,
        padding: theme.spacing(3),
        background: '#fff',
      },
  table: {
    minWidth: 650,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  },
  tableContainer: {
    maxWidth: '80%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginLeft: 'auto', // Centering the table container
    marginRight: 'auto', // Centering the table container
  },
  checkMark: {
    color: 'green',
  },
  crossMark: {
    color: 'red',
  },
  questionMark: {
    color: 'orange',
  },
  overlayText: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },

  // Button:
  button: {
    marginTop: theme.spacing(4),
    fontSize: theme.typography.body1.fontSize,
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    width: '100%', // Full width
    marginTop: theme.spacing(4),
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    width: '100%', // for full width
    minWidth: 250,

    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: 'auto', // or you can use a specific value like 300px

    },

  },
}));

const createData = (feature, cashDash, otherCashbackPlatforms, traditionalLoyalty) => {
  return { feature, cashDash, otherCashbackPlatforms, traditionalLoyalty };
};

const rows = [
  createData('Millions of candidates', 'check', 'check', 'question'),
  createData('Objective skills assessment', 'check', 'cross', 'cross'),
  createData('Candidates\' skill transparency', 'check', 'cross', 'cross'),
  createData('Pre-screened candidates', 'check', 'cross', 'cross'),
  createData('Pay only when found quality candidates', 'check', 'cross', 'cross'),
  createData('Optimization for quality of applications', 'check', 'cross', 'cross'),
];

const marks = {
  check: '✔',
  cross: '✘',
  question: '?',
};

const BenefitsTable = () => {
  const classes = useStyles();

  const getMark = (type) => {
    switch (type) {
      case 'check':
        return <span className={classes.checkMark}>{marks[type]}</span>;
      case 'cross':
        return <span className={classes.crossMark}>{marks[type]}</span>;
      case 'question':
        return <span className={classes.questionMark}>{marks[type]}</span>;
      default:
        return '';
    }
  };

  return (
    <>
    <Container className={classes.root}>
      <Typography variant="h4" marginBottom={5} gutterBottom style={{ fontWeight: 'bold' }}>
        Why SkillQ? 
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '1.1rem' }}>Feature</TableCell>
              <TableCell align="center" style={{ fontSize: '1.1rem' }}>SkillQ</TableCell>
              <TableCell align="center" style={{ fontSize: '1.1rem' }}>Social Job Platforms</TableCell>
              <TableCell align="center" style={{ fontSize: '1.1rem' }}>Other Job Boards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
                <TableRow key={index}>
                <TableCell component="th" scope="row" style={{ fontSize: '1.0rem' }}>
                    {row.feature}
                </TableCell>
                <TableCell align="center" style={{ fontSize: '1.1rem' }}>{getMark(row.cashDash)}</TableCell>
                <TableCell align="center" style={{ fontSize: '1.1rem' }}>{getMark(row.otherCashbackPlatforms)}</TableCell>
                <TableCell align="center" style={{ fontSize: '1.1rem' }}>{getMark(row.traditionalLoyalty)}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>

    <div className={classes.buttonCenter}>
              <Button
                  variant="contained"
                  color="primary"
                  className={classNames(classes.button, classes.extraLargeButton)}
                  fullWidth
                  component={Link}
                  to="/Register"
                >
                  Start now
                </Button>
              </div>
    </Container>

    </>
    );
};

export default BenefitsTable;