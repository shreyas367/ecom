export default function VerifySuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-700">✅ Email Verified!</h1>
        <p className="mt-2 text-gray-600">
          Your account is now active. You can sign in below.
        </p>
        <a
          href="/sign-in"
          className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Go to Sign In
        </a>
      </div>
    </div>
  );
}
