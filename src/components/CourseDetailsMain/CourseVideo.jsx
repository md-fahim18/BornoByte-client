export default function CourseVideo() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Course Video</h1>
      <video
        controls
        controlsList="nodownload"
        width="100%"
        src="https://res.cloudinary.com/dfuogbm5m/video/upload/v1753968873/Bornobyte_bfhlw3.mp4"
      >
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
