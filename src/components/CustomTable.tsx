import { styled } from "@mui/material/styles";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "grey",
    fontWeight:"bold",
    color : theme.palette.primary.contrastText,
    
    padding: "0.25rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color : theme.palette.text.primary,
    padding: "0.25rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => (
  {
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export { StyledTableRow , StyledTableCell };
