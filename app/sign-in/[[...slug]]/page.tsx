import { SignIn } from '@clerk/nextjs';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [
    { slug: [] }, // For /sign-in
  ];
}

export default function Page() {
  return (
    <>
      <FloatingNav />
      <main className='flex h-screen items-center justify-center'>
        <SignIn 
          routing="path"
          path="/sign-in"
          forceRedirectUrl="/dashboard"
        />
      </main>
      <Footer />
    </>
  );
}
