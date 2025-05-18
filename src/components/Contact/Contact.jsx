import css from './Contact.module.css';

const Contact = ({ contact, onDeleteContact }) => {
  return (
    <div className={css.contact}>
      <div className={css.contactInfo}>
        <p className={css.name}>{contact.name}</p>
        <p className={css.number}>{contact.number}</p>
      </div>
      <button
        type="button"
        onClick={() => onDeleteContact(contact.id)}
        className={css.deleteButton}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
