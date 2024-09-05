import Form from '@/components/Form';

export default function Home() {
  return (
    <main className="w-full flex justify-end items-center align-middle h-screen">
      <div className="bg-white text-black p-8 rounded-lg max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold font-bitter text-center mb-4">
          Welcome
        </h1>
        <Form />
      </div>
    </main>
  );
}
