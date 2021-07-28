/// <reference types="@emotion/react/types/css-prop" />
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import 'twin.macro';
import { useLocalStorageValue } from '~/hooks/useLocalStorage';
import useSWR from 'swr';
import { openReverseGeocoder } from '@geolonia/open-reverse-geocoder';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  CardContent,
  Card,
  CardActions,
  Button,
  CardHeader,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useCallback } from 'react';

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

const ResidentialAreaRGeoFormControl: React.VFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useLocalStorageValue('area-state');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useLocalStorageValue('area-city');

  const getCurrentPosition = useCallback(() => {
    const success = async (position) => {
      const coords = position.coords;
      const result = await openReverseGeocoder([
        coords.longitude,
        coords.latitude,
      ]);
      // @ts-ignore
      setState(result.prefecture);
      // @ts-ignore
      setCity(result.city);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, [setState, setCity]);

  return (
    <FormControl variant='outlined'>
      <Button
        variant='contained'
        color='secondary'
        onClick={getCurrentPosition}
      >
        居住地を取得
      </Button>
    </FormControl>
  );
};

const ResidentialAreaStateFormControl: React.VFC = () => {
  const name = 'area-state';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <TextField
        type='text'
        id={name}
        name={name}
        label='都道府県'
        variant='outlined'
        placeholder='東京都'
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      />
    </FormControl>
  );
};

const ResidentialAreaCityFormControl: React.VFC = () => {
  const name = 'area-city';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <TextField
        type='text'
        id={name}
        name={name}
        label='市区町村'
        variant='outlined'
        placeholder='台東区'
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      />
    </FormControl>
  );
};

const BirthYearFormControl: React.VFC = () => {
  const name = 'birth-year';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-birth-year'>生まれた年</InputLabel>
      <Select
        labelId='input-label-birth-year'
        label='生まれた年'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        {[...Array(100).keys()]
          .map((i) => 2022 - i)
          .map((year) => {
            return (
              <MenuItem key={year} value={year}>
                {year}年
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

const GenderFormControl: React.VFC = () => {
  const name = 'gender';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-gender'>性別</InputLabel>
      <Select
        labelId='input-label-gender'
        label='性別'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        <MenuItem value='male'>男性</MenuItem>
        <MenuItem value='female'>女性</MenuItem>
        <MenuItem value='other'>その他</MenuItem>
      </Select>
    </FormControl>
  );
};

const NotMarriedControl: React.VFC = () => {
  const name = 'not-married';
  const [value, setValue] = useLocalStorageValue(name, 'false');
  return (
    <FormControl variant='outlined'>
      <FormControlLabel
        label='独身'
        control={
          <Checkbox
            name={name}
            checked={value === 'true'}
            onChange={(e) => {
              // @ts-ignore
              setValue(String(e.target.checked));
            }}
          />
        }
      />
    </FormControl>
  );
};

const ParentingControl: React.VFC = () => {
  const name = 'parenting';
  const [value, setValue] = useLocalStorageValue(name, 'false');
  return (
    <FormControl variant='outlined'>
      <FormControlLabel
        label='子育て中'
        control={
          <Checkbox
            name={name}
            checked={value === 'true'}
            onChange={(e) => {
              // @ts-ignore
              setValue(String(e.target.checked));
            }}
          />
        }
      />
    </FormControl>
  );
};

const PersonalYearlyIncomeControl: React.VFC = () => {
  const name = 'personal-yearly-income';
  const [value, setValue] = useLocalStorageValue(name, '0');

  // @ts-ignore
  const [defaultValue, setDefaultValue] = useState<string>(value);

  const valueLabelFormat = (value) => {
    if (value === null) {
      value = 0;
    }
    return `${value} 万円`;
  };

  useEffect(() => {
    // @ts-ignore
    setDefaultValue(parseInt(value));
  }, [value]);

  return (
    <FormControl variant='outlined'>
      <Typography id='input-slider' gutterBottom>
        個人年収：{valueLabelFormat(value)}
      </Typography>
      <Box sx={{ width: 200 }}>
        <Slider
          step={50}
          marks
          min={0}
          max={1000}
          value={parseInt(defaultValue)}
          onChange={(e, val) => {
            // @ts-ignore
            setValue(val);
          }}
        />
      </Box>
    </FormControl>
  );
};

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
        <ListItem>
          <NotMarriedControl />
        </ListItem>
        <ListItem>
          <ParentingControl />
        </ListItem>
        <Divider />
        <div tw='ml-4'>
          <Typography variant='h6' noWrap>
            収入
          </Typography>
        </div>
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
    personalYearlyIncome,
  ]);

  return (
    <>
      <h1 tw='text-2xl'>{solutions.length}件</h1>
      <div tw='my-4'>
        {solutions.map((s) => {
          return (
            <Card key={s.id} tw='my-5'>
              <CardHeader title={s.id} />
              <CardContent>
                <List>
                  <ListItem>
                    <p>
                      対象地域：
                      {s.areaState} {s.areaCity}
                    </p>
                  </ListItem>
                  {s.org && (
                    <ListItem>
                      <p>組織：{s.org}</p>
                    </ListItem>
                  )}
                  {s.address && (
                    <ListItem>
                      <p>住所：{s.address}</p>
                      <Divider />
                    </ListItem>
                  )}
                </List>
                {s.about && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>概要</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{s.about}</Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
              </CardContent>
              <CardActions>
                {s.url && (
                  <Link href={s.url} target='_blank'>
                    <Button>
                      <HomeIcon />
                      Webサイト
                    </Button>
                  </Link>
                )}
                {s.email && (
                  <Link href={'mailto:' + s.email}>
                    <Button>
                      <MailIcon />
                      Email
                    </Button>
                  </Link>
                )}
                {s.tel && (
                  <Link href={'tel:' + s.tel}>
                    <Button>
                      <PhoneIcon />
                      電話
                    </Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          );
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
