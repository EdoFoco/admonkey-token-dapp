import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import PropTypes from "prop-types";
import { format } from "date-fns";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Transactions(props) {
  const classes = useStyles();
  const transactions = props.transactions ? props.transactions : [];
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction id</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.hash}>
              <TableCell>
                <a
                  href={`${process.env.REACT_APP_BSCSCAN_BASE_URL}/tx/${row.hash}`}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "200px",
                    }}
                  >
                    {row.hash}
                  </div>
                </a>
              </TableCell>
              <TableCell align="left">
                {Math.round((row.value / 10 ** 9) * 1000, 6) / 1000}
              </TableCell>
              <TableCell align="left">{row.direction}</TableCell>
              <TableCell align="left">
                {format(row.timeStamp * 1000, "do MMM yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

Transactions.propTypes = {
  transactions: PropTypes.array,
};
