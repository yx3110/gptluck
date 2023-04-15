/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField, useTheme } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const { tokens } = useTheme();
  const initialValues = {
    BirthDay: "",
    query: "",
  };
  const [BirthDay, setBirthDay] = React.useState(initialValues.BirthDay);
  const [query, setQuery] = React.useState(initialValues.query);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBirthDay(initialValues.BirthDay);
    setQuery(initialValues.query);
    setErrors({});
  };
  const validations = {
    BirthDay: [],
    query: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding={tokens.space.small.value}
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          BirthDay,
          query,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new User(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserForm")}
      {...rest}
    >
      <TextField
        label="Birthday"
        isRequired={false}
        isReadOnly={false}
        value={BirthDay}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              BirthDay: value,
              query,
            };
            const result = onChange(modelFields);
            value = result?.BirthDay ?? value;
          }
          if (errors.BirthDay?.hasError) {
            runValidationTasks("BirthDay", value);
          }
          setBirthDay(value);
        }}
        onBlur={() => runValidationTasks("BirthDay", BirthDay)}
        errorMessage={errors.BirthDay?.errorMessage}
        hasError={errors.BirthDay?.hasError}
        {...getOverrideProps(overrides, "BirthDay")}
      ></TextField>
      <TextField
        label="我想问"
        descriptiveText="输入你想查询的事"
        isRequired={false}
        isReadOnly={false}
        placeholder="我的事业/学业/爱情运会好吗"
        value={query}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              BirthDay,
              query: value,
            };
            const result = onChange(modelFields);
            value = result?.query ?? value;
          }
          if (errors.query?.hasError) {
            runValidationTasks("query", value);
          }
          setQuery(value);
        }}
        onBlur={() => runValidationTasks("query", query)}
        errorMessage={errors.query?.errorMessage}
        hasError={errors.query?.hasError}
        {...getOverrideProps(overrides, "query")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
