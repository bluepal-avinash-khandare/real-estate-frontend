import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import CustomButton from '../../components/common/CustomButton';
import { AuthContext } from '../../contexts/AuthContext';
import { uploadProfileImage } from '../../services/userService';

const UploadProfileImage = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values, { setFieldValue }) => {
    try {
      await uploadProfileImage(user.id, values.image);
      alert('Image uploaded');
      setFieldValue('image', null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={{ image: null }} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form>
          <input type="file" onChange={(e) => setFieldValue('image', e.target.files[0])} />
          <CustomButton type="submit">Upload</CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default UploadProfileImage;