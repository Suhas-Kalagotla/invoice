import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import AdvTextField from "./components/AdvTestField";
import { Delete } from "@mui/icons-material";
import { FormikProps } from "formik";
import { currencies } from "../../currencies";
import { useMemo } from "react";
import { FormattedNumber } from "react-intl";
import NumericFormatCustom from "../../../../components/NumericFormatCustom";
import { Invoice, InvoiceItem } from "@prisma/client";

export default function InvoiceTable(props: {
  formik: FormikProps<
    Invoice & {
      items: InvoiceItem[];
    }
  >;
}) {
  const { handleBlur, handleChange, values, setFieldValue } = props.formik;

  const currency: Currency = useMemo(
    function () {
      const curr = currencies.find((c) => {
        return c.code == values.currency_code;
      });

      if (!curr) {
        return {
          code: "INR",
          name: "Indian",
          symboll: "2",
        };
      }
      return curr;
    },
    [values.currency_code]
  );

  return (
    <TableContainer
      sx={{
        mt: 2,
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <AdvTextField
                value={values.TABLE_ITEM_lbl}
                inputProps={{
                  style: {
                    textAlign: "left",
                  },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </TableCell>

            <TableCell>
              <AdvTextField
                value={values.TABLE_QTY_lbl}
                inputProps={{
                  style: {
                    textAlign: "left",
                  },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </TableCell>
            <TableCell>
              <AdvTextField
                value={values.TABLE_RATE_lbl}
                inputProps={{
                  style: {
                    textAlign: "left",
                  },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </TableCell>
            <TableCell align="right">
              <AdvTextField
                value={values.TABLE_AMOUNT_lbl}
                inputProps={{
                  style: {
                    textAlign: "right",
                  },
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.items.map((item, index) => {
            const descriptionName = `items[${index}].description`;
            const qtyName = `items[${index}].qty`;
            const rateName = `items[${index}].price`;

            return (
              <TableRow
                key={index}
                sx={{
                  position: "relative",
                }}
              >
                {/* Name */}

                <TableCell
                  sx={{
                    width: "auto",
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    name={descriptionName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Description of product or service"
                    value={item.description}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    width: "15%",
                  }}
                >
                  <TextField
                    type="number"
                    size="small"
                    name={qtyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={item.qty}
                    // sx={{maxWidth:"100px"}}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    width: "15%",
                  }}
                >
                  <TextField
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                      startAdornment: (
                        <InputAdornment position="start">
                          {currency?.symboll || "NC"}
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    name={rateName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={item.price}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "10%",
                  }}
                >
                  <FormattedNumber
                    value={item.price * item.qty}
                    style="currency"
                    currency={values.currency_code}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => {
                      values.items.splice(index, 1);
                      setFieldValue("items", values.items);
                    }}
                    color="warning"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={7}>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  values.items.push({
                    description: "",
                    qty: 1,
                    price: 0,
                    invoiceId: values.id,
                    id: 0,
                  });
                  setFieldValue("items", values.items);
                }}
              >
                Add Item
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
