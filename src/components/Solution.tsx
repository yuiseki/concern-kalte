import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const SolutionCard: React.VFC<{ solution: any }> = ({
  solution,
}: {
  solution: any;
}) => {
  return (
    <Card key={solution.id} tw='my-5'>
      <CardHeader title={solution.id} />
      <CardContent>
        <List>
          <ListItem>
            <p>
              対象地域：
              {solution.areaState} {solution.areaCity}
            </p>
          </ListItem>
          {solution.org && (
            <ListItem>
              <p>組織：{solution.org}</p>
            </ListItem>
          )}
          {solution.address && (
            <ListItem>
              <p>住所：{solution.address}</p>
            </ListItem>
          )}
        </List>
        {solution.about && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>概要</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{solution.about}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
      <CardActions>
        {solution.url && (
          <Link href={solution.url} target='_blank'>
            <Button>
              <HomeIcon />
              Webサイト
            </Button>
          </Link>
        )}
        {solution.email && (
          <Link href={'mailto:' + solution.email}>
            <Button>
              <MailIcon />
              Email
            </Button>
          </Link>
        )}
        {solution.tel && (
          <Link href={'tel:' + solution.tel}>
            <Button>
              <PhoneIcon />
              電話
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};
