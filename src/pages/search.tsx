/// <reference types="@emotion/react/types/css-prop" />
import React, { useEffect, useState } from 'react';
import 'twin.macro';
import useSWR from 'swr';
import clsx from 'clsx';
import {
  Container,
  createStyles,
  Divider,
  IconButton,
  List,
  ListItem,
  makeStyles,
  useTheme,
  Theme,
  Toolbar,
  AppBar,
  Typography,
  Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useLocalStorageValue } from '~/hooks/useLocalStorage';

import { SolutionCard } from '~/components/Solution';
import { SearchListItems } from '~/components/SearchListItems';
import { Layout } from '~/components/Layout';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const SolutionList: React.VFC = () => {
  const [areaState] = useLocalStorageValue('area-state');
  const [areaCity] = useLocalStorageValue('area-city');
  const [birthYear] = useLocalStorageValue('birth-year');
  const [gender] = useLocalStorageValue('gender');
  const [notMarried] = useLocalStorageValue('not-married');
  const [parenting] = useLocalStorageValue('parenting');
  const [personalYearlyIncome] = useLocalStorageValue(
    'personal-yearly-income',
    '0'
  );
  const { data: allSolutions } = useSWR('/data/solutions.json');

  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    if (!allSolutions) return;
    const filteredSolutions = allSolutions
      .filter((s) => {
        // 都道府県
        if (!areaState || areaState === 'null') {
          return s;
        }
        if (!s.areaState) {
          return s;
        }
        if (s.areaState === areaState) {
          return s;
        }
      })
      .filter((s) => {
        // 市区町村
        if (!areaCity || areaCity === 'null') {
          return s;
        }
        if (!s.areaCity) {
          return s;
        }
        if (s.areaCity === areaCity) {
          return s;
        }
      })
      .filter((s) => {
        // 年齢
        if (!birthYear || birthYear === 'null') {
          return s;
        }
        if (!s.maxAge && !s.minAge) {
          return s;
        }
        if (birthYear) {
          // @ts-ignore
          const age = new Date().getFullYear() - parseInt(birthYear);
          if (s.maxAge && s.maxAge > age) {
            return s;
          }
        }
      })
      .filter((s) => {
        // 性別
        if (!gender || gender === 'null') {
          return s;
        }
        if (!s.gender) {
          return s;
        }
        if (gender === s.gender) {
          return s;
        }
      })
      .filter((s) => {
        // ひとり親
        if (!notMarried || notMarried === 'null') {
          return s;
        }
        if (!parenting || parenting === 'null') {
          return s;
        }
        if (!s.singleParent) {
          return s;
        }
        if (s.singleParent && notMarried === 'true' && parenting === 'true') {
          return s;
        }
      })
      .filter((s) => {
        // 個人年収
        if (!s.maxPersonalYearlyIncome && !s.minPersonalYearlyIncome) {
          return s;
        }
        // @ts-ignore
        const personalYearlyIncomeInt = parseInt(personalYearlyIncome);
        if (typeof personalYearlyIncomeInt !== 'number') {
          return s;
        }
        if (personalYearlyIncomeInt <= s.maxPersonalYearlyIncome) {
          return s;
        }
      })
      .sort((a, b) => {
        return b.rating - a.rating;
      });
    setSolutions(filteredSolutions);
  }, [
    allSolutions,
    areaState,
    areaCity,
    birthYear,
    gender,
    notMarried,
    parenting,
    personalYearlyIncome,
  ]);

  return (
    <>
      <h1 tw='text-2xl'>{solutions.length}件</h1>
      <div tw='my-4'>
        {solutions.map((s) => {
          return <SolutionCard key={s.id} solution={s} />;
        })}
      </div>
    </>
  );
};

function Index() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.root}>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            あなたにオススメの情報
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <SearchListItems />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <SolutionList />
      </main>
    </Container>
  );
}

const Page: React.VFC = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.drawerHeader} />
      <SolutionList />
    </Layout>
  );
};

export default Page;
