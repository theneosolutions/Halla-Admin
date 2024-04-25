import InputField from 'components/fields/InputField';
import { useEffect, useState } from 'react';

function ProfileSettingsPage() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const userData = await response.json();
      setUser(userData);
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('New password and confirm new password must match.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      let endpoint = '';
      let requestBody = {};
      let password = formData.oldPassword;

      if (formData.newPassword && formData.confirmNewPassword) {
        endpoint = `${process.env.NEXT_PUBLIC_SERVER}/auth/update-password`;
        requestBody = {
          password1: formData.newPassword,
          password2: formData.confirmNewPassword,
          password: formData.oldPassword
        };

        if (!formData.oldPassword) {
          setError('Please provide your old password.');
          return;
        }

        const response = await fetch(endpoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update user information.');
        }

        password = formData.newPassword

      }

      // console.log('formData.email !== user.email', formData.email, user.email);

      if (formData.email && formData.email !== user.email) {
        endpoint = `${process.env.NEXT_PUBLIC_SERVER}/users/email`;
        requestBody = {
          password: password || formData.oldPassword,
          email: formData.email
        };

        if (!formData.oldPassword) {
          setError('Please provide your old password.');
          return;
        }

        const response = await fetch(endpoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update user information.');
        }

      }

      endpoint = `${process.env.NEXT_PUBLIC_SERVER}/users`;
      requestBody = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };


      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user information.');
      }

      setFormData({
        ...formData,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      setError('');
    } catch (error) {
      setError(error.message || 'An error occurred while updating user information.');
      console.error('Error updating user information:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mt-5 grid h-full">
      <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
        <div className="mt-5 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[720px]">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
              <InputField
                extra="mb-3 w-full md:w-1/2 px-3"
                label="First Name*"
                placeholder="John"
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />

              <InputField
                extra="mb-3 w-full md:w-1/2 px-3"
                label="Last Name*"
                placeholder="Doe"
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <InputField
                extra="mb-3 w-full md:w-1/2 px-3"
                label="Username"
                placeholder="Username"
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />

              <InputField
                extra="mb-3 w-full md:w-1/2 px-3"
                label="Email*"
                placeholder="example@example.com"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <InputField
                extra="mb-3 w-full px-3"
                label="Old Password"
                placeholder="Old Password"
                id="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <InputField
                extra="mb-3 w-full px-3"
                label="New Password"
                placeholder="New Password"
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
              <InputField
                extra="mb-3 w-full px-3"
                label="Confirm New Password"
                placeholder="Confirm New Password"
                id="confirmNewPassword"
                type="password"
                value={formData.confirmNewPassword}
                onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="linear w-full my-5 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsPage;
