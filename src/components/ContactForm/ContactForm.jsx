import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

const ContactForm = ({ onAddContact }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onAddContact({
          id: nanoid(),
          name: values.name,
          number: values.number,
        });
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <h2 className={css.formTitle}>Add New Contact</h2>

        <div className={css.formGroup}>
          <label htmlFor="name" className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id="name"
            className={css.input}
            placeholder="Enter name"
          />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="number" className={css.label}>
            Phone Number
          </label>
          <Field
            type="text"
            name="number"
            id="number"
            className={css.input}
            placeholder="Enter phone number"
          />
          <ErrorMessage name="number" component="div" className={css.error} />
        </div>

        <button type="submit" className={css.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
