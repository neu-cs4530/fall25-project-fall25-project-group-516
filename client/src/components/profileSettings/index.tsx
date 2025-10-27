import * as React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './index.css';
import useProfileSettings from '../../hooks/useProfileSettings';
import ImageUpload from '../imageUpload';
import BadgeDisplay from '../badgeDisplay';

const ProfileSettings: React.FC = () => {
  const {
    userData,
    loading,
    editBioMode,
    newBio,
    newPassword,
    confirmNewPassword,
    successMessage,
    errorMessage,
    showConfirmation,
    pendingAction,
    canEditProfile,
    showPassword,
    togglePasswordVisibility,
    setEditBioMode,
    setNewBio,
    setNewPassword,
    setConfirmNewPassword,
    setShowConfirmation,
    handleResetPassword,
    handleUpdateBiography,
    handleDeleteUser,
    handleViewCollectionsPage,
    badges,
    displayedBadgeIds,
    uploadingImage,
    handleProfilePictureUpload,
    handleBannerImageUpload,
    handleToggleBadge,
  } = useProfileSettings();

  if (loading) {
    return (
      <div className='profile-settings'>
        <div className='loading-container'>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className='profile-settings'>
        <div className='profile-container'>
          <div className='profile-card'>
            <div className='profile-section'>
              <p>User not found. Please check the username and try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='profile-settings'>
      <div className='profile-container'>
        {/* Success/Error Messages */}
        {successMessage && <div className='success-message'>{successMessage}</div>}
        {errorMessage && <div className='error-message'>{errorMessage}</div>}

        {/* Profile Header Card */}
        <div className='profile-card profile-header'>
          {/* Banner */}
          <div className='profile-banner'>
            {userData.bannerImage ? <img src={userData.bannerImage} alt='Profile banner' /> : null}
          </div>

          {/* Profile Info */}
          <div className='profile-main-info'>
            <div className='profile-picture-section'>
              <div className='profile-picture-wrapper'>
                {userData.profilePicture ? (
                  <img src={userData.profilePicture} alt={userData.username} />
                ) : (
                  <div className='profile-picture-placeholder'>
                    {userData.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className='profile-identity'>
                <h1 className='profile-name'>{userData.username}</h1>
                <p className='profile-username'>@{userData.username}</p>
                {userData.dateJoined && (
                  <p className='profile-date'>
                    Joined{' '}
                    {new Date(userData.dateJoined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className='profile-card'>
          <div className='profile-section'>
            <div className='section-header'>
              <h2 className='section-title'>About</h2>
              {canEditProfile && !editBioMode && (
                <button
                  className='button button-secondary'
                  onClick={() => {
                    setEditBioMode(true);
                    setNewBio(userData.biography || '');
                  }}>
                  Edit
                </button>
              )}
            </div>

            {!editBioMode ? (
              <div className='bio-section'>
                <div className='bio-content'>
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {userData.biography || 'No biography yet.'}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div className='bio-edit'>
                <textarea
                  className='input-text'
                  value={newBio}
                  onChange={e => setNewBio(e.target.value)}
                  placeholder='Write something about yourself...'
                />
                <div className='button-group'>
                  <button className='button button-primary' onClick={handleUpdateBiography}>
                    Save
                  </button>
                  <button className='button button-secondary' onClick={() => setEditBioMode(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className='profile-card'>
            <div className='profile-section'>
              <h2 className='section-title'>Badges & Achievements</h2>
              <BadgeDisplay
                badges={badges}
                displayedBadgeIds={displayedBadgeIds}
                onToggleBadge={canEditProfile ? handleToggleBadge : undefined}
                showProgress
                editable={canEditProfile}
              />
            </div>
          </div>
        )}

        {/* Profile Customization (Edit Mode Only) */}
        {canEditProfile && (
          <div className='profile-card'>
            <div className='profile-section'>
              <h2 className='section-title'>Profile Customization</h2>
              {uploadingImage && (
                <div className='uploading-indicator'>
                  <span>Uploading image...</span>
                </div>
              )}
              <div className='image-upload-section'>
                <ImageUpload
                  label='Profile Picture'
                  aspectRatio='square'
                  currentImageUrl={userData.profilePicture}
                  onUpload={handleProfilePictureUpload}
                />
                <ImageUpload
                  label='Banner Image'
                  aspectRatio='banner'
                  currentImageUrl={userData.bannerImage}
                  onUpload={handleBannerImageUpload}
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className='profile-card'>
          <div className='profile-section'>
            <h2 className='section-title'>Actions</h2>
            <div className='button-group'>
              <button className='button button-primary' onClick={handleViewCollectionsPage}>
                View Collections
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings (Edit Mode Only) */}
        {canEditProfile && (
          <>
            {/* Reset Password */}
            <div className='profile-card'>
              <div className='profile-section'>
                <h2 className='section-title'>Reset Password</h2>
                <div className='password-section'>
                  <input
                    className='input-text'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='New Password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <input
                    className='input-text'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm New Password'
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                  <div className='password-actions'>
                    <button className='button button-secondary' onClick={togglePasswordVisibility}>
                      {showPassword ? 'Hide' : 'Show'} Passwords
                    </button>
                    <button className='button button-primary' onClick={handleResetPassword}>
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className='profile-card'>
              <div className='profile-section'>
                <div className='danger-zone'>
                  <h3 className='danger-zone-title'>Danger Zone</h3>
                  <p className='danger-zone-text'>
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className='button button-danger' onClick={handleDeleteUser}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className='modal'>
            <div className='modal-content'>
              <h3>Delete Account</h3>
              <p>
                Are you sure you want to delete <strong>{userData.username}</strong>? This action
                cannot be undone.
              </p>
              <div className='modal-actions'>
                <button
                  className='button button-secondary'
                  onClick={() => setShowConfirmation(false)}>
                  Cancel
                </button>
                <button className='button button-danger' onClick={() => pendingAction?.()}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
