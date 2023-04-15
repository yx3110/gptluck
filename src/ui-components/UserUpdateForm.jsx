/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserUpdateForm(props) {
  const {
    id: idProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    BirthDay: "",
    query: "",
    resultHistory: "",
  };
  const [BirthDay, setBirthDay] = React.useState(initialValues.BirthDay);
  const [query, setQuery] = React.useState(initialValues.query);
  const [resultHistory, setResultHistory] = React.useState(
    initialValues.resultHistory
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? { ...initialValues, ...userRecord }
      : initialValues;
    setBirthDay(cleanValues.BirthDay);
    setQuery(cleanValues.query);
    setResultHistory(cleanValues.resultHistory);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(User, idProp)
        : userModelProp;
      setUserRecord(record);
    };
    queryData();
  }, [idProp, userModelProp]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    BirthDay: [],
    query: [],
    resultHistory: [],
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
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          BirthDay,
          query,
          resultHistory,
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
          await DataStore.save(
            User.copyOf(userRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserUpdateForm")}
      {...rest}
    >
      <TextField
        label="Birth day"
        isRequired={false}
        isReadOnly={false}
        value={BirthDay}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              BirthDay: value,
              query,
              resultHistory,
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
        label="Query"
        isRequired={false}
        isReadOnly={false}
        value={query}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              BirthDay,
              query: value,
              resultHistory,
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
      <TextField
        label="Result history"
        isRequired={false}
        isReadOnly={false}
        value={resultHistory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              BirthDay,
              query,
              resultHistory: value,
            };
            const result = onChange(modelFields);
            value = result?.resultHistory ?? value;
          }
          if (errors.resultHistory?.hasError) {
            runValidationTasks("resultHistory", value);
          }
          setResultHistory(value);
        }}
        onBlur={() => runValidationTasks("resultHistory", resultHistory)}
        errorMessage={errors.resultHistory?.errorMessage}
        hasError={errors.resultHistory?.hasError}
        {...getOverrideProps(overrides, "resultHistory")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
