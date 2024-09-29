import Link from 'next/link';

const NotFound = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-slate-50 text-gray-900"
      style={{ backgroundImage: "url('/MIU404.jpg')", backgroundSize: 'auto', backgroundPosition: 'center' }}
    >
      <h1 className="text-8xl font-bold" style={{ marginTop: '-30%' }}>404</h1>
      <p className="text-4xl font-medium">Not Found</p>
      <Link href="/" className="mt-4 text-xl text-blue-600 hover:underline">
        Go Back Page
      </Link>
    </div>
  );
};

export default NotFound;