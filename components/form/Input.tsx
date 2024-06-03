interface IProps {
  label?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
  hidden?: boolean;
  autofocus?: boolean;
}

export const Input: C<IProps> = ({ name, label, type = 'text', ...inputProps }) => (
  <>
    {label && (
      <label className="text-md" htmlFor={name}>
        {label}
      </label>
    )}
    <input id={name} className="rounded-md px-4 py-2 bg-inherit border" name={name} type={type} {...inputProps} />
  </>
);
