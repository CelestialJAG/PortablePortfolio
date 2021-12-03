export default function photoUpload(event, setProfilePic) {
  event.preventDefault();
  const reader = new FileReader();
  const file = event.target.files[0];
  reader.onloadend = () => {
    setProfilePic({
      file,
      imagePreviewUrl: reader.result,
    });
  };
  reader.readAsDataURL(file);
}
