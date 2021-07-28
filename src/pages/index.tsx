/// <reference types="@emotion/react/types/css-prop" />
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import 'twin.macro';
import { useLocalStorageValue } from '~/hooks/useLocalStorage';
import useSWR from 'swr';
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
import {
  ResidentialAreaCityFormControl,
  ResidentialAreaRGeoFormControl,
  ResidentialAreaStateFormControl,
  ResidentialHouseTypeFormControl,
} from '~/components/FormControls/Residential';
import { BirthYearFormControl } from '~/components/FormControls/BirthYear';
import { GenderFormControl } from '~/components/FormControls/Gender';
import { NotMarriedControl } from '~/components/FormControls/Family';
import { ParentingControl } from '~/components/FormControls/Parenting';
import { JobsFormControl } from '~/components/FormControls/Jobs';
import { PersonalYearlyIncomeControl } from '~/components/FormControls/Income';
import { SolutionCard } from '~/components/Solution';

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

const MyDrawer: React.VFC = () => {
  return (
    <div>
      <List>
        <Divider />
        <div tw='ml-4'>
          <Typography variant='h6' noWrap>
            居住地域
          </Typography>
        </div>
        <ListItem>
          <ResidentialAreaRGeoFormControl />
        </ListItem>
        <ListItem>
          <ResidentialAreaStateFormControl />
        </ListItem>
        <ListItem>
          <ResidentialAreaCityFormControl />
        </ListItem>
        <ListItem>
          <ResidentialHouseTypeFormControl />
        </ListItem>
        <Divider />
        <div tw='ml-4'>
          <Typography variant='h6' noWrap>
            個人属性
          </Typography>
        </div>
        <ListItem>
          <BirthYearFormControl />
        </ListItem>
        <ListItem>
          <GenderFormControl />
        </ListItem>
        <Divider />
        <div tw='ml-4'>
          <Typography variant='h6' noWrap>
            家族構成
          </Typography>
        </div>
        <ListItem>
          <NotMarriedControl />
        </ListItem>
        <ParentingControl />
        <Divider />
        <div tw='ml-4'>
          <Typography variant='h6' noWrap>
            職業と収入
          </Typography>
        </div>
        <ListItem>
          <JobsFormControl />
        </ListItem>
        <ListItem>
          <PersonalYearlyIncomeControl />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

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
            あなたにマッチする支援
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
        <MyDrawer />
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

export default Index;
