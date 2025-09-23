import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import CustomButton from '../../components/common/CustomButton';
import { AuthContext } from '../../contexts/AuthContext';
import { uploadProfileImage } from '../../services/userService';

const UploadProfileImage = ({ onUploadSuccess }) => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (values, { setFieldValue }) => {
    try {
      setUploading(true);
      await uploadProfileImage(user.id, values.image);
      alert('Image uploaded');
      setFieldValue('image', null);
      if (onUploadSuccess) onUploadSuccess(values.image);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Formik initialValues={{ image: null }} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form className="flex flex-col items-center">
          <label className="mb-3 px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138875] transition-colors cursor-pointer">
            Choose Image
            <input 
              type="file" 
              onChange={(e) => setFieldValue('image', e.target.files[0])} 
              className="hidden"
              accept="image/*"
            />
          </label>
          <CustomButton type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default UploadProfileImage;