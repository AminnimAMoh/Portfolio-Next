import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      backgroundColor: 'rgba(255,255,255,.2) !important',
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export default useStyles