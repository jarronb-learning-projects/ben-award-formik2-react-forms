import React from 'react';
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from 'formik';
import {
  TextField,
  Button,
  Checkbox,
  Container,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import * as yup from 'yup';

type MyProps = {
  label: string;
} & FieldAttributes<{}>;

const MyRadio: React.FC<MyProps> = ({ label, ...props }) => {
  const [field, meta] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<MyProps> = ({ label, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
    ></TextField>
  );
};

const validationSchema = yup.object({
  lastName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const App: React.FC = () => {
  return (
    <Container>
      <Formik
        // initialValues | required
        // onSubmit | required
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: '',
          pets: [{ type: 'cat', name: 'jarvis', id: '' + Math.random() }]
        }}
        validationSchema={validationSchema}
        // validate={values => {
        //   const errors: Record<string, string> = {};

        //   if (values.lastName.includes('bob')) {
        //     errors.lastName = 'no bob';
        //   }
        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log(data);

          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form
          // Formik auto pass in onSubmit handler | onSubmit={handleSubmit}
          >
            {/* pass in name, value, onChange, onBlur to MUI TextField */}
            <div>
              <Field
                name='firstName'
                label='first name'
                type='input'
                as={TextField}
              ></Field>
              <div>
                <Field
                  name='lastName'
                  label='last name'
                  type='input'
                  as={TextField}
                ></Field>
              </div>
            </div>

            <hr />

            {/* Custom Texfield with validation */}
            <div>
              <MyTextField
                name='lastName'
                label='last name validation'
                type='input'
              ></MyTextField>
            </div>

            {/* Checkbox */}
            <Field name='isTall' type='checkbox' as={Checkbox}></Field>

            <hr />

            {/* Mulit chaeckbox | checkbox group */}
            <div>
              <div>cookies:</div>

              <Field
                name='cookies'
                value='chocolate chip'
                type='checkbox'
                as={Checkbox}
              ></Field>

              <Field
                name='cookies'
                value='vanilla'
                type='checkbox'
                as={Checkbox}
              ></Field>

              <Field
                name='cookies'
                value='strawberry'
                type='checkbox'
                as={Checkbox}
              ></Field>
            </div>

            <hr />

            {/* Radio button */}
            <div>
              <div>Yogurt</div>
              <Field
                name='yogurt'
                value='greek blueberry'
                type='radio'
                as={Radio}
              ></Field>

              <Field
                name='yogurt'
                value='greek strawberry'
                type='radio'
                as={Radio}
              ></Field>

              <Field
                name='yogurt'
                value='greek plain'
                type='radio'
                as={Radio}
              ></Field>
            </div>

            <hr />

            {/* Custom MUI Radio Button */}
            <div>
              <MyRadio
                name='yogurt'
                value='peach'
                type='radio'
                label='peach'
              ></MyRadio>

              <MyRadio
                name='yogurt'
                value='apple'
                type='radio'
                label='apple'
              ></MyRadio>
            </div>

            {/*  */}
            <div>
              <FieldArray name='pets'>
                {arrayHelpers => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          type: 'frog',
                          name: '',
                          id: '' + Math.random()
                        })
                      }
                    >
                      add pet
                    </Button>
                    {values.pets.map((pet, index) => {
                      return (
                        <div key={pet.id}>
                          <MyTextField
                            label='Pet name'
                            name={`pets[${index}].name`}
                            type='input'
                          ></MyTextField>
                          <Field
                            name={`pets[${index}].type`}
                            type='select'
                            as={Select}
                          >
                            <MenuItem value='cat'>cat</MenuItem>
                            <MenuItem value='dog'>dog</MenuItem>
                            <MenuItem value='frog'>frog</MenuItem>
                          </Field>

                          <Button onClick={() => arrayHelpers.remove(index)}>
                            x
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>

            <hr />

            <div>
              <Button type='submit' disabled={isSubmitting}>
                Submit
              </Button>
            </div>

            <hr />

            <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default App;
