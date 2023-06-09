import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '~/components/button';
import CheckBoxInput from '~/components/inputs/checkbox-input';
import TextInput from '~/components/inputs/text-input';
import styles from './signin-form.module.scss';

type Props = {
  handleSuccess: void;
};

const SigninForm = ({ handleSuccess, setUser, user }: Props) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    rememberMe: true,
  });

  const signin = async (info: IUser) => {
    setUser({
      username: formValue.username,
      password: formValue.password,
      name: formValue.username,
    });
  };

  const signout = () => {
    setUser({});
  };

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

    // fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback/credentials?`, {
    //   method: 'POST',
    //   body: JSON.stringify(user),
    // });

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
      {/* <Button onClick={() => signIn('google')}>sign in with google</Button> */}
    </form>
  );
};

export default SigninForm;
