import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useChangePasswordMutation } from '../../app/services/data/settingsService'; // Import the mutation hook
import { useSelector } from 'react-redux';
import { VERB, NOUN } from 'common/constants/translation';

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const id = useSelector((state) => state.auth.userInfo.id);

  // Hook to call the changePassword mutation
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      setSuccess('');
      return;
    }

    // Call changePassword mutation
    try {
      await changePassword({ id, currentPassword, newPassword }).unwrap();
      setSuccess('Password updated successfully.');
      setError('');
    } catch (error) {
      setError('Failed to update password. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {VERB.CHANGE} {NOUN.PASSWORD.toLowerCase()}
      </Typography>

      {/* Current Password Input */}
      <TextField
        fullWidth
        label={`${VERB.ENTER} ${NOUN.CURRENT_PASSWORD.toLowerCase()}`}
        variant="outlined"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        margin="normal"
        disabled={isLoading}
      />

      {/* New Password Input */}
      <TextField
        fullWidth
        label={`${VERB.ENTER} ${NOUN.NEW_PASSWORD.toLowerCase()}`}
        variant="outlined"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        margin="normal"
        disabled={isLoading}
      />

      {/* Confirm New Password Input */}
      <TextField
        fullWidth
        label={`${VERB.CONFIRM} ${NOUN.NEW_PASSWORD.toLowerCase()}`}
        variant="outlined"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        margin="normal"
        disabled={isLoading}
      />

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      {/* Success Message */}
      {success && (
        <Typography color="success.main" sx={{ mt: 1 }}>
          {success}
        </Typography>
      )}

      {/* Save Button */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? VERB.SAVING : VERB.SAVE}
        </Button>
      </Box>
    </Box>
  );
};

export default SecuritySettings;
