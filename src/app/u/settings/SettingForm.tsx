"use client";

import {
  ArrowBackIos,
  Business,
  Email,
  Flag,
  Language,
  LocationCity,
  Save,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";
import { useContext } from "react";

import isoCountries from "i18n-iso-countries";
import engLocale from "i18n-iso-countries/langs/en.json";
import { AlertContext } from "../invoice/[id]/components/Alert";
import Link from "next/link";
import ImageSelector from "../invoice/[id]/ImageSelector";

export default function SettingForm(props: { setting: Setting }) {
  const { setting } = props;
  const alertContext = useContext(AlertContext);

  isoCountries.registerLocale(engLocale);

  const countries = Object.keys(isoCountries.getAlpha2Codes()).map((code) => ({
    code: code,
    name: isoCountries.getName(code, "en"),
  }));

  return (
    <Formik
      initialValues={setting}
      // validationSchema={{}}
      onSubmit={(values) => {
        // localStorage.setItem("settings", JSON.stringify(values));

        alertContext?.showAlert({
          message: "The business profile are saved",
          severity: "success",
          title: "Business Profile Saved",
        });
      }}
    >
      {function (formik) {
        const {
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        } = formik;
        return (
          <Form>
            <Stack spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Link href="/u">
                    <IconButton color="secondary">
                      <ArrowBackIos />
                    </IconButton>
                  </Link>
                  <Typography variant="h5" fontWeight="bold">
                    Settings
                  </Typography>
                </Stack>

                <Button
                  onClick={() => {
                    const fd = new FormData();
                    const files_keys = ["logo"];
                    Object.entries(values).forEach(([key, value]) => {
                      if (files_keys.includes(key)) {
                        if (value instanceof Blob) {
                          fd.append(key, value);
                        }
                      } else {
                        fd.append(key, `${value}`);
                      }
                    });

                    alert("Not implemente yet");
                  }}
                  startIcon={<Save />}
                  type="submit"
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Stack>
              <Paper sx={{ p: 2 }}>
                <Box>
                  <Typography variant="h5"> Basic Information</Typography>
                </Box>
                <Grid mt={3} container spacing={2}>
                  {/* Logi */}
                  <Grid xs={12}>
                    <FormControl>
                      <ImageSelector
                        onChange={(val) => {
                          setFieldValue("logo", val);
                        }}
                        placeholder="Company Logo"
                        value={values?.logo}
                        height={100}
                      />
                    </FormControl>
                  </Grid>
                  {/* Company Name */}
                  <Grid xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        name="company_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.company_name}
                        label="Company Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Business />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.company_name && touched.company_name && (
                        <FormHelperText>{errors.company_name}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Email */}
                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.email}
                        label="Email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.email && touched.email && (
                        <FormHelperText>{errors.email}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Website */}
                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        size="small"
                        name="website"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.website}
                        label="Website"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Language />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.website && touched.website && (
                        <FormHelperText>{errors.website}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Box sx={{}}>
                  <Typography variant="h5"> Address Information</Typography>
                </Box>

                <Grid mt={2} container spacing={2}>
                  {/* Addres 1 */}
                  <Grid xs={12} sm={6}>
                    <Stack spacing={2}>
                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          name="street_1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.street_1}
                          label="Address 1"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationCity />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.street_1 && touched.street_1 && (
                          <FormHelperText>{errors.street_1}</FormHelperText>
                        )}
                      </FormControl>

                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          name="street_2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.street_2}
                          label="Address 2"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationCity />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errors.street_2 && touched.street_2 && (
                          <FormHelperText>{errors.street_2}</FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>

                  <Grid xs={12} sm={6} container spacing={2}>
                    {/* Post Code */}
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          name="postal"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.postal}
                          label="Postal"
                        />
                        {errors.postal && touched.postal && (
                          <FormHelperText>{errors.postal}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* State/Province */}
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.state}
                          label="State"
                        />
                        {errors.state && touched.state && (
                          <FormHelperText>{errors.state}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* CIty */}
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          size="small"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.city}
                          label="City"
                        />
                        {errors.city && touched.city && (
                          <FormHelperText>{errors.city}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Country */}
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth>
                        <Autocomplete
                          size="small"
                          options={countries.map((c) => c.code)}
                          onChange={(_e, value) => {
                            setFieldValue("country_code", value);
                          }}
                          getOptionLabel={(option) => {
                            const res = countries.find((c) => c.code == option);
                            if (!res) {
                              return "###";
                            }

                            return res.name as string;
                          }}
                          value={values?.country_code}
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
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
