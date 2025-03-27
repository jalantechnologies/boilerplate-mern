import React, { PropsWithChildren } from 'react';

import VerticalStackLayout from '../layouts/vertical-stack-layout';

import styles from './form-control.styles';

interface FormControlProps {
  error: string;
  label: string;
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({
  children,
  error,
  label,
}) => (
  <VerticalStackLayout gap={3}>
    <label className={styles.formControlLabel}>{label}</label>
    <div className={styles.formControlInputWrapper}>{children}</div>
    {error && <div className={styles.formControlErrorText}>{error}</div>}
  </VerticalStackLayout>
);

export default FormControl;
