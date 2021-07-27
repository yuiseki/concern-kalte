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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const ResidentialAreaStateFormControl: React.VFC = () => {
  const name = 'areaState';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-area-state'>都道府県</InputLabel>
      <Select
        labelId='input-label-area-state'
        label='都道府県'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        {['東京都'].map((area) => {
          return (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const ResidentialAreaCityFormControl: React.VFC = () => {
  const name = 'areaCity';
  const [value, setValue] = useLocalStorageValue(name);

  return (
    <FormControl variant='outlined'>
      <InputLabel id='input-label-area-city'>市区町村</InputLabel>
      <Select
        labelId='input-label-area-city'
        label='市区町村'
        id={name}
        name={name}
        value={String(value)}
        onChange={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      >
        <MenuItem value='null'>未回答</MenuItem>
        {[
          '千代田区',
          '中央区',
          '港区',
          '新宿区',
          '文京区',
          '台東区',
          '墨田区',
          '江東区',
          '品川区',
          '目黒区',
          '大田区',
          '世田谷区',
          '渋谷区',
          '中野区',
          '杉並区',
          '豊島区',
          '北区',
          '荒川区',
          '板橋区',
          '練馬区',
          '足立区',
          '葛飾区',
          '江戸川区',
        ].map((area) => {
          return (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const BirthYearFormControl: React.VFC = () => {
  const name = 'birthYear';
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

const PersonalYearlyIncome: React.VFC = () => {
  const name = 'personalYearlyIncome';
  const [value, setValue] = useLocalStorageValue(name, '0');

  // @ts-ignore
  const [defaultValue, setDefaultValue] = useState<string>(value);

  const valueLabelFormat = (value) => {
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
        <Divider />
        <div tw='ml-4'>
          <Typography variant='h6' noWrap>
            収入
          </Typography>
        </div>
        <ListItem>
          <PersonalYearlyIncome />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

const SolutionList: React.VFC = () => {
  const [areaState] = useLocalStorageValue('areaState');
  const [areaCity] = useLocalStorageValue('areaCity');
  const [birthYear] = useLocalStorageValue('birthYear');
  const [gender] = useLocalStorageValue('gender');
  const [personalYearlyIncome] = useLocalStorageValue(
    'personalYearlyIncome',
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
