import Header from '@/components/Header';
import NFTForm from '../components/NFTForm';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <main className='container mx-auto flex max-w-600 flex-col items-center justify-start mb-24'>
                {' '}
                <NFTForm />
            </main>
            <Footer />
        </>
    );
}
