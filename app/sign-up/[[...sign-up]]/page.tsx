import { SignUp } from '@clerk/nextjs';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';


export default function Page() {
  return (
    <>
     <FloatingNav />
      <main className='flex h-screen items-center justify-center'>
          <SignUp
            routing="path"
            path="/sign-up"
            forceRedirectUrl="/dashboard"
          />
      </main>
     <Footer />
    </>
  );
}