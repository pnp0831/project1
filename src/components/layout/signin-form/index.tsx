import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '~/components/button';
import CheckBoxInput from '~/components/inputs/checkbox-input';
import TextInput from '~/components/inputs/text-input';
import { useAuthContext } from '~/contexts/AuthContext';
import styles from './signin-form.module.scss';

type Props = {
  handleSuccess: void;
};

const SigninForm = ({ handleSuccess }: Props) => {
  const { signin } = useAuthContext();
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    rememberMe: true,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleOnChangeCheckbox = (e) => {
    const { name, checked } = e.target;

    setFormValue({ ...formValue, [name]: checked });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const user = {
      username: formValue.username,
      password: formValue.password,
    };

    signin(user);

    if (handleSuccess) {
      handleSuccess(user);
    }
  };

  return (
    <form onSubmit={handleSignIn} className={styles.modalForm}>
      <TextInput
        placeholder="Username"
        name="username"
        value={formValue.username}
        onChange={handleOnChange}
      />
      <TextInput
        placeholder="Password"
        type="password"
        name="password"
        value={formValue.password}
        onChange={handleOnChange}
      />
      <CheckBoxInput
        value={formValue.rememberMe}
        name="rememberMe"
        onChange={handleOnChangeCheckbox}
      />
      <Button type="submit" disabled={!formValue.password && !formValue.username}>
        sign in
      </Button>
      <Button onClick={() => signIn('google')}>sign in with google</Button>
    </form>
  );
};

export default SigninForm;
