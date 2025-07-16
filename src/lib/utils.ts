// Helper function to convert Google Drive sharing URLs to direct download URLs
export const getGoogleDriveUrl = (shareUrl: string) => {
  // Extract file ID from Google Drive sharing URL
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!fileId) return shareUrl;
  return `https://drive.google.com/file/d/${fileId}/preview`;
};
