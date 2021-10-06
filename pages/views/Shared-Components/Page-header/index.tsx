import React, { ReactElement } from "react";
import { Grid, Typography, Link } from "@mui/material";
import useStyle from "../../../../styles/Pages_styles";

interface Links{
    href: string,
    linkTag: string
}
interface Props {
  ProjectName: string | null;
  Collaboration: string[] | null;
  Links: Links[] | null;
  description: string | null;
}

function PageHeader({ ...props }: Props): ReactElement {
  const classes = useStyle();

  const preventDefault = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => event.preventDefault();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignContent="flex-start"
      className={classes.topic_grid}
    >
      <Grid item lg={6} md={12} className={classes.topick_heading}>
        <Typography variant="h3">{props.ProjectName}</Typography>

        <Typography variant="h4">Collaboration Team:</Typography>
        {props.Collaboration &&
          props.Collaboration.map((collaprators) => {
            return (
              <Typography
              key={collaprators}
                variant="body2"
                style={{ fontSize: "12px", color: "#426164" }}
              >
                {collaprators}
              </Typography>
            );
          })}

        {props.Links &&
          props.Links.map(({href, linkTag}) => {
            return (
              <Link
              key={linkTag}
                href={href}
                className={classes.onlineLink}
                style={{ bottom: "0px" }}
                onClick={(e) => preventDefault}
              >
                <Typography variant="h5" className={classes.link_ToExternals}>
                  {linkTag}
                </Typography>
              </Link>
            );
          })}
      </Grid>
      <Grid item lg={6} md={12} className={classes.topic_pragraph}>
        <Typography variant="body1">{props.description}</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
