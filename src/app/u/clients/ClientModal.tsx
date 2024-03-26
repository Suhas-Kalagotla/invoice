import {
  AttachMoney,
  BusinessCenter,
  Close,
  Email,
  Flag,
  Language,
  LocationCity,
  Person,
  Phone,
  Place,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";

import isoCountries from "i18n-iso-countries";
import engLocale from "i18n-iso-countries/langs/en.json";

import currency from "iso-country-currency";
import ISO6391 from "iso-639-1";
import { saveClientAction } from "./saveClientAction";
import { useRouter } from "next/navigation";

export default function ClientModal(props: { onClose: () => void }) {
  isoCountries.registerLocale(engLocale);

  const countries = Object.keys(isoCountries.getAlpha2Codes()).map((code) => ({
    code: code,
    name: isoCountries.getName(code, "en"),
  }));

  const currenciesAll = currency.getAllISOCodes();
  const currencies: currency.Currency[] = [];
  currenciesAll.forEach((ac) => {
    const has = currencies.some((c) => c.currency == ac.currency);
    if (!has) {
      currencies.push(ac);
    }
  });

  const languages = ISO6391.getLanguages([
    "en",
    "fr",
    "am",
    "hi",
    "gu",
    "om",
    "es",
    "zh",
  ]);

  const initialValues = {
    type: "PERSON",
    first_name: "",
    last_name: "",
    // organization_name: "",
    // contact_first_name: "",
    // contact_last_name: "",

    currency_code: "INR",
    language_code: "",

    email: "",
    phone: "",

    street_1: "",
    street_2: "",
    city: "",
    state: "",
    postal: "",
    country_code: "ET",
  } as Client;

  const router = useRouter();
  return (
    <Modal open={true} onClose={props.onClose}>
      <Paper
        sx={{
          height: "100dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: {
            xs: "100dvw", // theme.breakpoints.up('xs')
            sm: "60vw", // theme.breakpoints.up('sm')
            lg: "40vw", // theme.breakpoints.up('sm')
          },

          position: "fixed",
          right: "0px",
          top: "0px",
        }}
      >
        <Stack
          justifyContent={"space-between"}
          sx={{
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Stack
            p={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1" fontWeight={"bold"}>
              New Client
            </Typography>
            <IconButton onClick={props.onClose} color="error">
              <Close />
            </IconButton>
          </Stack>
          <Divider />

          {/* Modal Body */}
          <Stack p={2} mt={2} flexGrow={1}>
            {/* Filter */}
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values);

                saveClientAction(values).then((res) => {
                  router.refresh();
                  props.onClose();
                });
              }}
            >
              {function (formik) {
                const {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                } = formik;
                return (
                  <Form>
                    <Stack spacing={4} justifyContent="space-between">
                      <Grid container spacing={2}>
                        {/* Client Type */}
                        <Grid xs={12}>
                          <FormControl fullWidth>
                            <InputLabel size="small">Client Type</InputLabel>
                            <Select
                              size="small"
                              name="type"
                              value={values.type}
                              label="Client Type"
                              onChange={handleChange}
                            >
                              <MenuItem value="PERSON">Person</MenuItem>
                              <MenuItem value="ORGANIZATION">
                                Organization
                              </MenuItem>
                            </Select>
                            {errors.type && touched.type && (
                              <FormHelperText error>
                                {errors.type}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/***
                         * For Person
                         *  */}

                        {values.type == "PERSON" && (
                          <>
                            {/* First Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="first_name"
                                  value={values.first_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="First Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.first_name && errors.first_name && (
                                  <FormHelperText error>
                                    {errors.first_name}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>

                            {/* First Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="last_name"
                                  value={values.last_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Last Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.last_name && errors.last_name && (
                                  <FormHelperText error>
                                    {errors.last_name}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                          </>
                        )}

                        {values.type == "ORGANIZATION" && (
                          <>
                            {/* Organization Name */}
                            <Grid xs={12}>
                              <FormControl fullWidth>
                                <TextField
                                  name="organization_name"
                                  value={values.organization_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Organization Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <BusinessCenter />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.organization_name &&
                                  errors.organization_name && (
                                    <FormHelperText error>
                                      {errors.organization_name}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>

                            {/*  Organization Contact First Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="contact_first_name"
                                  value={values.contact_first_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Contact First Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.contact_first_name &&
                                  errors.contact_first_name && (
                                    <FormHelperText error>
                                      {errors.contact_first_name}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>

                            {/* Organization Contact Last Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="contact_last_name"
                                  value={values.contact_last_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Contact Last Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.contact_last_name &&
                                  errors.contact_last_name && (
                                    <FormHelperText error>
                                      {errors.contact_last_name}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>
                          </>
                        )}

                        {/* Language Code  */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Autocomplete
                              size="small"
                              options={languages.map((l) => l.code)}
                              onChange={(_e, value) => {
                                setFieldValue("language_code", value);
                              }}
                              getOptionLabel={(option) => {
                                const res = languages.find(
                                  (l) => l.code == option
                                );
                                if (!res) {
                                  return "###";
                                }

                                return `${res.name} - ${res.code}` as string;
                              }}
                              value={values.language_code}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="language_code"
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Language />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              )}
                            />

                            {touched.language_code && errors.language_code && (
                              <FormHelperText error>
                                {errors.language_code}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Currency  Code*/}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Autocomplete
                              size="small"
                              options={currencies.map((c) => c.currency)}
                              onChange={(_e, value) => {
                                setFieldValue("currency_code", value);
                              }}
                              getOptionLabel={(option) => {
                                const res = currencies.find(
                                  (c) => c.currency == option
                                );
                                if (!res) {
                                  return "###";
                                }

                                return `${res.currency} - ${res.symbol}` as string;
                              }}
                              value={values.currency_code}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Country"
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AttachMoney />
                                      </InputAdornment>
                                    ),
                                  }}
                                  name={"currency_code"}
                                />
                              )}
                            />

                            {touched.country_code && errors.country_code && (
                              <FormHelperText error>
                                {errors.country_code}
                              </FormHelperText>
                            )}

                            {touched.currency_code && errors.currency_code && (
                              <FormHelperText error>
                                {errors.currency_code}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Phone */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Phone"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Phone />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.phone && errors.phone && (
                              <FormHelperText error>
                                {errors.phone}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* EMail */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Email"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error>
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Street Address 1 */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="street_1"
                              value={values.street_1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Street 1"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.street_1 && errors.street_1 && (
                              <FormHelperText error>
                                {errors.street_1}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Street Address 2 */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="street_2"
                              value={values.street_2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Street 2"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.street_2 && errors.street_2 && (
                              <FormHelperText error>
                                {errors.street_2}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* City */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="City"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.city && errors.city && (
                              <FormHelperText error>
                                {errors.city}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* State/Province */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="State"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.state && errors.city && (
                              <FormHelperText error>
                                {errors.state}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Country */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Autocomplete
                              size="small"
                              options={countries.map((c) => c.code)}
                              onChange={(_e, value) => {
                                setFieldValue("country_code", value);
                              }}
                              getOptionLabel={(option) => {
                                const res = countries.find(
                                  (c) => c.code == option
                                );
                                if (!res) {
                                  return "###";
                                }

                                return res.name as string;
                              }}
                              value={values.country_code}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Country"
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Flag />
                                      </InputAdornment>
                                    ),
                                  }}
                                  name={"country_code"}
                                />
                              )}
                            />

                            {touched.country_code && errors.country_code && (
                              <FormHelperText error>
                                {errors.country_code}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Posta */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="postal"
                              value={values.postal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Postal"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Place />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.postal && errors.postal && (
                              <FormHelperText error>
                                {errors.postal}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Stack>
                        <Button type="submit" variant="contained">
                          Save
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
