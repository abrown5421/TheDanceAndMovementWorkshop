import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import Input from '../../../../components/input/Input';

const ProfileManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.admin);

  const [firstName, setFirstName] = useState(user.adminUser.UserFName || '');
  const [lastName, setLastName] = useState(user.adminUser.UserLName || '');
  const [email, setEmail] = useState(user.adminUser.UserEmail || '');
  const [bio, setBio] = useState(user.adminUserStaffDoc.StaffBio || '');
  const [imageUrl, setImageUrl] = useState(user.adminUserStaffDoc.StaffImage || '');

  const staffName = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    console.log('Updated values:', {
      firstName,
      lastName,
      email,
      bio,
      imageUrl,
      staffName,
    });
  }, [firstName, lastName, email, bio, imageUrl, staffName]);

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Profile Manager</h2>
      
      <Input
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Input
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        type="text"
      />
      <Input
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </div>
  );
};

export default ProfileManager;
